import { InitializerService } from '../initializer.service';
import { RecipesSearchService } from '../../recipes/recipesSearch.service';
import { RecipesService } from '../../recipes/recipes.service';
import { PrismaService } from '../../prisma/prisma.service';
import { IngredientsService } from '../../ingredients/ingredients.service';
import { convertIngredientAmount } from '../../helpers/converter.utils';
import { InnitializerIngredient } from 'src/ingredients/ingredient.interface';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('sharp', () =>
    jest.fn(() => ({
        // mock methods here if needed
    })),
);

describe('InitializerService', () => {
    let service: InitializerService;
    // Create mock implementations of the dependencies

    // Create mock implementations of the dependencies
    const mockRecipesRecipesService = jest.fn(() => ({
        // mock methods here if needed
    }));
    const mockIngredientsService = jest.fn(() => ({
        // mock methods here if needed
    }));
    const mockRecipesSearchService = jest.fn(() => ({
        // mock methods here if needed
    }));
    const mockPrismaService = jest.fn(() => ({
        // mock methods here if needed
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                InitializerService,
                { provide: RecipesService, useValue: mockRecipesRecipesService() },
                { provide: IngredientsService, useValue: mockIngredientsService() },
                { provide: RecipesSearchService, useValue: mockRecipesSearchService() },
                { provide: PrismaService, useValue: mockPrismaService() },
            ],
        }).compile();
        service = module.get<InitializerService>(InitializerService);
    });

    it('mapIngredients => Should return a mapped version of ingredients', () => {
        const ingredients: InnitializerIngredient[] = [
            { ingredientId: 1, quantity: '2', unit: 'cups', condition: 'chopped' },
            { ingredientId: 2, quantity: '1', unit: 'tbsp', condition: 'melted' },
        ];

        const result = service.mapIngredients(ingredients);

        expect(result).toEqual([
            {
                ingredientId: 1,
                quantity: convertIngredientAmount(ingredients[0]).quantity || null,
                unit: 'cup',
                condition: 'chopped',
            },
            {
                ingredientId: 2,
                quantity: convertIngredientAmount(ingredients[1]).quantity || null,
                unit: 'tbsp',
                condition: 'melted',
            },
            // Add more expected results as needed
        ]);
    });
});
