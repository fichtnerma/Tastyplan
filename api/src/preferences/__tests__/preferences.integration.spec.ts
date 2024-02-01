import { PreferencesService } from '../preferences.service';
import { PreferencesQueries } from '../preferences.queries';
import { PreferencesDto } from '../dto/createPreferences.dto';
import { seedDatabase, setupPrismaService } from 'tests/test.util';
import { PrismaService } from 'src/prisma/prisma.service';
/**
 * @group integration
 */

describe('Preferences (integration)', () => {
    let preferencesService: PreferencesService;
    let prismaService: PrismaService;

    beforeAll(async () => {
        prismaService = await setupPrismaService(true);
        await seedDatabase(prismaService, { withWeekplan: true });
        const preferencesQueries = new PreferencesQueries(prismaService);
        preferencesService = new PreferencesService(preferencesQueries);
    }, 500000);

    it('set preferences for user', async () => {
        const user = await prismaService.user.findFirst();
        const createPref: PreferencesDto = {
            formOfDiet: 'omnivore',
            allergens: ['gluten', 'lactose'],
            foodDislikes: [],
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
            wantsLunch: true,
            wantsDinner: true,
            servings: 1,
        };
        const preferences = await preferencesService.setPreferences(createPref, user.userId);
        expect(preferences).toEqual('Preferences has been send successfully');
    });

    it('get preferences for user', async () => {
        const user = await prismaService.user.findFirst();
        const preferences = await preferencesService.getPreferences(user.userId);
        expect(preferences).toHaveProperty('formOfDiet');
        expect(preferences).toHaveProperty('allergens');
        expect(preferences).toHaveProperty('days');
        expect(preferences).toHaveProperty('wantsLunch');
        expect(preferences).toHaveProperty('wantsDinner');
        expect(preferences).toHaveProperty('servings');
    });
});
