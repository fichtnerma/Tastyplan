import { CategorizedShoppingListMap, IngredientMap } from 'src/types/types';
import { SummurizedIngredient } from './shopping-list.interface';
import { ShoppingListQueries } from './shopping-list-queries';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { RecipesService } from 'src/recipes/recipes.service';
import { ShoppingListEntry } from '@prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ShoppingListService {
    constructor(private recipesService: RecipesService, private shoppingListQueries: ShoppingListQueries) {}

    async create(recipeIds: number[], userId: string) {
        const recipeIngredients = await Promise.all(
            recipeIds.map(async (id) => {
                const recipe = await this.recipesService.findById(id);
                return recipe.ingredients;
            }),
        );

        const flattenedIngredients = recipeIngredients.flat();

        //Add up the amounts
        const ingredientMap: IngredientMap = {};
        flattenedIngredients.forEach((ingredient) => {
            if (ingredient.ingredient.id in ingredientMap) {
                ingredientMap[ingredient.ingredient.id].quantity += ingredient.quantity;
            } else {
                ingredientMap[ingredient.ingredient.id] = { ...ingredient };
            }
        });
        const summurizedIngredients = Object.values(ingredientMap);

        //Deletes existing shoppingList to make sure there is only one per user
        try {
            const existingShoppingList = await this.queryExistingShoppingList(userId);
            if (existingShoppingList) {
                await this.shoppingListQueries.deleteManyShoppingListEntries(existingShoppingList.id);
                await this.shoppingListQueries.deleteShoppingList(existingShoppingList.id);
            }
        } catch (error) {
            throw new InternalServerErrorException(
                'Error: Failed to cleanup/delete existing shoppinglist for given user',
            );
        }
        try {
            const summurizedIngredientsObject = summurizedIngredients.map((entry): SummurizedIngredient => {
                return {
                    ingredientId: entry.ingredient.id,
                    ingredientName: entry.ingredient.name,
                    unit: entry.unit,
                    quantity: entry.quantity,
                    isChecked: false,
                    category: entry.ingredient.categories,
                };
            });
            await this.shoppingListQueries.createShoppingList(userId, summurizedIngredientsObject);
        } catch (erro) {
            throw new InternalServerErrorException('Error: Failed to create new shoppinglist');
        }
    }

    async findShoppingList(userId: string) {
        try {
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to find specific shoppinglist');
        }
        const shoppingList = await this.queryExistingShoppingList(userId);

        //Transfom fetched shoppingList into a categorized version
        const categorizedShoppingListMap: CategorizedShoppingListMap = {};
        shoppingList.shoppingListEntries.forEach((item: ShoppingListEntry) => {
            const { category, ...rest } = item;
            if (item?.category in categorizedShoppingListMap) {
                categorizedShoppingListMap[category].push(rest);
            } else {
                categorizedShoppingListMap[category] = [rest];
            }
        });
        return categorizedShoppingListMap;
    }

    async updateShoppingListEntry(entryId: number, shoppingListEntryInput: UpdateShoppingListDto) {
        try {
            return await this.shoppingListQueries.updateShoppingListEntry(entryId, shoppingListEntryInput.isChecked);
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to update shoppinglist entry');
        }
    }

    async queryExistingShoppingList(userId: string) {
        return await this.shoppingListQueries.findFirstShoppingList(userId);
    }
}
