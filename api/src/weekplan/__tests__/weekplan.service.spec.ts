import { WeekplanService } from '../weekplan.service';
import { WeekplanQueries } from '../weekplan.queries';
import { IWeekplan, IFormattedWeekplan } from '../weekplan.interface';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('WeekplanService', () => {
    let service: WeekplanService;

    // Create mock implementations of the dependencies
    const mockRecipesFilterService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockPreferencesService = jest.fn(() => ({
        // mock methods here if needed
    }));

    const mockWeekplanQueries = jest.fn(() => ({
        // mock methods here if needed
    }));
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                WeekplanService,
                { provide: RecipesFilterService, useValue: mockRecipesFilterService() },
                { provide: PreferencesService, useValue: mockPreferencesService() },
                { provide: WeekplanQueries, useValue: mockWeekplanQueries() },
            ],
        }).compile();
        service = module.get<WeekplanService>(WeekplanService);
    });

    it('formatWeekPlan => Should format properly', () => {
        const exampleWeekplan: IWeekplan = {
            id: 1,
            userId: 'user123',
            startDate: new Date('2024-01-29'),
            endDate: new Date('2024-02-04'),
            hasLunch: true,
            hasDinner: true,
            weekplanEntry: [
                {
                    id: 1,
                    date: new Date('2024-01-29'),
                    lunch: {
                        id: 101,
                        name: 'Vegetarian Pasta',
                        img: 'pasta.jpg',
                        description: 'Delicious vegetarian pasta dish.',
                        cookingTime: 20,
                        preparingTime: 10,
                        totalTime: 30,
                        servings: 2,
                        tags: ['vegetarian', 'pasta'],
                        formOfDiet: 'vegetarian',
                        userId: 'user123',
                    },
                    dinner: {
                        id: 201,
                        name: 'Grilled Chicken Salad',
                        img: 'salad.jpg',
                        description: 'Healthy grilled chicken salad.',
                        cookingTime: 15,
                        preparingTime: 10,
                        totalTime: 25,
                        servings: 1,
                        tags: ['chicken', 'salad'],
                        formOfDiet: 'regular',
                        userId: 'user123',
                    },
                },
            ],
        };

        const formattedExampleWeekplan: IFormattedWeekplan = {
            startDate: new Date('2024-01-29'),
            endDate: new Date('2024-02-04'),
            hasLunch: true,
            hasDinner: true,
            weekplanEntry: [
                {
                    id: 1,
                    date: new Date('2024-01-29'),
                    lunch: {
                        id: 101,
                        name: 'Vegetarian Pasta',
                        img: 'pasta.jpg',
                        preparingTime: 10,
                        cookingTime: 20,
                        totalTime: 30,
                        formOfDiet: 'vegetarian',
                    },
                    dinner: {
                        id: 201,
                        name: 'Grilled Chicken Salad',
                        img: 'salad.jpg',
                        preparingTime: 10,
                        cookingTime: 15,
                        totalTime: 25,
                        formOfDiet: 'regular',
                    },
                },
            ],
        };
        expect(service.formatWeekPlan(exampleWeekplan)).toStrictEqual(formattedExampleWeekplan);
    });

    it('createWeekDateTimeRange => Should return date range for one week', () => {
        const exampleDate = new Date('2024-01-29');
        const exampleDateRange = {
            startDate: new Date('2024-01-29'),
            endDate: new Date('2024-02-04'),
        };
        expect(service.createWeekDateTimeRange(exampleDate)).toStrictEqual(exampleDateRange);
    });
    it('createDateRangeForWeekplanCreation => Should return start date in correct format in future', () => {
        const exampleDate = new Date('2024-01-29');
        const formattedStartDateInFuture = {
            startDate: new Date('2024-01-31T00:00:00.000Z'),
        };

        expect(service.createDateRangeForWeekplanCreation(exampleDate, false)).toStrictEqual(
            formattedStartDateInFuture,
        );
    });
    it('createDateRangeForWeekplanCreation => Should return start date and end date for current Date', () => {
        const exampleDate = new Date('2024-01-29');
        const formattedDatesCurrnt = {
            startDate: new Date('2024-01-29T00:00:00.000Z'),
            endDate: new Date('2024-02-04T00:00:00.000Z'),
        };
        expect(service.createDateRangeForWeekplanCreation(exampleDate)).toStrictEqual(formattedDatesCurrnt);
    });

    it('getPreviousWeekStartDate => Should return the start date of previous weekplan', () => {
        const exampleDate = new Date('2024-01-29');
        const previousWeekStartDate = new Date('2024-01-22');
        expect(service.getPreviousWeekStartDate(exampleDate)).toStrictEqual(previousWeekStartDate);
    });

    it('extractRecipeIdsFromPreviousWeekplan => Should return recipes from past weekplan', () => {
        const exampleWeekplan: IWeekplan = {
            id: 1,
            userId: 'user123',
            startDate: new Date('2024-01-29'),
            endDate: new Date('2024-02-04'),
            hasLunch: true,
            hasDinner: true,
            weekplanEntry: [
                {
                    id: 1,
                    date: new Date('2024-01-29'),
                    lunch: {
                        id: 101,
                        name: 'Vegetarian Pasta',
                        img: 'pasta.jpg',
                        description: 'Delicious vegetarian pasta dish.',
                        cookingTime: 20,
                        preparingTime: 10,
                        totalTime: 30,
                        servings: 2,
                        tags: ['vegetarian', 'pasta'],
                        formOfDiet: 'vegetarian',
                        userId: 'user123',
                    },
                    dinner: {
                        id: 201,
                        name: 'Grilled Chicken Salad',
                        img: 'salad.jpg',
                        description: 'Healthy grilled chicken salad.',
                        cookingTime: 15,
                        preparingTime: 10,
                        totalTime: 25,
                        servings: 1,
                        tags: ['chicken', 'salad'],
                        formOfDiet: 'regular',
                        userId: 'user123',
                    },
                },
            ],
        };
        const recipesFromHistory = [101, 201];
        expect([...service.extractRecipeIdsFromPreviousWeekplan(exampleWeekplan)].sort()).toStrictEqual(
            [...recipesFromHistory].sort(),
        );
    });
});
