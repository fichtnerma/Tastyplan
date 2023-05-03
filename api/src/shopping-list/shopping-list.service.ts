import { Injectable } from '@nestjs/common';
import { ShoppingListEntry, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipesService } from 'src/recipes/recipes.service';

@Injectable()
export class ShoppingListService {
    constructor(
        private recipesService: RecipesService,
        private prismaService: PrismaService
    ) { }

    async create(recipeIds: number[], user: User) {
        const recipeIngredients = await Promise.all(recipeIds.map(async id => {
            const recipe = await this.recipesService.findById(id)

            return recipe.ingredients
        }))
        const flattenedIngredients = recipeIngredients.flat()

        const ingredientMap: any = {}

        flattenedIngredients.forEach(ingredient => {
            if (ingredient.id in ingredientMap) {
                ingredientMap[ingredient.id].quantity += ingredient.quantity

            }
            else {
                ingredientMap[ingredient.id] = { ...ingredient }
            }
        })

        const summurizedIngredients = Object.values(ingredientMap)

        const shoppingList = await this.prismaService.shoppingList.create({
            data: {
                userId: user.userId,
                shoppingListEntries: {
                    createMany: {
                        data: summurizedIngredients.map((entry: ShoppingListEntry) => ({
                            ingredientId: entry.id,
                            ingredientName: entry.ingredient.name,
                            unit: entry.unit,
                            quantity: entry.quantity,
                            isChecked: false
                        }))
                    }
                }
            }
        })
    }
}
