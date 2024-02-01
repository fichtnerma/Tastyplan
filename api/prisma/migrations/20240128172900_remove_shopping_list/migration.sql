/*
  Warnings:

  - You are about to drop the `ShoppingList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ShoppingListEntry` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ShoppingList" DROP CONSTRAINT "ShoppingList_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingListEntry" DROP CONSTRAINT "ShoppingListEntry_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "ShoppingListEntry" DROP CONSTRAINT "ShoppingListEntry_shoppingListId_fkey";

-- DropTable
DROP TABLE "ShoppingList";

-- DropTable
DROP TABLE "ShoppingListEntry";
