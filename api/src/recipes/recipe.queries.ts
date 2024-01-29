import { CreateRecipeInput, ExtendetRecipe } from './recipe.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeQueries {
    constructor(private prismaService: PrismaService) {}
    async findUniqueRecipe(id: number) {
        return await this.prismaService.recipe.findUnique({
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
    }

    async findOwnRecipes(userId: string) {
        return this.prismaService.recipe.findMany({
            where: {
                userId: userId,
            },
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
    }
    async findManyRecipes() {
        return await this.prismaService.recipe.findMany({
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
    }
    async upsertRecipe(recipe: ExtendetRecipe, recipeId: number) {
        await this.prismaService.recipe.upsert({
            where: { id: recipeId },
            update: {},
            create: {
                ...recipe,
                ingredients: {
                    createMany: {
                        data: [...recipe.ingredients],
                    },
                },
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
    async findManyRecipesWithId(recipeIds: number[]) {
        return await this.prismaService.recipe.findMany({
            where: {
                id: { in: recipeIds },
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
    }
    async createRecipe(recipe: CreateRecipeInput) {
        console.log('createRecipe', recipe);
        if (recipe.userId) {
            const recipeData = {
                name: recipe.name,
                img: recipe.img || undefined,
                totalTime: recipe.totalTime || undefined,
                servings: recipe.servings,
                tags: recipe.tags || undefined,
                formOfDiet: recipe.formOfDiet,
                ingredients: {
                    createMany: {
                        data: recipe.ingredients || [],
                    },
                },
                steps: {
                    createMany: {
                        data: recipe.steps || [],
                    },
                },
                userId: recipe.userId || undefined,
            };
            return await this.prismaService.recipe.create({
                data: recipeData,
            });
        }
    }
}
