import { CategorizedShoppingListMap, IngredientMap } from 'src/types/types';
import { UpdateShoppingListDto } from './dto/update-shopping-list.dto';
import { RecipesService } from 'src/recipes/recipes.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ShoppingListService {
    constructor(private recipesService: RecipesService, private prismaService: PrismaService) {}

    async create(recipeIds: number[], user: User) {
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
            const existingShoppingList = await this.queryExistingShoppingList(user.userId);

            if (existingShoppingList) {
                await this.prismaService.shoppingListEntry.deleteMany({
                    where: { shoppingListId: existingShoppingList.id },
                });
                await this.prismaService.shoppingList.delete({
                    where: { id: existingShoppingList.id },
                });
            }
        } catch (error) {
            throw new InternalServerErrorException(
                'Error: Failed to cleanup/delete existing shoppinglist for given user',
            );
        }

        try {
            await this.prismaService.shoppingList.create({
                data: {
                    userId: user.userId,
                    shoppingListEntries: {
                        create: summurizedIngredients.map((entry) => {
                            return {
                                ingredientId: entry.ingredient.id,
                                ingredientName: entry.ingredient.name,
                                unit: entry.unit,
                                quantity: entry.quantity,
                                isChecked: false,
                                category: entry.ingredient.categories,
                            };
                        }),
                    },
                },
            });
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
        shoppingList.shoppingListEntries.forEach((item) => {
            const { category, ...rest } = item;
            if (item.category in categorizedShoppingListMap) {
                categorizedShoppingListMap[category].push(rest);
            } else {
                categorizedShoppingListMap[category] = [rest];
            }
        });
        return categorizedShoppingListMap;
    }

    async upadteShoppingListEntry(entryId: number, shoppingListEntryInput: UpdateShoppingListDto) {
        try {
            const shoppingListEntry = await this.prismaService.shoppingListEntry.update({
                where: {
                    id: entryId,
                },
                data: {
                    isChecked: shoppingListEntryInput.isChecked,
                },
            });
            return shoppingListEntry;
        } catch (error) {
            throw new InternalServerErrorException('Error: Failed to update shoppinglist entry');
        }
    }

    async queryExistingShoppingList(userId: string) {
        const list = await this.prismaService.shoppingList.findFirst({
            where: {
                userId: userId,
            },
            include: { shoppingListEntries: true },
        });
        return list;
    }
}
