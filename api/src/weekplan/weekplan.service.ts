import { Injectable } from '@nestjs/common';
import { type } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipesService } from 'src/recipes/recipes.service';

type Preferences = {
    formOfDiet: string;
    allergenes: string[] | null;
    foodDislikes: string[] | null;
};
@Injectable()
export class WeekplanService {
    constructor(private prismaService: PrismaService, private recipeService: RecipesService) {}

    async create() {
        const week = [0, 1, 2, 3, 4, 5, 6];
        await this.delete();
        const preferences = await this.prismaService.preferences.findUnique({
            where: {
                id: 1,
            },
        });
        console.log(preferences);
        const preferencesFiltered: Preferences = {
            formOfDiet: preferences.formOfDiet.charAt(0).toUpperCase() + preferences.formOfDiet.slice(1) || 'Omnivor',
            allergenes: [],
            foodDislikes: [],
        };
        let recommendedMeals = await this.recipeService.findWithPreferences(preferencesFiltered);
        console.log(recommendedMeals);

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
        await this.prismaService.weekplan.create({
            data: {
                id: 1,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
                weekplanEntry: {
                    createMany: {
                        data: week.map((dayEntry) => ({
                            date: new Date(new Date().setDate(new Date().getDate() + dayEntry)),
                            recipeId: recommendedMeals[dayEntry].id,
                        })),
                    },
                },
            },
        });

        return 'This action adds a new weekplan';
    }

    async delete(id = 1) {
        try {
            await this.prismaService.weekplan.delete({
                where: {
                    id: 1,
                },
                include: {
                    weekplanEntry: true,
                },
            });
        } catch (error) {
            console.log("Couldn't delete weekplan");
        }
    }

    async findById(id: number) {
        console.log('find by id', id);

        await this.create();
        const weekPlan = await this.prismaService.weekplan.findUnique({
            where: {
                id: 1,
            },
            include: {
                weekplanEntry: {
                    include: {
                        recipe: true,
                    },
                },
            },
        });
        const formattedWeekPlan = {
            startDate: weekPlan.startDate,
            endDate: weekPlan.endDate,
            weekplanEntry: weekPlan.weekplanEntry.map((entry) => ({
                date: entry.date,
                recipe: {
                    id: entry.recipe.id,
                    name: entry.recipe.name,
                    img: entry.recipe.img,
                    difficulty: entry.recipe.difficulty,
                    preparingTime: entry.recipe.preparingTime,
                    cookingTime: entry.recipe.cookingTime,
                    formOfDiet: entry.recipe.formOfDiet,
                },
            })),
        };
        return formattedWeekPlan;
    }
}
