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
        const preferencesFiltered: Preferences = {
            formOfDiet: preferences.formOfDiet,
            allergenes: null,
            foodDislikes: null,
        };
        this.recipeService.findWithPreferences(preferencesFiltered);
        await this.prismaService.weekplan.create({
            data: {
                id: 1,
                startDate: new Date(),
                endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
                weekplanEntry: {
                    createMany: {
                        data: week.map((dayEntry) => ({
                            date: new Date(new Date().setDate(new Date().getDate() + dayEntry)),
                            recipeId: 1,
                        })),
                    },
                },
            },
        });

        return 'This action adds a new weekplan';
    }

    async delete(id = 1) {
        await this.prismaService.weekplan.delete({
            where: {
                id: 1,
            },
            include: {
                weekplanEntry: true,
            },
        });
    }

    async findById(id: number) {
        await this.create();
        const weekPlan = await this.prismaService.weekplan.findUnique({
            where: {
                id,
            },
            include: {
                weekplanEntry: true,
            },
        });
        return weekPlan;
    }
}
