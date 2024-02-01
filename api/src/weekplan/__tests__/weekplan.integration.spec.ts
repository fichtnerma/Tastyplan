import { WeekplanService } from '../weekplan.service';
import { WeekplanQueries } from '../weekplan.queries';
import { seedDatabase, setupPrismaService } from 'tests/test.util';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { PreferencesQueries } from 'src/preferences/preferences.queries';
/**
 * @group integration
 */

describe('Weekplan (integration)', () => {
    let weekplanService: WeekplanService;
    let prismaService: PrismaService;

    beforeAll(async () => {
        prismaService = await setupPrismaService(true);
        await seedDatabase(prismaService, { withWeekplan: true });
        const weekplanQueries = new WeekplanQueries(prismaService);
        const preferancesQueries = new PreferencesQueries(prismaService);
        const preferancesService = new PreferencesService(preferancesQueries);
        const recipeFilterService = new RecipesFilterService(prismaService);
        weekplanService = new WeekplanService(recipeFilterService, preferancesService, weekplanQueries);
    }, 500000);

    beforeEach(async () => {
        await prismaService.weekplan.deleteMany({});
        await prismaService.weekplanEntry.deleteMany({});
    });

    it('create weekplan', async () => {
        const weekplan = await weekplanService.create('userid1');
        expect(weekplan).toBeDefined();
    });

    it('get weekplan', async () => {
        await weekplanService.create('userid1');
        const weekplan = await weekplanService.get('userid1');
        expect(weekplan).toBeDefined();
    });

    it('get weekplan by date', async () => {
        const weekplan = await weekplanService.create('userid1');
        const weekplanByDate = await weekplanService.findByDate('userid1', weekplan.startDate);
        expect(weekplan).toEqual(weekplanByDate);
    });

    it('delete weekplan', async () => {
        const weekplanFuture = await weekplanService.createFutureWeekplan(
            'userid1',
            new Date(new Date().getDate() + 7),
            true,
        );
        const foundPlan = await weekplanService.findByDate('userid1', weekplanFuture.startDate);
        expect(foundPlan).toEqual(weekplanFuture);
    });
});
