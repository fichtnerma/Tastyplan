import { SummurizedIngredient } from './shopping-list.interface';
import { PrismaService } from 'src/prisma/prisma.service';

export class ShoppingListQueries {
    constructor(private prismaService: PrismaService) {}
    async deleteManyShoppingListEntries(existingShoppingListId: number) {
        await this.prismaService.shoppingListEntry.deleteMany({
            where: { shoppingListId: existingShoppingListId },
        });
    }
    async deleteShoppingList(existingShoppingListId: number) {
        await this.prismaService.shoppingList.delete({
            where: { id: existingShoppingListId },
        });
    }
    async createShoppingList(userId: string, summurizedIngredients: SummurizedIngredient[]) {
        await this.prismaService.shoppingList.create({
            data: {
                userId: userId,
                shoppingListEntries: {
                    create: { ...summurizedIngredients },
                },
            },
        });
    }
    async updateShoppingListEntry(entryId: number, isShoppingListEntryChecked: boolean) {
        return await this.prismaService.shoppingListEntry.update({
            where: {
                id: entryId,
            },
            data: {
                isChecked: isShoppingListEntryChecked,
            },
        });
    }
    async findFirstShoppingList(userId: string) {
        return await this.prismaService.shoppingList.findFirst({
            where: {
                userId: userId,
            },
            include: { shoppingListEntries: true },
        });
    }
}
