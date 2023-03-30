import { Injectable } from '@nestjs/common';
import { Preferences, User } from '@prisma/client';
import { PreferencesService } from 'src/preferences/preferences.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
@Injectable()
export class RecipesService {
    constructor(private prismaService: PrismaService, private preferencesService: PreferencesService) { }

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
            description: recipe.description,
            img: recipe.img,
            formOfDiet: recipe.formOfDiet,
            preparingTime: recipe.preparingTime,
            cookingTime: recipe.cookingTime,
            totalTime: recipe.totalTime,
            ingredients: recipe.ingredients.map((item) => {
                return {
                    quantity: item?.quantity,
                    unit: item?.unit,
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

        const formOfDiet = preferences.formOfDiet;
        const allergenes = preferences.allergenes;
        const formOfDiets = [];

        switch (formOfDiet) {
            case 'omnivore':
                formOfDiets.push('vegan', 'vegetarian', 'omnivore')
                break;
            case 'flexeterian':
                formOfDiets.push('vegan', 'vegetarian', 'omnivore')
                break;
            case 'pescetarian':
                formOfDiets.push('vegan', 'vegetarian')
                break;
            case 'vegetarian':
                formOfDiets.push('vegan', 'vegetarian')
                break;
            case 'vegan':
                formOfDiets.push('vegan')
                break;
        }

        const dislikedIngredients = preferences.foodDislikes.map((item: any) => item.id);

        const recipes = await this.prismaService.recipe.findMany({
            where: {
                AND: [{
                    formOfDiet: {
                        in: formOfDiets
                    }
                },
                {
                    ingredients: {
                        every: {
                            ingredient: {
                                id: {
                                    notIn: dislikedIngredients,
                                },
                                allergenes: {
                                    notIn: allergenes
                                }
                            },
                        },
                    },
                }]

            },
            select: {
                id: true,
            },
        });
        console.log({ recipes });

        return recipes;
    }
}
