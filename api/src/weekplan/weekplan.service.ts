import { WeekplanEntry } from 'src/types/types';
import { IFormattedWeekplan, IWeekplan, IWeekplanEntry } from './weekplan.interface';
import { ChangeRecipeDto } from './dto/change-recipe.dto';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { shuffleArray } from 'src/helpers/converter.utils';
import { User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class WeekplanService {
    constructor(
        private prismaService: PrismaService,
        private recipeService: RecipesService,
        private shoppingListService: ShoppingListService,
    ) {}

    async get(userId: string) {
        try {
            const weekplans = await this.prismaService.weekplan.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    weekplanEntry: {
                        include: {
                            lunch: true,
                            dinner: true,
                        },
                    },
                },
            });
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
        //Delete existing weekplan
        try {
            const existingWeekplan = await this.queryExistingWeekplan(userId);
            if (existingWeekplan) {
                await this.prismaService.weekplanEntry.deleteMany({
                    where: { weekplanId: existingWeekplan.id },
                });
                await this.prismaService.weekplan.delete({
                    where: { id: existingWeekplan.id },
                });
            }
        } catch (error) {
            throw new InternalServerErrorException(
                'Error: Failed to cleanup/delete existing shoppinglist for given user',
            );
        }

        try {
            const fetchedMealsAndWeekplanPreferences = await this.recipeService.filterByPreferences(userId);
            let fetchedMeals = fetchedMealsAndWeekplanPreferences.recipes;
            if (fetchedMeals.length < 14) {
                fetchedMeals = [...fetchedMeals, ...fetchedMeals];
            }
            const shuffeledMeals = shuffleArray(fetchedMeals);
            const weekPlan = await this.prismaService.weekplan.create({
                data: {
                    userId: userId,
                    startDate: new Date(),
                    endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
                    hasDinner: fetchedMealsAndWeekplanPreferences.wantsDinner,
                    hasLunch: fetchedMealsAndWeekplanPreferences.wantsLunch,
                    weekplanEntry: {
                        createMany: {
                            data: this.createWeekplanData(
                                fetchedMealsAndWeekplanPreferences.days,
                                shuffeledMeals,
                                fetchedMealsAndWeekplanPreferences.wantsLunch,
                                fetchedMealsAndWeekplanPreferences.wantsDinner,
                            ),
                        },
                    },
                },
                include: {
                    weekplanEntry: {
                        include: {
                            lunch: true,
                            dinner: true,
                        },
                    },
                },
            });
            const weekplanRecipeIds = weekPlan.weekplanEntry
                .flatMap((entry) => [entry.lunchId, entry.dinnerId])
                .filter((id) => id !== null);
            this.shoppingListService.create(weekplanRecipeIds, userId);
            return this.formatWeekPlan(weekPlan);
        } catch (error) {
            throw new HttpException('creating weekplan failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async queryExistingWeekplan(userId: string) {
        const weekplan = await this.prismaService.weekplan.findFirst({
            where: {
                userId: userId,
            },
            include: { weekplanEntry: true },
        });
        return weekplan;
    }

    async changeRecipe(changeRecipeReq: ChangeRecipeDto, user: User) {
        try {
            const weekplanEntry = await this.prismaService.weekplanEntry.findFirst({
                where: { id: +changeRecipeReq.weekplanEntry, weekplan: { userId: user.userId } },
                include: { weekplan: true },
            });

            if (!weekplanEntry) {
                throw new InternalServerErrorException('Error: Failed to change Recipe no weekplanEntry');
            }
            if (changeRecipeReq.isLunch) {
                if (changeRecipeReq.id) {
                    await this.prismaService.weekplanEntry.update({
                        where: { id: +changeRecipeReq.weekplanEntry },
                        data: { lunchId: +changeRecipeReq.id },
                    });
                } else {
                    await this.prismaService.weekplanEntry.update({
                        where: { id: +changeRecipeReq.weekplanEntry },
                        data: { lunch: { disconnect: true } },
                    });
                }
            } else if (changeRecipeReq.isDinner) {
                if (changeRecipeReq.id) {
                    await this.prismaService.weekplanEntry.update({
                        where: { id: +changeRecipeReq.weekplanEntry },
                        data: { dinnerId: +changeRecipeReq.id },
                    });
                } else {
                    await this.prismaService.weekplanEntry.update({
                        where: { id: +changeRecipeReq.weekplanEntry },
                        data: { dinner: { disconnect: true } },
                    });
                }
            }
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to change Recipe for given user');
        }
    }

    createWeekplanData(
        daysPreferences: number[],
        shuffeledMeals: { id: number }[],
        wantsLunch: boolean,
        wantsDinner: boolean,
    ) {
        const week = [0, 1, 2, 3, 4, 5, 6];
        let recipeCounter = 0;
        const weekplan = week.map((dayEntry) => {
            const weekplanEntry: WeekplanEntry = {
                date: new Date(new Date().setDate(new Date().getDate() + dayEntry)),
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
