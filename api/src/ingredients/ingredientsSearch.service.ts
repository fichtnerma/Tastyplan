import { IngredientSearchResult } from './ingredient.interface';
import { Ingredient } from '@prisma/client';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { forwardRef, Inject, Injectable } from '@nestjs/common';

@Injectable()
export default class IngredientsSearchService {
    index = 'ingredients';

    constructor(
        @Inject(forwardRef(() => ElasticsearchService))
        private readonly elasticsearchService: ElasticsearchService,
    ) {}

    async indexIngredient(ingredient: Ingredient) {
        return this.elasticsearchService.index({
            index: this.index,
            document: {
                id: ingredient.id,
                name: ingredient.name,
            },
        });
    }
    async createIndex(ingredients: Ingredient[]) {
        try {
            await this.elasticsearchService.indices.create({ index: this.index });
            const operations = this.createElasticSearchBody(ingredients);
            return await this.elasticsearchService.bulk({ refresh: true, operations });
        } catch (error) {}
    }

    async search(text: string) {
        const result = await this.elasticsearchService.search<IngredientSearchResult>({
            index: this.index,
            query: {
                wildcard: {
                    name: {
                        value: `*${text.toLowerCase()}*`,
                    },
                },
            },
        });
        const hits = result.hits.hits;
        return hits.map((item: any) => item._source);
    }

    createElasticSearchBody(ingredients: Ingredient[]) {
        return ingredients.flatMap((ingredient) => [
            { index: { _index: this.index } },
            { id: ingredient.id, name: ingredient.name },
        ]);
    }
}
