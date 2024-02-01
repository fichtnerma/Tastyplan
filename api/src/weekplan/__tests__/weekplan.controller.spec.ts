import { WeekplanService } from '../weekplan.service';
import { WeekplanQueries } from '../weekplan.queries';
import { IFormattedWeekplan } from '../weekplan.interface';
import { WeekplanController } from '../weekplan.controller';
import { ChangeRecipeDto } from '../dto/change-recipe.dto';
import { RequestWithUser } from 'src/users/users.interface';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Recipe } from '@prisma/client';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('WeekplanController', () => {
    let controller: WeekplanController;
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

    const mockRequestWithUser = {
        user: {
            id: '1',
            userId: '1',
        },
        cookies: {},
    } as RequestWithUser;

    const mockFormattedWeekplan: IFormattedWeekplan = {
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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [WeekplanController],
            providers: [
                WeekplanService,
                { provide: RecipesFilterService, useValue: mockRecipesFilterService() },
                { provide: PreferencesService, useValue: mockPreferencesService() },
                { provide: WeekplanQueries, useValue: mockWeekplanQueries() },
            ],
        }).compile();

        controller = module.get<WeekplanController>(WeekplanController);
        service = module.get<WeekplanService>(WeekplanService);
    });
    it('POST: current => Should be called and return proper value', async () => {
        const expectedExampleFormattedWeekplan: IFormattedWeekplan = {
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
        jest.spyOn(service, 'current').mockResolvedValue(expectedExampleFormattedWeekplan);
        const returnValue = await controller.findOne(mockRequestWithUser);

        expect(service.current).toHaveBeenCalledTimes(1);
        expect(returnValue).toEqual(expectedExampleFormattedWeekplan);
    });
    it('POST: current => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'current').mockImplementation(() => {
            throw new Error();
        });

        try {
            await controller.findOne(mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('GET: :date => Should call method and return weekplan', async () => {
        jest.spyOn(service, 'findByDate').mockResolvedValue(mockFormattedWeekplan);
        const result = await controller.findByStartDate({ date: new Date(2024, 1, 1) }, mockRequestWithUser);

        expect(service.findByDate).toHaveBeenCalledTimes(1);
        expect(result).toBe(mockFormattedWeekplan);
    });
    it('GET: :date => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'findByDate').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.findByStartDate({ date: new Date(2024, 1, 1) }, mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('POST: create => Should call method', async () => {
        jest.spyOn(service, 'create').mockResolvedValue(null);
        await controller.create(mockRequestWithUser);

        expect(service.create).toHaveBeenCalledTimes(1);
    });
    it('POST: create => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'create').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.create(mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
    it('POST: createForDate => Should call method and return weekplan', async () => {
        jest.spyOn(service, 'createFutureWeekplan').mockResolvedValue(mockFormattedWeekplan);
        const result = await controller.createForDate(mockRequestWithUser, {
            date: new Date('2024-02-01'),
            shouldReplace: true,
        });
        expect(result).toBe(mockFormattedWeekplan);
    });
    it('POST: createForDate => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'createFutureWeekplan').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.createForDate(mockRequestWithUser, {
                date: new Date('2024-02-01'),
                shouldReplace: true,
            });
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('POST: regenerate => Should call method and return weekplan', async () => {
        jest.spyOn(service, 'regenerate').mockResolvedValue(mockFormattedWeekplan);
        const result = await controller.regenerate(mockRequestWithUser);
        expect(result).toBe(mockFormattedWeekplan);
    });
    it('POST: regenerate => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'regenerate').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.regenerate(mockRequestWithUser);
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });

    it('POST: changeRecipe => Should call method and return weekplan', async () => {
        const mockChangedRecipe: Recipe = {
            id: 1,
            name: 'Test Recipe',
            img: null,
            description: null,
            cookingTime: null,
            preparingTime: null,
            totalTime: null,
            servings: 4,
            tags: ['test'],
            formOfDiet: 'Test Diet',
            userId: null,
        };
        const mockChangedRecipeDto: ChangeRecipeDto = {
            id: 'test-id',
            weekplanEntry: 'test-entry',
            isLunch: true,
            isDinner: false,
        };
        jest.spyOn(service, 'changeRecipe').mockResolvedValue(mockChangedRecipe);
        const result = await controller.changeRecipe(mockChangedRecipeDto, mockRequestWithUser);

        expect(result).toEqual(mockChangedRecipe);
    });

    it('POST: changeRecipe => Should return HTTP exception in service error case', async () => {
        jest.spyOn(service, 'changeRecipe').mockImplementation(() => {
            throw new Error();
        });
        try {
            await controller.changeRecipe(
                {
                    id: 'test-id',
                    weekplanEntry: 'test-entry',
                    isLunch: true,
                    isDinner: false,
                },
                mockRequestWithUser,
            );
        } catch (error) {
            expect(error).toBeInstanceOf(HttpException);
            expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    });
});
