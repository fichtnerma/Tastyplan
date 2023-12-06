import { FilterRecipeDto } from './dto/filter-recipe.dto';
import { Recipe } from '@prisma/client';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

export interface RecipeSearchResult {
    hits: {
        total: number;
        hits: Array<{
            _source: RecipeSearchBody;
        }>;
    };
}

export interface RecipeSearchResultWithAggregations extends RecipeSearchResult {
    aggregations: {
        tags: {
            buckets: Array<{
                key: string;
                doc_count: number;
            }>;
        };
    };
}

export interface RecipeSearchBody {
    id: number;
    name: string;
}

@Injectable()
export class RecipesSearchService {
    index = 'recipes';

    constructor(
        @Inject(forwardRef(() => ElasticsearchService))
        private readonly elasticsearchService: ElasticsearchService,
    ) {}

    async indexRecipes(recipes: Recipe[]) {
        try {
            const indexExists = await this.elasticsearchService.indices.exists({ index: this.index });
            if (indexExists.body.valueOf()) await this.elasticsearchService.indices.delete({ index: this.index });
            await this.elasticsearchService.indices.create({ index: this.index });
            const body = recipes.flatMap((recipe) => [
                { index: { _index: this.index } },
                {
                    id: recipe.id,
                    name: recipe.name,
                    img: recipe.img,
                    description: recipe.description,
                    formOfDiet: recipe.formOfDiet,
                    preparingTime: recipe.preparingTime,
                    cookingTime: recipe.cookingTime,
                    totalTime: recipe.totalTime,
                    servings: recipe.servings,
                    tags: recipe.tags,
                },
            ]);
            return await this.elasticsearchService.bulk({ refresh: true, body });
        } catch (error) {
            console.log(error);
        }
    }

    async getTags() {
        const { body } = await this.elasticsearchService.search<RecipeSearchResultWithAggregations>({
            index: this.index,
            size: 0,
            body: {
                aggs: {
                    tags: {
                        terms: {
                            field: 'tags.keyword',
                            size: 1000,
                        },
                    },
                },
            },
        });
        return body.aggregations.tags.buckets.map((bucket) => bucket.key);
    }

    async search(text: string) {
        const { body } = await this.elasticsearchService.search<RecipeSearchResult>({
            index: this.index,
            body: {
                query: {
                    wildcard: {
                        name: {
                            value: `*${text.toLowerCase()}*`,
                        },
                    },
                },
            },
        });
        const hits = body.hits.hits;
        return hits.map((item) => item._source);
    }

    async filter(filterOptions: FilterRecipeDto) {
        const { formOfDiet } = filterOptions;
        const { body } = await this.elasticsearchService.search<RecipeSearchResult>({
            index: this.index,
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                match: {
                                    formOfDiet: formOfDiet,
                                },
                            },
                            {
                                match: {
                                    tags: 'breakfast',
                                },
                            },
                        ],
                    },
                },
            },
            size: 10,
        });
        const hits = body.hits.hits;
        return hits.map((item) => item._source);
    }
}
