import { InitializerService } from '../initializer.service';
import { seedDatabase, setupElasticSearchService, setupPrismaService } from 'tests/test.util';
import { RecipesUploadImageService } from 'src/recipes/recipesUploadImage.service';
import { RecipesSearchService } from 'src/recipes/recipesSearch.service';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { RecipeQueries } from 'src/recipes/recipe.queries';
import { PrismaService } from 'src/prisma/prisma.service';
import IngredientsSearchService from 'src/ingredients/ingredientsSearch.service';
import { IngredientsService } from 'src/ingredients/ingredients.service';
import { IngredientsQueries } from 'src/ingredients/ingredients.queries';
import { Cache } from 'cache-manager';
/**
 * @group integration
 */

describe('Initalizer (integration)', () => {
    let prismaService: PrismaService;
    let initializerService: InitializerService;

    beforeAll(async () => {
        prismaService = await setupPrismaService(true);
        await seedDatabase(prismaService, { withWeekplan: true });
        const cache: Cache = {
            get: jest.fn(),
            set: jest.fn(),
            del: jest.fn(),
            reset: jest.fn(),
            wrap: jest.fn(),
            store: {
                get: jest.fn(),
                set: jest.fn(),
                del: jest.fn(),
                reset: jest.fn(),
                mset: jest.fn(),
                mget: jest.fn(),
                mdel: jest.fn(),
                keys: jest.fn(),
                ttl: jest.fn(),
            },
        };
        const ingredientQueries = new IngredientsQueries(prismaService);
        const elasticSearchService = await setupElasticSearchService();
        const ingredientSearchService = new IngredientsSearchService(elasticSearchService);
        const recipeSearchService = new RecipesSearchService(elasticSearchService);
        const recipeFilterService = new RecipesFilterService(prismaService);
        const recipeQueries = new RecipeQueries(prismaService);
        const recipeUploadImageService: RecipesUploadImageService = new RecipesUploadImageService();
        const recipeService = new RecipesService(
            cache,
            recipeFilterService,
            recipeSearchService,
            recipeQueries,
            recipeUploadImageService,
        );
        const ingredientService = new IngredientsService(cache, ingredientSearchService, ingredientQueries);
        initializerService = new InitializerService(
            prismaService,
            recipeService,
            ingredientService,
            recipeSearchService,
        );
        initializerService.dataUrl = `${process.cwd()}/src/initializer/data`;
    }, 500000);

    it('read Json recipes', async () => {
        const result = await initializerService.readJSONRecipes();
        expect(result).toHaveProperty('recipes');
        expect(result.recipes.length).toBeGreaterThan(0);
        expect(result).toHaveProperty('shouldUpdate');
    });

    it('read CSV ingredients', async () => {
        const result = await initializerService.readCSVIngredients();
        expect(result.length).toBeGreaterThan(0);
    });

    it('sync ingredients', async () => {
        await initializerService.syncIngredients();
        const ingredients = await prismaService.ingredient.findMany({});
        expect(ingredients.length).toBeGreaterThan(0);
        expect(ingredients[0]).toHaveProperty('name');
    }, 50000);

    it('prepare recipe data', async () => {
        const recipes = await initializerService.readJSONRecipes();
        const fetchMock = jest.fn().mockReturnValue({
            json: () => [
                {
                    name: 'canola oil',
                    ingredientId: 728,
                    condition: '',
                    quantity: '0.25',
                    unit: 'cup',
                },
                {
                    name: 'onion powder',
                    ingredientId: 959,
                    condition: '',
                    quantity: '1',
                    unit: 'tablespoon',
                },
                {
                    name: 'garlic powder',
                    ingredientId: 628,
                    condition: '',
                    quantity: '1',
                    unit: 'tablespoon',
                },
                {
                    name: 'rice',
                    ingredientId: 392,
                    condition: '',
                    quantity: '1',
                    unit: 'cup',
                },
                {
                    name: 'water',
                    ingredientId: 519,
                    condition: '',
                    quantity: '1.5',
                    unit: 'cups',
                },
                {
                    name: 'tomato sauce',
                    ingredientId: 512,
                    condition: '',
                    quantity: '1',
                    unit: '(6.5 ounce) can',
                },
            ],
        });
        const prepared = await initializerService.prepareRecipeData(recipes.recipes[0], 1, fetchMock);

        expect(prepared).toHaveProperty('ingredients');
    });

    it('sync recipes', async () => {
        const { recipes } = await initializerService.readJSONRecipes();
        const prepareMock = jest.fn().mockImplementation((recipe) => recipe);
        for await (const recipe of initializerService.syncRecipes(recipes, prepareMock)) {
            expect(prepareMock).toBeCalledWith(recipe, expect.any(Number));
        }
        expect(prepareMock).toBeCalledTimes(recipes.length);
    }, 50000);
});
