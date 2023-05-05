-- DropForeignKey
ALTER TABLE "ShoppingListEntry" DROP CONSTRAINT "ShoppingListEntry_ingredientId_fkey";

-- AddForeignKey
ALTER TABLE "ShoppingListEntry" ADD CONSTRAINT "ShoppingListEntry_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
