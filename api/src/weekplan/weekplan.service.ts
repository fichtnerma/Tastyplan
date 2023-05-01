import { IWeekplan, IWeekplanEntry } from './weekplan.interface';
import { RecipesService } from 'src/recipes/recipes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeekplanService {
    constructor(private prismaService: PrismaService, private recipeService: RecipesService) {}

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
            return { error: 'No weekplan found' };
        }
    }

    private formatWeekPlan(weekplan: IWeekplan) {
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

        let recommendedMeals = await this.recipeService.filterByPreferences(user);

        if (recommendedMeals.length < 7) {
            recommendedMeals = [
                ...recommendedMeals,
                ...recommendedMeals,
                ...recommendedMeals,
                ...recommendedMeals,
                ...recommendedMeals,
                ...recommendedMeals,
                ...recommendedMeals,
            ];
        }
        const weekPlan = await this.prismaService.weekplan.create({
            data: {
                userId: user.userId,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
                weekplanEntry: {
                    createMany: {
                        data: week.map((dayEntry) => ({
                            date: new Date(new Date().setDate(new Date().getDate() + dayEntry)),
                            recipeId: recommendedMeals[dayEntry]?.id || 1,
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
        return this.formatWeekPlan(weekPlan);
    }
}
