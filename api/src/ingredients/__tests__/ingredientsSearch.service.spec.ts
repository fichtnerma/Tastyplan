import IngredientsSearchService from '../ingredientsSearch.service';
import { Ingredient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchService } from '@nestjs/elasticsearch';

describe('IngredientsSearchService', () => {
    let service: IngredientsSearchService;

    const mockElasticsearchService = {
        // mock methods here
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                IngredientsSearchService,
                { provide: ElasticsearchService, useValue: mockElasticsearchService },
            ],
        }).compile();
        service = module.get<IngredientsSearchService>(IngredientsSearchService);
    });

    it('createElasticSearchBody => Should return an appropriate elasticsearch object', () => {
        const exampleIngredients: Ingredient[] = [
            {
                id: 1,
                name: 'Banana',
                categories: 'Fruit',
                subcategories: 'Tropical',
                allergens: [],
                fat: 0.3,
                carbs: 22.8,
                protein: 1.1,
                calories: 96,
                calcium: 5,
                iron: 0.3,
                magnesium: 27,
            },
            {
                id: 2,
                name: 'Apple',
                categories: 'Fruit',
                subcategories: null,
                allergens: [],
                fat: 0.3,
                carbs: 11.4,
                protein: 0.3,
                calories: 52,
                calcium: 6,
                iron: 0.1,
                magnesium: 5,
            },
            {
                id: 3,
                name: 'Broccoli',
                categories: 'Vegetable',
                subcategories: 'Cruciferous',
                allergens: [],
                fat: 0.4,
                carbs: 7,
                protein: 2.8,
                calories: 55,
                calcium: 47,
                iron: 0.7,
                magnesium: 21,
            },
        ];

        const expectedBody = [
            { index: { _index: service.index } },
            { id: 1, name: 'Banana' },
            { index: { _index: service.index } },
            { id: 2, name: 'Apple' },
            { index: { _index: service.index } },
            { id: 3, name: 'Broccoli' },
        ];

        expect(service.createElasticSearchBody(exampleIngredients)).toEqual(expectedBody);
    });
});
