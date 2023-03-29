import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Ingredient, IngredientSearchResult } from './ingredient.interface';

@Injectable()
export default class IngredientsSearchService {
    index = 'ingredients';

    constructor(
        @Inject(forwardRef(() => ElasticsearchService))
        private readonly elasticsearchService: ElasticsearchService,
    ) { }

    async indexIngredient(ingredient: Ingredient) {
        return this.elasticsearchService.index({
            index: this.index,
            body: {
                id: ingredient.id,
                name: ingredient.name,
            },
        });
    }
    async createIndex(ingredients: Ingredient[]) {
        try {

            await this.elasticsearchService.indices.create({ index: this.index });
        } catch (error) {
            console.log("no index found");

        }
        const body = ingredients.flatMap((ingredient) => [
            { index: { _index: this.index } },
            { id: ingredient.id, name: ingredient.name },
        ]);
        return await this.elasticsearchService.bulk({ refresh: true, body });
    }

    async search(text: string) {
        const { body }: any = await this.elasticsearchService.search<IngredientSearchResult>({
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
        return hits.map((item: any) => item._source);
    }
}
