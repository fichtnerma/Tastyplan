import IngredientsSearchService from '../ingredientsSearch.service';
import { IngredientsService } from '../ingredients.service';
import { IngredientsQueries } from '../ingredients.queries';
import { seedDatabase, setupElasticSearchService, setupPrismaService } from 'tests/test.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cache } from 'cache-manager';
/**
 * @group integration
 */

describe('Ingredients (integration)', () => {
    let ingredientService: IngredientsService;
    let prismaService: PrismaService;
    let ingredientSearchService: IngredientsSearchService;

    beforeAll(async () => {
        prismaService = await setupPrismaService(true);
        await seedDatabase(prismaService, { withWeekplan: true });
        const ingredientQueries = new IngredientsQueries(prismaService);
        const elasticSearchService = await setupElasticSearchService();
        ingredientSearchService = new IngredientsSearchService(elasticSearchService);
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
        ingredientService = new IngredientsService(cache, ingredientSearchService, ingredientQueries);
    }, 500000);

    it('search for ingredient by name', async () => {
        await ingredientService.createIndex();
        const ingredient = await prismaService.ingredient.findFirst();
        const searched = await ingredientService.searchForIngredients(ingredient.name);
        searched.map((ingredient) => {
            ingredient.name;
        });
        expect(searched[0]).toHaveProperty('name');
        expect(searched[0]).toHaveProperty('id');
        expect(searched[0].name).toMatch(ingredient.name);
    });

    it('search for ingredient by name with wildcard', async () => {
        const ingredient = await prismaService.ingredient.findFirst();
        const searched = await ingredientService.searchForIngredients(ingredient.name.slice(0, 2));
        expect(searched[0]).toHaveProperty('name');
        expect(searched[0]).toHaveProperty('id');
        expect(searched[0].name).toMatch(ingredient.name);
    });

    it('get all ingredients', async () => {
        const ingredients = await ingredientService.getAll();
        expect(ingredients.length).toBeGreaterThan(0);
    });
});
