import { Injectable } from '@nestjs/common';
import { Preferences, User } from '@prisma/client';
import { PreferencesService } from 'src/preferences/preferences.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
@Injectable()
export class RecipesService {
    constructor(private prismaService: PrismaService, private preferencesService: PreferencesService) {}

    async create(createRecipeDto: CreateRecipeDto) {
        return 'This action adds a new recipe';
    }

    async findById(id: number) {
        const recipe = await this.prismaService.recipe.findUnique({
            where: {
                id: id,
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                steps: true,
            },
        });

        const formattedRecipe = {
            id: recipe.id,
            name: recipe.name,
            img: recipe.img,
            formOfDiet: recipe.formOfDiet,
            difficulty: recipe.difficulty,
            preparingTime: recipe.preparingTime,
            cookingTime: recipe.cookingTime,
            ingredients: recipe.ingredients.map((item) => {
                return {
                    amount: item?.amount,
                    ingredient: item?.ingredient?.name,
                };
            }),
            steps: recipe.steps.map((item) => {
                return {
                    stepCount: item.stepCount,
                    description: item.description,
                };
            }),
        };
        console.log(formattedRecipe);

        return formattedRecipe;
    }

    async filterByPreferences(user: User) {
        const preferences = await this.preferencesService.getPreferences(user);
        console.log({ preferences });

        const dislikedIngredients = preferences.foodDislikes.map((item: any) => item.id);
        const allowedFormsOfDiet: any = {
            vegan: ['vegan'],
            vegetarian: ['vegan', 'vegetarian'],
            omnivore: ['vegan', 'vegetarian', 'omnivore'],
        };
        const recipes = await this.prismaService.recipe.findMany({
            where: {
                // OR: [
                //     ...allowedFormsOfDiet[preferences.formOfDiet].map((item: any) => {
                //         return {
                //             formOfDiet: item,
                //         };
                //     }),
                // ],
                ingredients: {
                    every: {
                        ingredient: {
                            id: {
                                notIn: dislikedIngredients,
                            },
                        },
                    },
                },
            },
            select: {
                id: true,
            },
        });
        console.log({ recipes });

        return recipes;
    }
}
