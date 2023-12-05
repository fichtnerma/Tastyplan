import { ExtendetRecipe } from './recipe.interface';
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
    async upsertRecipe(recipe: ExtendetRecipe) {
        return await this.prismaService.recipe.upsert({
            where: { id: recipe.id },
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
}
