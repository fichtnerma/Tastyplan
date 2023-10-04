import { PrismaService } from 'src/prisma/prisma.service';
import { PreferencesService } from 'src/preferences/preferences.service';
import { convertToTime, shuffleArray } from 'src/helpers/converter.utils';
import { Cache } from 'cache-manager';
import { Ingredient, Recipe, Step, User } from '@prisma/client';
import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RecipesService {
    constructor(
        @Inject(CACHE_MANAGER) private readonly cache: Cache,
        private prismaService: PrismaService,
        private preferencesService: PreferencesService,
    ) {}

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
                                    categories: true,
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

    async storeInRedis() {
        const recipes = await this.prismaService.recipe.findMany({
            include: {
                steps: true,
                ingredients: {
                    include: {
                        ingredient: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
        const recipesFormatted = recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients.map((ingredient) => ({ ...ingredient, name: ingredient.ingredient.name })),
        }));
        await this.cache.set('recipes', recipesFormatted, 0);
    }

    async filterByPreferences(userId: string) {
        const possibleDietsMap = new Map([
            ['vegan', ['vegan']],
            ['vegetarian', ['vegan', 'vegetarian']],
            ['pescetarian', ['vegan', 'vegetarian', 'pescetarian']],
            ['flexitarian', ['vegan', 'vegetarian', 'pescetarian', 'omnivore']],
            ['omnivore', ['vegan', 'vegetarian', 'pescetarian', 'omnivore']],
        ]);
        const preferences = await this.preferencesService.getPreferences(userId);
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
            console.log('Recipes', recipes);

            return recipes;
        } catch (error) {
            throw new InternalServerErrorException('Error: Filter recipes by preferences failed');
        }
    }

    async createRecipe(
        recipe: Recipe & {
            cookingTime: string;
            totalTime: string;
            prepareTime: string;
            steps: Array<Step>;
            ingredients: Array<{ ingredientId: number }>;
        },
    ) {
        const specialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~'-]/g;
        console.log('Recipe Id', recipe.id);

        await this.prismaService.recipe.upsert({
            where: { id: recipe.id },
            update: {},
            create: {
                id: recipe.id,
                name: recipe.name,
                img: recipe.name.replace(specialCharacter, '') + '.jpg',
                servings: +recipe.servings || 4,
                description: recipe.description,
                cookingTime: convertToTime(recipe.cookingTime) || 0,
                preparingTime: convertToTime(recipe.prepareTime) || 0,
                totalTime: convertToTime(recipe.totalTime) || 0,
                formOfDiet: recipe.formOfDiet || 'omnivore',
                ingredients: {
                    createMany: {
                        data: [...recipe.ingredients],
                    },
                },
                tags: recipe.tags,
                steps: {
                    createMany: {
                        data: recipe.steps.map((step: { stepCount: number; description: string }) => ({
                            stepCount: +step.stepCount,
                            description: step.description,
                        })),
                    },
                },
            },
        });
    }

    async categorizeRecipe(
        ingredients: {
            categories: string;
            subcategories: string;
        }[],
    ) {
        const omnivoreCategories = ['Meat and sausage products', 'Meat and offal'];
        const pescetaraianCategories = ['Fish'];
        const vegetarianCategories = ['Milk and dairy products', 'Eggs'];

        const omnivoreSubCategories = [
            'Boiled sausage products',
            'Raw sausage products',
            'Cooked sausages',
            'Veal,meat and offal',
            'Wild',
            'Poultry',
            'Pork,meat and offal',
            'Lamb, Sheep',
            'Poultry,meat and offal',
            'Beef',
            'Pig',
        ];
        const pescetaraianSubCategories = [
            'Sea fish',
            'Freshwater fish',
            'Freshwater fish,Fish',
            'Seafood, crustaceans and shellfish',
            'Fish products',
        ];
        const vegetarianSubCategories = [
            'Gelling and binding agents',
            'Hard cheese',
            'Cream cheese and curd',
            'Soft cheese',
            'Milk and yoghurt drinks',
            'Milk and yoghurt drinks,Soft drinks',
            'Cream,Milk and dairy products',
            'Milk',
            'Fats,milk and dairy products',
            'Yoghurt and sour milk',
            'Fat',
            'Cream cheese and curd,milk and dairy products',
            'Creams and puddings',
            'Mayonnaises',
            'Soft cheese,Milk and dairy products',
            'Cheese products',
        ];

        const formOfDiet = ingredients.reduce(
            (acc, curr) => {
                if (
                    omnivoreCategories.includes(curr.categories) ||
                    omnivoreSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('pescetarian'), 1);
                    acc.splice(acc.indexOf('vegetarian'), 1);
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                if (
                    pescetaraianCategories.includes(curr.categories) ||
                    pescetaraianSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('vegetarian'), 1);
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                if (
                    vegetarianCategories.includes(curr.categories) ||
                    vegetarianSubCategories.includes(curr.subcategories)
                ) {
                    acc.splice(acc.indexOf('vegan'), 1);
                }
                return acc;
            },
            ['omnivore', 'pescetarian', 'vegetarian', 'vegan'],
        );

        return formOfDiet.at(-1) || 'omnivore';
    }

    async getRecommendations(k: number, user: User) {
        try {
            let fetchedMeals = await this.filterByPreferences(user.userId);

            if (fetchedMeals.length < k) {
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

            const shuffeledMeals = shuffleArray(fetchedMeals);
            const recipeIds = shuffeledMeals.slice(0, k);

            const recipes = await this.prismaService.recipe.findMany({
                where: {
                    id: { in: recipeIds.map((object) => object.id) },
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
                                    categories: true,
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

            return recipes;
        } catch (error) {
            throw new InternalServerErrorException('Error: no k random recipes could be created');
        }
    }
}
