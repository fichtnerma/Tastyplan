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
                            recipe: true,
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
            weekplanEntry: weekplan.weekplanEntry.map((entry: IWeekplanEntry) => ({
                id: entry.id,
                date: entry.date,
                recipe: entry.recipe
                    ? {
                          id: entry.recipe.id,
                          name: entry.recipe.name,
                          img: entry.recipe.img,
                          preparingTime: entry.recipe.preparingTime,
                          cookingTime: entry.recipe.cookingTime,
                          formOfDiet: entry.recipe.formOfDiet,
                      }
                    : null,
            })),
        };
        formattedWeekPlan.weekplanEntry = formattedWeekPlan.weekplanEntry.sort((a, b) => a.id - b.id);
        return formattedWeekPlan;
    }

    async create(userId: string) {
        const week = [0, 1, 2, 3, 4, 5, 6];

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
                    weekplanEntry: {
                        createMany: {
                            data: week.map((dayEntry) => ({
                                date: new Date(new Date().setDate(new Date().getDate() + dayEntry)),
                                recipeId: shuffeledMeals[dayEntry]?.id || 1,
                            })),
                        },
                    },
                },
                include: {
                    weekplanEntry: {
                        include: {
                            recipe: true,
                        },
                    },
                },
            });

            const weekplanRecipeIds = weekPlan.weekplanEntry.map((entry) => entry.recipeId);

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
            if (changeRecipeReq.id) {
                await this.prismaService.weekplanEntry.update({
                    where: { id: +changeRecipeReq.weekplanEntry },
                    data: { recipeId: +changeRecipeReq.id },
                });
            } else {
                await this.prismaService.weekplanEntry.update({
                    where: { id: +changeRecipeReq.weekplanEntry },
                    data: { recipe: { disconnect: true } },
                });
            }
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to change Recipe for given user');
        }
    }
}
