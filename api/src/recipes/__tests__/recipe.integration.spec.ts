import { RecipesUploadImageService } from '../recipesUploadImage.service';
import { RecipesSearchService } from '../recipesSearch.service';
import { RecipesFilterService } from '../recipesFilter.service';
import { RecipesService } from '../recipes.service';
import { RecipeQueries } from '../recipe.queries';
import { seedDatabase, setupElasticSearchService, setupPrismaService } from 'tests/test.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { PreferencesQueries } from 'src/preferences/preferences.queries';
import { Cache } from 'cache-manager';
/**
 * @group integration
 */

describe('Recipes (integration)', () => {
    let recipeService: RecipesService;
    let prismaService: PrismaService;
    let recipeSearchService: RecipesSearchService;

    beforeAll(async () => {
        prismaService = await setupPrismaService(true);
        await seedDatabase(prismaService, { withWeekplan: true });
        const elasticSearchService = await setupElasticSearchService();
        const recipeSearchService = new RecipesSearchService(elasticSearchService);
        const recipeFilterService = new RecipesFilterService(prismaService);
        const recipeQueries = new RecipeQueries(prismaService);
        const recipeUploadImageService: RecipesUploadImageService = new RecipesUploadImageService();

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
        const preferencesQuery = new PreferencesQueries(prismaService);
        const preferencesService = new PreferencesService(preferencesQuery);
        recipeService = new RecipesService(
            cache,
            recipeFilterService,
            recipeSearchService,
            recipeQueries,
            recipeUploadImageService,
            preferencesService,
        );
    }, 500000);

    it('categegorize recipe', async () => {
        const recipe = await prismaService.recipe.findFirst({
            include: {
                ingredients: {
                    include: { ingredient: true },
                },
            },
        });
        const ingTypes = recipe.ingredients.map((ing) => {
            return { categories: ing.ingredient.categories, subcategories: ing.ingredient.subcategories };
        });
        const category = await recipeService.categorizeRecipe(ingTypes);
        expect(category).toBeDefined();
        expect(true).toBe(true);
    });

    it('get recipe by id', async () => {
        const recipeFromDB = await prismaService.recipe.findFirst();
        const recipe = await recipeService.findById(recipeFromDB.id);
        expect(recipe.id).toEqual(recipeFromDB.id);
    });
});
