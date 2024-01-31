import { PreferencesService } from '../preferences.service';
import { PreferencesQueries } from '../preferences.queries';
import { PreferencesDto } from '../dto/createPreferences.dto';
import { Test, TestingModule } from '@nestjs/testing';

describe('PreferencesService', () => {
    let service: PreferencesService;

    beforeEach(async () => {
        const mockPreferencesQueries = jest.fn(() => ({
            // mock methods here if needed
        }));

        const module: TestingModule = await Test.createTestingModule({
            providers: [PreferencesService, { provide: PreferencesQueries, useValue: mockPreferencesQueries() }],
        }).compile();
        service = module.get<PreferencesService>(PreferencesService);
    });

    it('formatPreferences => Should return preferences in valid form', () => {
        const examplePreferences: PreferencesDto = {
            formOfDiet: 'vegan',
            allergens: ['peanuts', 'egg'],
            days: ['monday', 'tuesday'],
            foodDislikes: [],
            wantsLunch: true,
            wantsDinner: false,
            servings: 4,
        };
        const exampleIngredientIds = [{ id: 1 }, { id: 2 }];

        const expectedResult = {
            formOfDiet: 'vegan',
            allergens: ['peanuts', 'egg'],
            days: ['monday', 'tuesday'],
            foodDislikes: { connect: [{ id: 1 }, { id: 2 }] },
            wantsLunch: true,
            wantsDinner: false,
            servings: 4,
        };
        expect(service.formatPreferences(examplePreferences, exampleIngredientIds)).toEqual(expectedResult);
    });
});
