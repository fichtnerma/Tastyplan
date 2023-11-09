import { WeekplanEntry } from 'src/types/types';
import { WeekplanQueries } from './weekplan.queries';
import { CreateWeekplan, IFormattedWeekplan, IWeekplan, IWeekplanEntry } from './weekplan.interface';
import { ChangeRecipeDto } from './dto/change-recipe.dto';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { shuffleArray } from 'src/helpers/converter.utils';
import { User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class WeekplanService {
    constructor(
        private recipeFilterService: RecipesFilterService,
        private preferencesService: PreferencesService,
        private shoppingListService: ShoppingListService,
        private weekplanQueries: WeekplanQueries,
    ) {}

    async getCurrentWeekplan(userId: string) {
        try {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const weekplans = await this.weekplanQueries.findManyWeekplans(userId);
            const filteredWeekplans = weekplans.filter((plan) => {
                if (plan !== undefined && plan !== null) {
                    const start = plan.startDate;
                    const end = plan.endDate;
                    return start <= now && now <= end;
                }
                return false;
            });
            return filteredWeekplans[0];
        } catch (error) {
            throw new HttpException(
                'Error: Getting the ID of the actual weekplan failed!',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
    async current(userId: string) {
        return this.formatWeekPlan(await this.getCurrentWeekplan(userId));
    }

    async get(userId: string) {
        try {
            const weekplans = await this.weekplanQueries.findManyWeekplans(userId);
            const filteredWeekplans = weekplans.sort((a, b) => {
                return (
                    new Date(b.startDate).getTime() -
                    new Date().getTime() -
                    (new Date(a.startDate).getTime() - new Date().getTime())
                );
            });
            return this.formatWeekPlan(filteredWeekplans[0]);
        } catch (error) {
            throw new HttpException('getting weekplan failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    formatWeekPlan(weekplan: IWeekplan): IFormattedWeekplan {
        const formattedWeekPlan = {
            startDate: weekplan.startDate,
            endDate: weekplan.endDate,
            hasDinner: weekplan.hasDinner,
            hasLunch: weekplan.hasLunch,
            weekplanEntry: weekplan.weekplanEntry.map((entry: IWeekplanEntry) => ({
                id: entry.id,
                date: entry.date,
                lunch: entry.lunch && {
                    id: entry.lunch.id,
                    name: entry.lunch.name,
                    img: entry.lunch.img,
                    preparingTime: entry.lunch.preparingTime,
                    cookingTime: entry.lunch.cookingTime,
                    formOfDiet: entry.lunch.formOfDiet,
                },
                dinner: entry.dinner && {
                    id: entry.dinner.id,
                    name: entry.dinner.name,
                    img: entry.dinner.img,
                    preparingTime: entry.dinner.preparingTime,
                    cookingTime: entry.dinner.cookingTime,
                    formOfDiet: entry.dinner.formOfDiet,
                },
            })),
        };
        formattedWeekPlan.weekplanEntry = formattedWeekPlan.weekplanEntry.sort((a, b) => a.id - b.id);
        return formattedWeekPlan;
    }

    async create(userId: string) {
        let weekplanStartDate = new Date();
        let weekplanEndDate = new Date();
        try {
            const existingWeekplan = await this.queryExistingWeekplan(userId);
            if (existingWeekplan) {
                const startDate = new Date();
                startDate.setDate(startDate.getDate() + 2);
                startDate.setHours(0, 0, 0, 0);
                weekplanStartDate = startDate;

                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 8);
                endDate.setHours(0, 0, 0, 0);
                weekplanEndDate = endDate;
            } else {
                const startDate = new Date();
                startDate.setHours(0, 0, 0, 0);
                weekplanStartDate = startDate;

                const endDate = new Date();
                endDate.setDate(endDate.getDate() + 6);
                endDate.setHours(0, 0, 0, 0);
                weekplanEndDate = endDate;
            }
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to create new Weekplan dates');
        }
        await this.createWeakplan(userId, weekplanStartDate, weekplanEndDate);
    }

    async regenerate(userId: string) {
        const currentWeekplan = await this.getCurrentWeekplan(userId);
        try {
            if (currentWeekplan) {
                await this.weekplanQueries.deleteManyWeekplanEntries(currentWeekplan.id);
                await this.weekplanQueries.deleteWeekplan(currentWeekplan.id);
            }
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to delete current weekplan for given user!');
        }
        return await this.createWeakplan(userId, currentWeekplan.startDate, currentWeekplan.endDate);
    }

    async createWeakplan(userId: string, weekplanStartDate: Date, weekplanEndDate: Date) {
        try {
            const preferences = await this.preferencesService.getPreferences(userId);
            const fetchedMealsAndWeekplanPreferences = await this.recipeFilterService.filterByQuery(preferences);
            let fetchedMeals = fetchedMealsAndWeekplanPreferences.recipes;
            if (fetchedMeals.length < 14) {
                fetchedMeals = [...fetchedMeals, ...fetchedMeals];
            }
            const shuffeledMeals = shuffleArray(fetchedMeals);

            //Using own Type "CreateWeekplan" because we only use ids of recipes for lunch and dinner in creation
            const weekplan: CreateWeekplan = {
                userId: userId,
                startDate: weekplanStartDate,
                endDate: weekplanEndDate,
                hasDinner: fetchedMealsAndWeekplanPreferences.wantsDinner,
                hasLunch: fetchedMealsAndWeekplanPreferences.wantsLunch,
                weekplanEntry: this.createWeekplanData(
                    fetchedMealsAndWeekplanPreferences.days,
                    shuffeledMeals,
                    fetchedMealsAndWeekplanPreferences.wantsLunch,
                    fetchedMealsAndWeekplanPreferences.wantsDinner,
                ),
            };
            const createdWeekplan = await this.weekplanQueries.createWeekplan(weekplan);
            //TODO: Rewrite the shoppingList creation => One ShoppingList for one Weekplan
            // This is the part where the shoppingList is created
            // For now this is outcommented because the shoppingList is not used in the frontend
            /* const weekplanRecipeIds = createdWeekplan.weekplanEntry
                .flatMap((entry) => [entry.lunchId, entry.dinnerId])
                .filter((id) => id !== null);
            this.shoppingListService.create(weekplanRecipeIds, userId); */
            return this.formatWeekPlan(createdWeekplan);
        } catch (error) {
            throw new HttpException('Error: Creating weekplan failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async queryExistingWeekplan(userId: string) {
        return await this.weekplanQueries.findFirstWeekplan(userId);
    }

    async changeRecipe(changeRecipeReq: ChangeRecipeDto, user: User) {
        try {
            const weekplanEntry = await this.weekplanQueries.findFirstWeekplanEntry(
                +changeRecipeReq.weekplanEntry,
                user.userId,
            );
            if (!weekplanEntry) {
                throw new InternalServerErrorException('Error: Failed to change Recipe no weekplanEntry');
            }
            if (changeRecipeReq.isLunch) {
                if (changeRecipeReq.id) {
                    await this.weekplanQueries.updateWeekplanEntryLunchWithId(
                        +changeRecipeReq.weekplanEntry,
                        +changeRecipeReq.id,
                    );
                } else {
                    await this.weekplanQueries.updateWeekplanEntryLunchWithoutId(+changeRecipeReq.weekplanEntry);
                }
            } else if (changeRecipeReq.isDinner) {
                if (changeRecipeReq.id) {
                    await this.weekplanQueries.updateWeekplanEntryDinnerWithId(
                        +changeRecipeReq.weekplanEntry,
                        +changeRecipeReq.id,
                    );
                } else {
                    await this.weekplanQueries.updateWeekplanEntryDinnerWithoutId(+changeRecipeReq.weekplanEntry);
                }
            }
            return await this.weekplanQueries.findFirstRecipe(+changeRecipeReq.id);
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to change Recipe for given user');
        }
    }

    createWeekplanData(
        daysPreferences: string[],
        shuffeledMeals: { id: number }[],
        wantsLunch: boolean,
        wantsDinner: boolean,
    ): WeekplanEntry[] {
        const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = new Date().getDay();
        const sortedWeek = [...week.slice(today), ...week.slice(0, today)];
        let recipeCounter = 0;
        const weekplan = sortedWeek.map((dayEntry, index) => {
            const weekplanEntry: WeekplanEntry = {
                date: new Date(new Date().setDate(new Date().getDate() + index)),
            };
            if (daysPreferences.includes(dayEntry) && wantsLunch) {
                weekplanEntry.lunchId = shuffeledMeals[recipeCounter]?.id || 1;
                recipeCounter++;
            }
            if (daysPreferences.includes(dayEntry) && wantsDinner) {
                weekplanEntry.dinnerId = shuffeledMeals[recipeCounter]?.id || 1;
                recipeCounter++;
            }
            return weekplanEntry;
        });
        return weekplan;
    }
}
