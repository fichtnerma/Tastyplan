import { IFormattedWeekplan, IWeekplan, IWeekplanEntry } from './weekplan.interface';
import { ShoppingListService } from 'src/shopping-list/shopping-list.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class WeekplanService {
    constructor(
        private prismaService: PrismaService,
        private recipeService: RecipesService,
        private shoppingListService: ShoppingListService,
    ) {}

    async get(user: User) {
        try {
            const weekplans = await this.prismaService.weekplan.findMany({
                where: {
                    userId: user.userId,
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
                date: entry.date,
                recipe: {
                    id: entry.recipe.id,
                    name: entry.recipe.name,
                    img: entry.recipe.img,
                    preparingTime: entry.recipe.preparingTime,
                    cookingTime: entry.recipe.cookingTime,
                    formOfDiet: entry.recipe.formOfDiet,
                },
            })),
        };
        return formattedWeekPlan;
    }

    async create(user: User) {
        const week = [0, 1, 2, 3, 4, 5, 6];

        //Delete existing weekplan
        try {
            const existingWeekplan = await this.queryExistingWeekplan(user.userId);
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
            let fetchedMeals = await this.recipeService.filterByPreferences(user);
            console.log(fetchedMeals);

            if (fetchedMeals.length < 7) {
                fetchedMeals = [
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                    ...fetchedMeals,
                ];
            }
            const shuffeledMeals = this.shuffleArray(fetchedMeals);
            const weekPlan = await this.prismaService.weekplan.create({
                data: {
                    userId: user.userId,
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

            this.shoppingListService.create(weekplanRecipeIds, user);

            return this.formatWeekPlan(weekPlan);
        } catch (error) {
            throw new HttpException('creating weekplan failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    shuffleArray(array: { id: number }[]) {
        let currentIndex = array.length,
            randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
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
}
