import { RecipesService } from '../recipes.service';
import { RecipeWithIngredientName } from '../recipe.interface';
import { RecipesUploadImageService } from 'src/recipes/recipesUploadImage.service';
import { RecipesSearchService } from 'src/recipes/recipesSearch.service';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { RecipeQueries } from 'src/recipes/recipe.queries';
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/common';

jest.mock('sharp', () =>
    jest.fn(() => ({
        // mock methods here if needed
    })),
);

describe('RecipeService', () => {
    let service: RecipesService;

    // Create mock implementations of the dependencies
    const mockRecipesFilterService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockRecipeSearchService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockRecipeQueries = jest.fn(() => ({
        // mock methods here if needed
    }));
    const mockRecipesUploadImageService = jest.fn(() => ({
        // mock methods here if needed
    }));

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RecipesService,
                { provide: RecipesFilterService, useValue: mockRecipesFilterService() },
                { provide: RecipesSearchService, useValue: mockRecipeSearchService() },
                { provide: RecipeQueries, useValue: mockRecipeQueries() },
                { provide: RecipesUploadImageService, useValue: mockRecipesUploadImageService() },
                { provide: CACHE_MANAGER, useValue: {} },
            ],
        }).compile();
        service = module.get<RecipesService>(RecipesService);
    });

    it('processImageBuffer => Should return a base64 string from image buffer', () => {
        const base64String = 'SGVsbG8sIEJhc2U2NCEh';
        const expectedResult = Buffer.from(base64String, 'base64');

        expect(service.processToImageBuffer(base64String)).toEqual(expectedResult);
    });

    it('formatRecipes => Should return a list of formatted Recipes', () => {
        const inputRecipes: RecipeWithIngredientName[] = [
            {
                id: 1,
                name: 'Recipe 1',
                img: 'image1.png',
                description: 'This is a test recipe',
                cookingTime: 30,
                preparingTime: 15,
                totalTime: 45,
                servings: 4,
                tags: ['tag1', 'tag2'],
                formOfDiet: 'Vegan',
                userId: 'user1',
                steps: [
                    { id: 1, description: 'Step 1 for Recipe 1', stepCount: 1, recipeId: 1 },
                    { id: 2, description: 'Step 2 for Recipe 1', stepCount: 2, recipeId: 1 },
                ],
                ingredients: [
                    {
                        id: 1,
                        unit: 'Cup',
                        condition: 'Fresh',
                        quantity: 2,
                        ingredientId: 1,
                        recipeId: 1,
                        ingredient: { name: 'Ingredient 1' },
                    },
                    {
                        id: 2,
                        unit: 'Grams',
                        condition: 'Ripe',
                        quantity: 200,
                        ingredientId: 2,
                        recipeId: 1,
                        ingredient: { name: 'Ingredient 2' },
                    },
                ],
            },
            {
                id: 2,
                name: 'Recipe 2',
                img: 'image2.png',
                description: 'This is another test recipe',
                cookingTime: 40,
                preparingTime: 20,
                totalTime: 60,
                servings: 2,
                tags: ['tag3', 'tag4'],
                formOfDiet: 'Vegetarian',
                userId: 'user2',
                steps: [
                    { id: 3, description: 'Step 1 for Recipe 2', stepCount: 1, recipeId: 2 },
                    { id: 4, description: 'Step 2 for Recipe 2', stepCount: 2, recipeId: 2 },
                ],
                ingredients: [
                    {
                        id: 3,
                        unit: 'Tablespoon',
                        condition: 'Dried',
                        quantity: 1,
                        ingredientId: 3,
                        recipeId: 2,
                        ingredient: { name: 'Ingredient 3' },
                    },
                    {
                        id: 4,
                        unit: 'Cup',
                        condition: 'Fresh',
                        quantity: 1,
                        ingredientId: 4,
                        recipeId: 2,
                        ingredient: { name: 'Ingredient 4' },
                    },
                ],
            },
            {
                id: 3,
                name: 'Recipe 3',
                img: 'image3.png',
                description: 'This is yet another test recipe',
                cookingTime: 50,
                preparingTime: 25,
                totalTime: 75,
                servings: 6,
                tags: ['tag5', 'tag6'],
                formOfDiet: 'Gluten Free',
                userId: 'user3',
                steps: [
                    { id: 5, description: 'Step 1 for Recipe 3', stepCount: 1, recipeId: 3 },
                    { id: 6, description: 'Step 2 for Recipe 3', stepCount: 2, recipeId: 3 },
                ],
                ingredients: [
                    {
                        id: 5,
                        unit: 'Grams',
                        condition: 'Frozen',
                        quantity: 100,
                        ingredientId: 5,
                        recipeId: 3,
                        ingredient: { name: 'Ingredient 5' },
                    },
                    {
                        id: 6,
                        unit: 'Cup',
                        condition: 'Fresh',
                        quantity: 1,
                        ingredientId: 6,
                        recipeId: 3,
                        ingredient: { name: 'Ingredient 6' },
                    },
                ],
            },
        ];

        const expectedRecipes = [
            {
                id: 1,
                name: 'Recipe 1',
                img: 'image1.png',
                description: 'This is a test recipe',
                cookingTime: 30,
                preparingTime: 15,
                totalTime: 45,
                servings: 4,
                tags: ['tag1', 'tag2'],
                formOfDiet: 'Vegan',
                userId: 'user1',
                steps: [
                    { id: 1, description: 'Step 1 for Recipe 1', stepCount: 1, recipeId: 1 },
                    { id: 2, description: 'Step 2 for Recipe 1', stepCount: 2, recipeId: 1 },
                ],
                ingredients: [
                    {
                        id: 1,
                        unit: 'Cup',
                        condition: 'Fresh',
                        quantity: 2,
                        ingredientId: 1,
                        recipeId: 1,
                        ingredient: { name: 'Ingredient 1' },
                        name: 'Ingredient 1',
                    },
                    {
                        id: 2,
                        unit: 'Grams',
                        condition: 'Ripe',
                        quantity: 200,
                        ingredientId: 2,
                        recipeId: 1,
                        ingredient: { name: 'Ingredient 2' },
                        name: 'Ingredient 2',
                    },
                ],
            },
            {
                id: 2,
                name: 'Recipe 2',
                img: 'image2.png',
                description: 'This is another test recipe',
                cookingTime: 40,
                preparingTime: 20,
                totalTime: 60,
                servings: 2,
                tags: ['tag3', 'tag4'],
                formOfDiet: 'Vegetarian',
                userId: 'user2',
                steps: [
                    { id: 3, description: 'Step 1 for Recipe 2', stepCount: 1, recipeId: 2 },
                    { id: 4, description: 'Step 2 for Recipe 2', stepCount: 2, recipeId: 2 },
                ],
                ingredients: [
                    {
                        id: 3,
                        unit: 'Tablespoon',
                        condition: 'Dried',
                        quantity: 1,
                        ingredientId: 3,
                        recipeId: 2,
                        ingredient: { name: 'Ingredient 3' },
                        name: 'Ingredient 3',
                    },
                    {
                        id: 4,
                        unit: 'Cup',
                        condition: 'Fresh',
                        quantity: 1,
                        ingredientId: 4,
                        recipeId: 2,
                        ingredient: { name: 'Ingredient 4' },
                        name: 'Ingredient 4',
                    },
                ],
            },
            {
                id: 3,
                name: 'Recipe 3',
                img: 'image3.png',
                description: 'This is yet another test recipe',
                cookingTime: 50,
                preparingTime: 25,
                totalTime: 75,
                servings: 6,
                tags: ['tag5', 'tag6'],
                formOfDiet: 'Gluten Free',
                userId: 'user3',
                steps: [
                    { id: 5, description: 'Step 1 for Recipe 3', stepCount: 1, recipeId: 3 },
                    { id: 6, description: 'Step 2 for Recipe 3', stepCount: 2, recipeId: 3 },
                ],
                ingredients: [
                    {
                        id: 5,
                        unit: 'Grams',
                        condition: 'Frozen',
                        quantity: 100,
                        ingredientId: 5,
                        recipeId: 3,
                        ingredient: { name: 'Ingredient 5' },
                        name: 'Ingredient 5',
                    },
                    {
                        id: 6,
                        unit: 'Cup',
                        condition: 'Fresh',
                        quantity: 1,
                        ingredientId: 6,
                        recipeId: 3,
                        ingredient: { name: 'Ingredient 6' },
                        name: 'Ingredient 6',
                    },
                ],
            },
        ];
        expect(service.formatRecipes(inputRecipes)).toEqual(expectedRecipes);
    });
    it('categorizeRecipe => Should return a list of categorized Resipes', () => {
        const exampleIngredientsVegan = [
            { categories: 'Fruits', subcategories: 'Apples' },
            { categories: 'Vegetables', subcategories: 'Carrots' },
        ];
        const expectedFormOfDietVegan = 'vegan';
        expect(service.categorizeRecipe(exampleIngredientsVegan)).toEqual(expectedFormOfDietVegan);

        const exampleIngredientsVegeterian = [
            { categories: 'Milk and dairy products', subcategories: 'Milk' },
            { categories: 'Eggs', subcategories: 'Chicken eggs' },
            { categories: 'Fruits', subcategories: 'Apples' },
            { categories: 'Vegetables', subcategories: 'Carrots' },
        ];
        const expectedFormOfDietVegeterien = 'vegetarian';
        expect(service.categorizeRecipe(exampleIngredientsVegeterian)).toEqual(expectedFormOfDietVegeterien);

        const exampleIngredientsPesceterian = [
            { categories: 'Milk and dairy products', subcategories: 'Milk' },
            { categories: 'Eggs', subcategories: 'Chicken eggs' },
            { categories: 'Fruits', subcategories: 'Apples' },
            { categories: 'Vegetables', subcategories: 'Carrots' },
            { categories: 'Fish', subcategories: 'Salmon' },
        ];
        const expectedFormOfDietPescetarian = 'pescetarian';
        expect(service.categorizeRecipe(exampleIngredientsPesceterian)).toEqual(expectedFormOfDietPescetarian);

        const exampleIngredientsOmnivore = [
            { categories: 'Meat', subcategories: 'Beef' },
            { categories: 'Fruits', subcategories: 'Apples' },
            { categories: 'Vegetables', subcategories: 'Carrots' },
        ];
        const expectedFormOfDietOmnivore = 'omnivore';
        expect(service.categorizeRecipe(exampleIngredientsOmnivore)).toEqual(expectedFormOfDietOmnivore);
    });
});
