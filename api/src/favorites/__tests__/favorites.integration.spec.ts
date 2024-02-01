import { FavoritesService } from '../favorites.service';
import { FavoritesQueries } from '../favorites.queries';
import { seedDatabase, setupPrismaService } from 'tests/test.util';
import { PrismaService } from 'src/prisma/prisma.service';
/**
 * @group integration
 */

describe('Favorites (integration)', () => {
    let favoritesService: FavoritesService;
    let prismaService: PrismaService;

    beforeAll(async () => {
        prismaService = await setupPrismaService(true);
        await seedDatabase(prismaService, { withWeekplan: true });
        const favoritesQueries = new FavoritesQueries(prismaService);
        favoritesService = new FavoritesService(favoritesQueries);
    }, 500000);

    beforeEach(async () => {
        await prismaService.favorites.deleteMany({});
    });

    it('add favorite', async () => {
        const recipes = await prismaService.recipe.findMany({});
        const user = await prismaService.user.findFirst({});
        const response = await favoritesService.addOrDelete({ recipeId: `${recipes[0].id}` }, user);
        expect(response).toEqual('New favorite added');
    });

    it('delete favorite', async () => {
        const recipes = await prismaService.recipe.findMany({});
        const user = await prismaService.user.findFirst({});
        await favoritesService.addOrDelete({ recipeId: `${recipes[0].id}` }, user);
        const response = await favoritesService.addOrDelete({ recipeId: `${recipes[0].id}` }, user);
        expect(response).toEqual('Removed Favorite');
    });

    it('get favorites', async () => {
        const recipes = await prismaService.recipe.findMany({});
        const user = await prismaService.user.findFirst({});
        await favoritesService.addOrDelete({ recipeId: `${recipes[0].id}` }, user);
        const response = await favoritesService.findAll(user);
        const foundRecipe = response.filter((favorite) => favorite.recipe.id === recipes[0].id);
        expect(foundRecipe).toBeDefined();
    });
});
