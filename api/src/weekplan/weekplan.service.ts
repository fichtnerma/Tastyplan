import { WeekplanEntry } from 'src/types/types';
import { WeekplanQueries } from './weekplan.queries';
import { CreateWeekplan, IFormattedWeekplan, IWeekplan, IWeekplanEntry } from './weekplan.interface';
import { ChangeRecipeDto } from './dto/change-recipe.dto';
import { RecipesFilterService } from 'src/recipes/recipesFilter.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { IPreferences } from 'src/preferences/preferences.interface';
import { shuffleArray } from 'src/helpers/converter.utils';
import { User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class WeekplanService {
    constructor(
        private recipeFilterService: RecipesFilterService,
        private preferencesService: PreferencesService,
        private weekplanQueries: WeekplanQueries,
    ) {}

    getCurrentWeekplan(weekplans?: IWeekplan[], now: Date = new Date()) {
        try {
            now.setHours(0, 0, 0, 0);
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
    //Orchistration function
    async current(userId: string) {
        const weekplans = await this.weekplanQueries.findManyWeekplans(userId);
        return this.formatWeekPlan(await this.getCurrentWeekplan(weekplans));
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
                    totalTime: entry.lunch.totalTime,
                    formOfDiet: entry.lunch.formOfDiet,
                },
                dinner: entry.dinner && {
                    id: entry.dinner.id,
                    name: entry.dinner.name,
                    img: entry.dinner.img,
                    preparingTime: entry.dinner.preparingTime,
                    cookingTime: entry.dinner.cookingTime,
                    totalTime: entry.dinner.totalTime,
                    formOfDiet: entry.dinner.formOfDiet,
                },
            })),
        };
        formattedWeekPlan.weekplanEntry = formattedWeekPlan.weekplanEntry.sort((a, b) => a.id - b.id);
        return formattedWeekPlan;
    }
    //Orchistration function
    async findByDate(userId: string, date: Date) {
        const weekplan = await this.weekplanQueries.findWeekplanByDate(date, userId);

        if (!weekplan) {
            return this.createWeekDateTimeRange(date);
        }
        return this.formatWeekPlan(weekplan);
    }

    //Orchistration function
    async createFutureWeekplan(userId: string, startDate: Date, shouldReplace = false) {
        const prevStartDate = this.getPreviousWeekStartDate(startDate);
        const previousWeekplan = await this.weekplanQueries.findWeekplanByDate(prevStartDate, userId);
        const existingWeekplan = await this.weekplanQueries.findWeekplanByDate(startDate, userId);
        if (existingWeekplan) {
            if (!shouldReplace) {
                throw new HttpException('Error: Weekplan for this date already exists!', HttpStatus.BAD_REQUEST);
            } else {
                await this.weekplanQueries.deleteManyWeekplanEntries(existingWeekplan.id);
                await this.weekplanQueries.deleteWeekplan(existingWeekplan.id);
            }
        }

        const { startDate: _, endDate } = this.createDateRangeForWeekplanCreation(new Date(startDate));
        let recommendedMeals = [];
        if (previousWeekplan) {
            const recipesFromHistory: Array<number> = this.extractRecipeIdsFromPreviousWeekplan(previousWeekplan);

            const recommendedMealsRes = await fetch(`${process.env.RECOMMENDER_URL}/recommend`, {
                method: 'POST',
                body: JSON.stringify({ userId, recipesFromHistory }),
            });
            recommendedMeals = await recommendedMealsRes.json();
        }

        const weekplan = await this.createWeakplan(userId, startDate, endDate, recommendedMeals);

        return weekplan;
    }

    //Orchistaion function
    async create(userId: string) {
        let weekplanStartDate = new Date();
        let weekplanEndDate = new Date();
        try {
            const existingWeekplan = await this.queryExistingWeekplan(userId);
            if (existingWeekplan) {
                const { startDate } = this.createDateRangeForWeekplanCreation(new Date(), false);
                this.createFutureWeekplan(userId, startDate);
            } else {
                const { startDate, endDate } = this.createDateRangeForWeekplanCreation(new Date());
                weekplanStartDate = startDate;
                weekplanEndDate = endDate;
            }
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to create new Weekplan dates');
        }
        return await this.createWeakplan(userId, weekplanStartDate, weekplanEndDate);
    }
    //Orchestration function
    async regenerate(userId: string) {
        const weekplans = await this.weekplanQueries.findManyWeekplans(userId);
        const currentWeekplan = await this.getCurrentWeekplan(weekplans);
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

    async createWeakplan(
        userId: string,
        weekplanStartDate: Date,
        weekplanEndDate: Date,
        recommendedMeals: Array<number> = [],
    ) {
        try {
            const preferences = await this.preferencesService.getPreferences(userId);
            const fetchedMealsAndWeekplanPreferences = await this.recipeFilterService.filterByQuery(preferences);

            const recipeList = this.createCompleteRecipeList(
                fetchedMealsAndWeekplanPreferences.recipes,
                recommendedMeals,
            );
            const shuffeledMeals = shuffleArray(recipeList);

            const weekplan: Partial<CreateWeekplan> = this.createWeekplanPartial(
                userId,
                weekplanStartDate,
                weekplanEndDate,
                fetchedMealsAndWeekplanPreferences,
            );
            weekplan.weekplanEntry = this.createWeekplanData(
                fetchedMealsAndWeekplanPreferences.days,
                shuffeledMeals,
                fetchedMealsAndWeekplanPreferences.wantsLunch,
                fetchedMealsAndWeekplanPreferences.wantsDinner,
            );
            const createdWeekplan = await this.weekplanQueries.createWeekplan(weekplan as CreateWeekplan);

            return this.formatWeekPlan(createdWeekplan);
        } catch (error) {
            console.log(error);
            throw new HttpException('Error: Creating weekplan failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async queryExistingWeekplan(userId: string) {
        return await this.weekplanQueries.findFirstWeekplan(userId);
    }

    //Orchestration function
    async changeRecipe(changeRecipeReq: ChangeRecipeDto, user: User) {
        try {
            const changedRecipeReqId = changeRecipeReq.id ? +changeRecipeReq.id : 1;
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
                        changedRecipeReqId,
                    );
                } else {
                    await this.weekplanQueries.updateWeekplanEntryLunchWithoutId(+changeRecipeReq.weekplanEntry);
                }
            } else if (changeRecipeReq.isDinner) {
                if (changeRecipeReq.id) {
                    await this.weekplanQueries.updateWeekplanEntryDinnerWithId(
                        +changeRecipeReq.weekplanEntry,
                        changedRecipeReqId,
                    );
                } else {
                    await this.weekplanQueries.updateWeekplanEntryDinnerWithoutId(+changeRecipeReq.weekplanEntry);
                }
            }
            // If no recipe is send, than default recipe 1 is stored and undefined send back to frontend
            if (!changeRecipeReq.id) {
                await this.weekplanQueries.findFirstRecipe(changedRecipeReqId);
                return undefined;
            }
            return await this.weekplanQueries.findFirstRecipe(changedRecipeReqId);
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to change Recipe for given user');
        }
    }

    createWeekplanData(
        daysPreferences: string[],
        shuffeledMeals: { id: number }[],
        wantsLunch: boolean,
        wantsDinner: boolean,
        startDate: Date = new Date(),
    ): WeekplanEntry[] {
        const week = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const today = startDate.getDay();
        const sortedWeek = [...week.slice(today), ...week.slice(0, today)];
        let recipeCounter = 0;
        const weekplan = sortedWeek.map((dayEntry, index) => {
            const entryDay = new Date(new Date(startDate).setDate(startDate.getDate() + index));
            entryDay.setUTCHours(0, 0, 0, 0);
            const weekplanEntry: WeekplanEntry = {
                date: entryDay,
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

    createWeekDateTimeRange(date: Date) {
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 6);
        return {
            startDate: date,
            endDate: endDate,
        };
    }

    createDateRangeForWeekplanCreation(dateInput: Date, returnWithEndDate = true) {
        const utcDateInput = new Date(Date.UTC(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate()));
        if (returnWithEndDate) {
            const startDate = new Date(utcDateInput);
            startDate.setUTCHours(0, 0, 0, 0);
            const endDate = new Date(utcDateInput);
            endDate.setUTCDate(endDate.getUTCDate() + 6);
            endDate.setUTCHours(0, 0, 0, 0);
            return { startDate, endDate };
        } else {
            const startDate = new Date(utcDateInput);
            startDate.setUTCDate(startDate.getUTCDate() + 2);
            startDate.setUTCHours(0, 0, 0, 0);
            return { startDate };
        }
    }

    getPreviousWeekStartDate(startDate: Date) {
        const prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - 7);
        return prevStartDate;
    }

    extractRecipeIdsFromPreviousWeekplan(previousWeekplan: IWeekplan | null) {
        if (!previousWeekplan) {
            return [];
        }
        return previousWeekplan.weekplanEntry.reduce((currentEntries: Array<number>, entry: IWeekplanEntry) => {
            if (entry.dinner?.id) {
                currentEntries.push(entry.dinner.id);
            }
            if (entry.lunch?.id) {
                currentEntries.push(entry.lunch.id);
            }
            return currentEntries;
        }, []);
    }

    createCompleteRecipeList(fetchedRecipeIds: { id: number }[], recommendedRecipes: number[]) {
        if (recommendedRecipes.length > 0) {
            fetchedRecipeIds = recommendedRecipes.map((id: number) => ({ id }));
        }
        if (fetchedRecipeIds.length < 14) {
            fetchedRecipeIds = Array(14 / +fetchedRecipeIds.length)
                .fill([...fetchedRecipeIds])
                .reduce((a, b) => a.concat(b));
        }
        return fetchedRecipeIds;
    }
    createWeekplanPartial(
        userId: string,
        startDate: Date,
        endDate: Date,
        fetchedPreferences: Omit<IPreferences, 'formOfDiet' | 'servings'>,
    ) {
        return {
            userId: userId,
            startDate: startDate,
            endDate: endDate,
            hasDinner: fetchedPreferences.wantsDinner,
            hasLunch: fetchedPreferences.wantsLunch,
        };
    }
}
