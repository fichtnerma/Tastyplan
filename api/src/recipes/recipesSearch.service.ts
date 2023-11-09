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

    async indexRecipe(recipe: Recipe) {
        return this.elasticsearchService.index({
            index: this.index,
            body: {
                id: recipe.id,
                name: recipe.name,
            },
        });
    }
    async createIndex(recipes: Recipe[]) {
        try {
            await this.elasticsearchService.indices.create({ index: this.index });
            const body = recipes.flatMap((ingredient) => [
                { index: { _index: this.index } },
                { id: ingredient.id, name: ingredient.name },
            ]);
            return await this.elasticsearchService.bulk({ refresh: true, body });
        } catch (error) {}
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
}
