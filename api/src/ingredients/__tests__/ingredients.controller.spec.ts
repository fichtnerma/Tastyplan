import IngredientsSearchService from '../ingredientsSearch.service';
import { IngredientsService } from '../ingredients.service';
import { IngredientsQueries } from '../ingredients.queries';
import { IngredientsController } from '../ingredients.controller';
import { IngredientSearchBody } from '../ingredient.interface';
import { Ingredient } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('IngredientsController', () => {
    let service: IngredientsService;
    let controller: IngredientsController;

    beforeEach(async () => {
        const mockIngredientsQueries = jest.fn(() => ({
            // mock methods here if needed
        }));

        const mockIngredientsSearchService = jest.fn(() => ({
            // mock methods here if needed
        }));

        const module: TestingModule = await Test.createTestingModule({
            controllers: [IngredientsController],
            providers: [
                IngredientsService,
                { provide: IngredientsQueries, useValue: mockIngredientsQueries() },
                { provide: IngredientsSearchService, useValue: mockIngredientsSearchService() },
                { provide: CACHE_MANAGER, useValue: {} },
            ],
        }).compile();
        service = module.get<IngredientsService>(IngredientsService);
        controller = module.get<IngredientsController>(IngredientsController);
    });
    it('GET: / => Should retun ingredient search result', async () => {
        const mockTestQuery = 'Test Ingredient';
        const mockSearchResult: IngredientSearchBody[] = [
            {
                id: 1,
                name: 'Test Ingredient',
            },
        ];

        jest.spyOn(service, 'searchForIngredients').mockResolvedValue(mockSearchResult);

        const result = await controller.getIngredients(mockTestQuery);

        expect(service.searchForIngredients).toHaveBeenCalled();
        expect(result).toEqual(mockSearchResult);
    });

    it('GET: / => Should return HTTP exception in service error case', async () => {
        const mockTestQuery = 'Test Ingredient';

        jest.spyOn(service, 'searchForIngredients').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.getIngredients(mockTestQuery);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('GET: /all => Should return all ingredients', async () => {
        const mockAllIngredients: Ingredient[] = [
            {
                id: 1,
                name: 'Ingredient 1',
                categories: 'Category 1',
                subcategories: 'Subcategory 1',
                allergens: ['Allergen 1'],
                fat: 10,
                carbs: 20,
                protein: 30,
                calories: 200,
                calcium: 50,
                iron: 60,
                magnesium: 70,
            },
            {
                id: 2,
                name: 'Ingredient 2',
                categories: 'Category 2',
                subcategories: null,
                allergens: ['Allergen 2'],
                fat: 15,
                carbs: 25,
                protein: 35,
                calories: 250,
                calcium: 55,
                iron: 65,
                magnesium: 75,
            },
            {
                id: 3,
                name: 'Ingredient 3',
                categories: 'Category 3',
                subcategories: 'Subcategory 3',
                allergens: ['Allergen 3'],
                fat: 20,
                carbs: 30,
                protein: 40,
                calories: 300,
                calcium: 60,
                iron: 70,
                magnesium: 80,
            },
        ];

        jest.spyOn(service, 'getAll').mockResolvedValue(mockAllIngredients);
        const result = await controller.getAllIngredients();

        expect(service.getAll).toHaveBeenCalled();
        expect(result).toEqual(mockAllIngredients);
    });
    it('GET: /all => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'getAll').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.getAllIngredients();
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
});
