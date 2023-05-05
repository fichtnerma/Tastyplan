import { PrismaService } from 'src/prisma/prisma.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { Ingredient, User } from '@prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class RecipesService {
    constructor(private prismaService: PrismaService, private preferencesService: PreferencesService) {}

    async findById(id: number) {
        try {
            const recipe = await this.prismaService.recipe.findUnique({
                where: {
                    id: id,
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    img: true,
                    formOfDiet: true,
                    preparingTime: true,
                    cookingTime: true,
                    totalTime: true,
                    ingredients: {
                        select: {
                            id: true,
                            quantity: true,
                            unit: true,
                            ingredient: {
                                select: {
                                    name: true,
                                    id: true,
                                },
                            },
                        },
                    },
                    steps: {
                        select: {
                            stepCount: true,
                            description: true,
                        },
                    },
                },
            });

            return recipe;
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to find recipe by id');
        }
    }

    async filterByPreferences(user: User) {
        const possibleDietsMap = new Map([
            ['vegan', ['vegan']],
            ['vegetarian', ['vegan', 'vegetarian']],
            ['pescetarian', ['vegan', 'vegetarian', 'pescetarian']],
            ['flexitarian', ['vegan', 'vegetarian', 'pescetarian', 'omnivore']],
            ['omnivore', ['vegan', 'vegetarian', 'pescetarian', 'omnivore']],
        ]);
        const preferences = await this.preferencesService.getPreferences(user);
        const { formOfDiet, allergens } = preferences;
        const dislikedIngredients = preferences.foodDislikes.map((item: Ingredient) => item.id);

        try {
            const recipes = await this.prismaService.recipe.findMany({
                where: {
                    formOfDiet: {
                        in: possibleDietsMap.get(formOfDiet),
                    },
                    ingredients: {
                        every: {
                            ingredient: {
                                id: {
                                    notIn: dislikedIngredients,
                                },
                                NOT: {
                                    allergens: {
                                        hasSome: allergens,
                                    },
                                },
                            },
                        },
                    },
                },
                select: {
                    id: true,
                },
            });

            return recipes;
        } catch (error) {
            throw new InternalServerErrorException('Error: Filter recipes by preferences failed');
        }
    }
}
