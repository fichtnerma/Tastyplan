import { PrismaService } from 'src/prisma/prisma.service';
import { Ingredient } from '@prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

export type Preferences = {
    formOfDiet: string;
    allergens: string[];
    servings: number;
    days: string[];
    wantsLunch: boolean;
    wantsDinner: boolean;
    foodDislikes: {
        id: number;
        name: string;
    }[];
};

const POSSIBLE_DIETS = new Map([
    ['vegan', ['vegan']],
    ['vegetarian', ['vegan', 'vegetarian']],
    ['pescetarian', ['vegan', 'vegetarian', 'pescetarian']],
    ['flexitarian', ['vegan', 'vegetarian', 'pescetarian', 'omnivore']],
    ['omnivore', ['vegan', 'vegetarian', 'pescetarian', 'omnivore']],
]);

@Injectable()
export class RecipesFilterService {
    constructor(private prismaService: PrismaService) {}

    async filterByQuery(filterQuery: Preferences, recipeIds?: number[]) {
        const { formOfDiet, allergens, days, wantsDinner, wantsLunch } = filterQuery;
        const dislikedIngredients = filterQuery.foodDislikes.map((item: Ingredient) => item.id);
        try {
            const recipes = await this.prismaService.recipe.findMany({
                where: {
                    ...(recipeIds
                        ? {
                              id: {
                                  in: recipeIds,
                              },
                          }
                        : null),
                    formOfDiet: {
                        in: POSSIBLE_DIETS.get(formOfDiet),
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
                    userId: null,
                },
                select: {
                    id: true,
                },
            });

            return { recipes: recipes, days: days, wantsDinner: wantsDinner, wantsLunch: wantsLunch };
        } catch (error) {
            throw new InternalServerErrorException('Error: Filter recipes by preferences failed');
        }
    }
}
