import { Injectable } from '@nestjs/common';
import { ShoppingListEntry, User, ShoppingList } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RecipesService } from 'src/recipes/recipes.service';
import { IngredientMap } from 'src/types/types';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';

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

        const ingredientMap: IngredientMap = {}
        flattenedIngredients.forEach(ingredient => {
            if (ingredient.id in ingredientMap) {
                ingredientMap[ingredient.id].quantity += ingredient.quantity
            }
            else {
                ingredientMap[ingredient.id] = { ...ingredient }
            }
        })
        const summurizedIngredients = Object.values(ingredientMap)
        console.log("Summarized: ", summurizedIngredients)

        //Deletes existing shoppingList to make sure there is only one per user
        const existingShoppingList = await this.queryExistingShoppingList(user.userId)
        if (existingShoppingList[0]) {
            await this.prismaService.shoppingListEntry.deleteMany({
                where: { shoppingListId: existingShoppingList[0].id }
            })
            await this.prismaService.shoppingList.delete({
                where: { id: existingShoppingList[0].id }
            })
        }

        await this.prismaService.shoppingList.create({
            data: {
                userId: user.userId,
                shoppingListEntries: {
                    createMany: {
                        data: summurizedIngredients.map((entry) => ({
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

    async findShoppingList(userId: string) {
        const shoppingList = await this.queryExistingShoppingList(userId)
        const shoppingListEntriesFormatted = shoppingList[0].shoppingListEntries.map((entry) => {
            return {
                ingredientId: entry.ingredientId,
                ingredientName: entry.ingredientName,
                unit: entry.unit,
                quantity: entry.quantity,
                isChecked: entry.isChecked
            }
        })
        return shoppingListEntriesFormatted;
    }

    upadteShoppingListEntry(userId: string, shoppingListEntry: UpdateShoppingListDto) {

    }

    async queryExistingShoppingList(userId: string) {
        const lists = await this.prismaService.shoppingList.findMany({
            where: {
                userId: userId
            },
            include: { shoppingListEntries: true }
        })
        return lists;
    }
}
