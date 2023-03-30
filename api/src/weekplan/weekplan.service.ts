import { Injectable } from '@nestjs/common';
import { type } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipesService } from 'src/recipes/recipes.service';

type Preferences = {
    formOfDiet: string;
    allergenes: string[] | null;
    foodDislikes: { id: number; name: string }[] | null;
};
@Injectable()
export class WeekplanService {
    constructor(private prismaService: PrismaService, private recipeService: RecipesService) {}

    async createOrGet() {
        const week = [0, 1, 2, 3, 4, 5, 6];
        const preferences = await this.prismaService.preferences.findUnique({
            where: {
                id: 1,
            },
        });

        const preferencesFiltered: Preferences = {
            formOfDiet: preferences.formOfDiet.charAt(0).toUpperCase() + preferences.formOfDiet.slice(1) || 'Omnivor',
            allergenes: [],
            foodDislikes: [],
        };

        let recommendedMeals = await this.recipeService.findWithPreferences(preferencesFiltered);

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
        console.log(recommendedMeals);

        const weekplan = await this.prismaService.weekplan.upsert({
            where: {
                id: 1,
            },
            update: {
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
            create: {
                id: 1,
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

        return weekplan;
    }

    async findForUser(id: number) {
        const weekPlan = await this.createOrGet();

        const formattedWeekPlan = {
            startDate: weekPlan.startDate,
            endDate: weekPlan.endDate,
            weekplanEntry: weekPlan.weekplanEntry.map((entry) => ({
                date: entry.date,
                recipe: {
                    id: entry.recipe.id,
                    name: entry.recipe.name,
                    img: entry.recipe.img,
                    totalTime: entry.recipe.totalTime,
                    description: entry.recipe.description,
                    tags: entry.recipe.tags,
                    preparingTime: entry.recipe.preparingTime,
                    cookingTime: entry.recipe.cookingTime,
                    formOfDiet: entry.recipe.formOfDiet,
                },
            })),
        };
        return formattedWeekPlan;
    }
}
