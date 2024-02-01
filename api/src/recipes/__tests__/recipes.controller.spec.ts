import { RecipeSearchBody } from '../recipesSearch.service';
import { RecipesService } from '../recipes.service';
import { RecipesController } from '../recipes.controller';
import { PostRecipeDto } from '../dto/post-recipe.dto';
import { RequestWithUser } from 'src/users/users.interface';
import { RecipesUploadImageService } from 'src/recipes/recipesUploadImage.service';
import { RecipesSearchService } from 'src/recipes/recipesSearch.service';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { RecipeQueries } from 'src/recipes/recipe.queries';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Recipe, IngredientWithAmount, Step } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { CACHE_MANAGER } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

jest.mock('sharp', () =>
    jest.fn(() => ({
        // mock methods here if needed
    })),
);
const mockElasticsearchService = jest.fn(() => ({
    search: jest.fn(), // Add this line if the search method is used in your RecipesSearchService
}));

describe('UsersController', () => {
    let service: RecipesService;
    let searchService: RecipesSearchService;
    let controller: RecipesController;

    // Create mock implementations of the dependencies
    const mockRecipesFilterService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockPreferencesService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockRecipeQueries = jest.fn(() => ({
        // mock methods here if needed
    }));
    const mockRecipesUploadImageService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockRequestWithUser = {
        user: {
            id: '1',
            userId: '1',
        },
        cookies: {},
    } as RequestWithUser;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RecipesController],
            providers: [
                RecipesService,
                RecipesSearchService,
                { provide: RecipesFilterService, useValue: mockRecipesFilterService() },
                { provide: RecipeQueries, useValue: mockRecipeQueries() },
                { provide: RecipesUploadImageService, useValue: mockRecipesUploadImageService() },
                { provide: ElasticsearchService, useValue: mockElasticsearchService() },
                { provide: PreferencesService, useValue: mockPreferencesService() },
                { provide: CACHE_MANAGER, useValue: {} },
            ],
        }).compile();
        controller = module.get<RecipesController>(RecipesController);
        service = module.get<RecipesService>(RecipesService);
        searchService = module.get<RecipesSearchService>(RecipesSearchService);
    });

    it('GET: recommend/:id => Should return list of recipes ', async () => {
        const mockId = '1';
        const mockExpectedRecipes = [
            {
                id: 1,
                name: 'Recipe 1',
                description: 'Description 1',
                img: 'Image 1',
                formOfDiet: 'Diet 1',
                preparingTime: 10,
                cookingTime: 20,
                totalTime: 30,
                ingredients: [
                    {
                        id: 1,
                        quantity: 2,
                        unit: 'cups',
                        ingredient: { name: 'Ingredient 1', id: 1, categories: 'Category 1' },
                    },
                ],
                steps: [{ description: 'Step 1', stepCount: 1 }],
            },
            {
                id: 2,
                name: 'Recipe 2',
                description: 'Description 2',
                img: 'Image 2',
                formOfDiet: 'Diet 2',
                preparingTime: 15,
                cookingTime: 25,
                totalTime: 40,
                ingredients: [
                    {
                        id: 3,
                        quantity: 3,
                        unit: 'cups',
                        ingredient: { name: 'Ingredient 3', id: 3, categories: 'Category 3' },
                    },
                ],
                steps: [{ description: 'Step 2', stepCount: 2 }],
            },
            {
                id: 3,
                name: 'Recipe 3',
                description: 'Description 3',
                img: 'Image 3',
                formOfDiet: 'Diet 3',
                preparingTime: 10,
                cookingTime: 20,
                totalTime: 30,
                ingredients: [
                    {
                        id: 1,
                        quantity: 2,
                        unit: 'cups',
                        ingredient: { name: 'Ingredient 1', id: 1, categories: 'Category 1' },
                    },
                ],
                steps: [{ description: 'Step 1', stepCount: 1 }],
            },
            {
                id: 4,
                name: 'Recipe 4',
                description: 'Description 4',
                img: 'Image 4',
                formOfDiet: 'Diet 4',
                preparingTime: 10,
                cookingTime: 20,
                totalTime: 30,
                ingredients: [
                    {
                        id: 1,
                        quantity: 2,
                        unit: 'cups',
                        ingredient: { name: 'Ingredient 1', id: 1, categories: 'Category 1' },
                    },
                ],
                steps: [{ description: 'Step 1', stepCount: 1 }],
            },
            {
                id: 5,
                name: 'Recipe 5',
                description: 'Description 5',
                img: 'Image 5',
                formOfDiet: 'Diet 5',
                preparingTime: 10,
                cookingTime: 20,
                totalTime: 30,
                ingredients: [
                    {
                        id: 1,
                        quantity: 2,
                        unit: 'cups',
                        ingredient: { name: 'Ingredient 1', id: 1, categories: 'Category 1' },
                    },
                ],
                steps: [{ description: 'Step 1', stepCount: 1 }],
            },
        ];

        jest.spyOn(service, 'getRecommendations').mockResolvedValue(mockExpectedRecipes);

        const result = await controller.findAll(mockId, mockRequestWithUser);
        expect(result).toEqual(mockExpectedRecipes);
    });

    it('GET: recommend/:id => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'getRecommendations').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.findAll('1', mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('GET: tags => Should return a list of tags', async () => {
        const mockTags = ['asia', 'summer', 'beef'];
        jest.spyOn(service, 'getRecipeTags').mockResolvedValue(mockTags);

        const result = await controller.getRecipeTags();

        expect(service.getRecipeTags).toHaveBeenCalled();
        expect(result).toEqual(mockTags);
    });

    it('GET: tags => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'getRecipeTags').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.getRecipeTags();
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('POST: create => Should return a recipe', async () => {
        const mockRecipeDto: PostRecipeDto = {
            name: 'Recipe 1',
            servings: 4,
            formOfDiet: 'Diet 1',
            userId: '1',
            ingredients: [
                {
                    ingredientId: 1,
                    unit: 'cups',
                    quantity: 2,
                },
            ],
            steps: [{ description: 'Step 1', stepCount: 1 }],
        };

        const mockEcpectedRecipe = {
            id: 1,
            name: 'Recipe 1',
            description: 'Description 1',
            img: 'Image 1',
            formOfDiet: 'Diet 1',
            preparingTime: 10,
            cookingTime: 20,
            totalTime: 30,
            servings: 4,
            tags: ['tag1', 'tag2'],
            userId: '1',
            ingredients: [
                {
                    id: 1,
                    quantity: 2,
                    unit: 'cups',
                    ingredient: { name: 'Ingredient 1', id: 1, categories: 'Category 1' },
                },
            ],
            steps: [{ description: 'Step 1', stepCount: 1 }],
        };

        jest.spyOn(service, 'postRecipe').mockResolvedValue(mockEcpectedRecipe);

        const result = await controller.postRecipe(mockRecipeDto);

        expect(service.postRecipe).toHaveBeenCalled();
        expect(result).toEqual(mockEcpectedRecipe);
    });

    it('POST: create => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'postRecipe').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.postRecipe({
                name: 'Recipe 1',
                servings: 4,
                formOfDiet: 'Diet 1',
                userId: '1',
                ingredients: [
                    {
                        ingredientId: 1,
                        unit: 'cups',
                        quantity: 2,
                    },
                ],
                steps: [{ description: 'Step 1', stepCount: 1 }],
            });
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('GET: own => Should return own recipe', async () => {
        const mockExampleObject: (Recipe & {
            ingredients: (IngredientWithAmount & {
                ingredient: {
                    name: string;
                };
            })[];
            steps: Step[];
        })[] = [
            {
                id: 1,
                name: 'Recipe 1',
                img: 'Image 1',
                description: 'Description 1',
                cookingTime: 20,
                preparingTime: 10,
                totalTime: 30,
                servings: 4,
                tags: ['tag1', 'tag2'],
                formOfDiet: 'Diet 1',
                ingredients: [
                    {
                        id: 1,
                        unit: 'cups',
                        condition: null,
                        quantity: 2,
                        ingredientId: 1,
                        recipeId: 1,
                        ingredient: {
                            name: 'Ingredient 1',
                        },
                    },
                ],
                steps: [
                    {
                        id: 1,
                        description: 'Step 1',
                        stepCount: 1,
                        recipeId: 1,
                    },
                ],
                userId: '1',
            },
        ];

        jest.spyOn(service, 'findOwn').mockResolvedValue(mockExampleObject);

        const result = await controller.findOwn(mockRequestWithUser);

        expect(service.findOwn).toHaveBeenCalled();
        expect(result).toEqual(mockExampleObject);
    });

    it('GET: own => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'findOwn').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.findOwn(mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('GET: :id => Should return recipe by id', async () => {
        const mockRecipe = {
            steps: [
                {
                    description: 'Step 1',
                    stepCount: 1,
                },
                {
                    description: 'Step 2',
                    stepCount: 2,
                },
            ],
            ingredients: [
                {
                    ingredient: {
                        id: 1,
                        name: 'Ingredient 1',
                        categories: 'Category 1',
                    },
                    id: 1,
                    quantity: 2,
                    unit: 'cups',
                },
                {
                    ingredient: {
                        id: 2,
                        name: 'Ingredient 2',
                        categories: 'Category 2',
                    },
                    id: 2,
                    quantity: 3,
                    unit: 'tablespoons',
                },
            ],
            id: 1,
            name: 'Recipe 1',
            description: 'This is a test recipe',
            img: 'https://example.com/image.jpg',
            formOfDiet: 'Vegan',
            preparingTime: 15,
            cookingTime: 15,
            totalTime: 30,
        };
        const mockRecipeId = '1';
        jest.spyOn(service, 'findById').mockResolvedValue(mockRecipe);

        const result = await controller.findOne(mockRecipeId);
        expect(service.findById).toHaveBeenCalled();
        expect(result).toEqual(mockRecipe);
    });

    it('GET: :id => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'findById').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.findOne('1');
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('GET: => Should return elasticsearch result', async () => {
        const mockSearchQuery = 'test';
        const mockSearchResult: RecipeSearchBody[] = [
            {
                id: 1,
                name: 'Test Recipe',
            },
        ];
        jest.spyOn(searchService, 'search').mockResolvedValue(mockSearchResult);

        const result = await controller.getRecipes(mockSearchQuery);

        expect(result).toEqual(mockSearchResult);
        expect(searchService.search).toHaveBeenCalledWith(mockSearchQuery);
    });

    it('GET: => Should return HTTP exception in service error case', async () => {
        const mockSearchQuery = 'test';
        jest.spyOn(searchService, 'search').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.getRecipes(mockSearchQuery);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
});
