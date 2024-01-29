import { WeekplanEntry } from 'src/types/types';
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

    it('createCompleteRecipeList => Should return list of min 14 Recipes in case recommended recipe provided', () => {
        const exampleRecipeList = [
            { id: 23 },
            { id: 45 },
            { id: 12 },
            { id: 78 },
            { id: 56 },
            { id: 34 },
            { id: 89 },
            { id: 67 },
            { id: 21 },
            { id: 43 },
            { id: 90 },
            { id: 32 },
            { id: 65 },
            { id: 87 },
            { id: 10 },
            { id: 54 },
        ];
        const resultRecipeList = [
            { id: 2 },
            { id: 3 },
            { id: 2 },
            { id: 4 },
            { id: 5 },
            { id: 2 },
            { id: 7 },
            { id: 5 },
            { id: 3 },
            { id: 2 },
            { id: 4 },
            { id: 5 },
            { id: 8 },
            { id: 23 },
            { id: 23 },
            { id: 87 },
        ];
        const exmapleRecommendedRecipes = [2, 3, 2, 4, 5, 2, 7, 5, 3, 2, 4, 5, 8, 23, 23, 87];
        expect(service.createCompleteRecipeList(exampleRecipeList, exmapleRecommendedRecipes)).toStrictEqual(
            resultRecipeList,
        );
    });
    // TODO: Add additional test for not having 14 recipes

    it('createWeekplanPartial => Check if stringing data together works', () => {
        const userId = 'user123';
        const weekplanStartDate = new Date('2024-01-29T00:00:00.000Z');
        const weekplanEndDate = new Date('2024-02-04T00:00:00.000Z');
        const fetchedMealsAndWeekplanPreferences = {
            recipes: [
                { id: 1 },
                { id: 2 },
                { id: 4 },
                { id: 5 },
                { id: 8 },
                { id: 7 },
                { id: 432 },
                { id: 9 },
                { id: 10 },
                { id: 11 },
                { id: 87 },
                { id: 13 },
                { id: 12 },
                { id: 17 },
            ],
            days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            wantsDinner: true,
            wantsLunch: true,
        };
        const resultWeekplanPartial = {
            userId: 'user123',
            startDate: new Date('2024-01-29T00:00:00.000Z'),
            endDate: new Date('2024-02-04T00:00:00.000Z'),
            hasDinner: true,
            hasLunch: true,
        };
        expect(
            service.createWeekplanPartial(
                userId,
                weekplanStartDate,
                weekplanEndDate,
                fetchedMealsAndWeekplanPreferences,
            ),
        ).toStrictEqual(resultWeekplanPartial);
    });

    it('createWeekplanData => Should return a correctly maped weekplan', () => {
        const daysPrefernces = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const shuffeledMeals = [
            { id: 1 },
            { id: 2 },
            { id: 4 },
            { id: 5 },
            { id: 8 },
            { id: 7 },
            { id: 432 },
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 87 },
            { id: 13 },
            { id: 12 },
            { id: 17 },
        ];
        const wantsLunch = true;
        const wantsDinner = true;
        const startDate = new Date('2024-01-29T00:00:00.000Z');
        service.createWeekplanData(daysPrefernces, shuffeledMeals, wantsLunch, wantsDinner, startDate);
        const expectedOutput: WeekplanEntry[] = [
            { date: new Date('2024-01-29T00:00:00.000Z'), lunchId: 1, dinnerId: 2 },
            { date: new Date('2024-01-30T00:00:00.000Z'), lunchId: 4, dinnerId: 5 },
            { date: new Date('2024-01-31T00:00:00.000Z'), lunchId: 8, dinnerId: 7 },
            { date: new Date('2024-02-01T00:00:00.000Z'), lunchId: 432, dinnerId: 9 },
            { date: new Date('2024-02-02T00:00:00.000Z'), lunchId: 10, dinnerId: 11 },
            { date: new Date('2024-02-03T00:00:00.000Z'), lunchId: 87, dinnerId: 13 },
            { date: new Date('2024-02-04T00:00:00.000Z'), lunchId: 12, dinnerId: 17 },
        ];
        expect(
            service.createWeekplanData(daysPrefernces, shuffeledMeals, wantsLunch, wantsDinner, startDate),
        ).toStrictEqual(expectedOutput);
    });
    it('getCurrentWeekplan => Should return the actual weekplan', () => {
        const now = new Date('2024-01-31T00:00:00.000Z');
        const exampleWeekplans: IWeekplan[] = [
            {
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
            },
            {
                id: 2,
                userId: 'user123',
                startDate: new Date('2024-02-05'),
                endDate: new Date('2024-02-11'),
                hasLunch: true,
                hasDinner: true,
                weekplanEntry: [
                    {
                        id: 2,
                        date: new Date('2024-02-05'),
                        lunch: {
                            id: 102,
                            name: 'Vegan Burger',
                            img: 'burger.jpg',
                            description: 'Delicious vegan burger.',
                            cookingTime: 30,
                            preparingTime: 15,
                            totalTime: 45,
                            servings: 2,
                            tags: ['vegan', 'burger'],
                            formOfDiet: 'vegan',
                            userId: 'user123',
                        },
                        dinner: {
                            id: 202,
                            name: 'Steak with Potatoes',
                            img: 'steak.jpg',
                            description: 'Juicy steak with crispy potatoes.',
                            cookingTime: 40,
                            preparingTime: 20,
                            totalTime: 60,
                            servings: 1,
                            tags: ['steak', 'potatoes'],
                            formOfDiet: 'regular',
                            userId: 'user123',
                        },
                    },
                ],
            },
        ];

        const expectedResult: IWeekplan = {
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
        expect(service.getCurrentWeekplan(exampleWeekplans, now)).toStrictEqual(expectedResult);
    });
});
