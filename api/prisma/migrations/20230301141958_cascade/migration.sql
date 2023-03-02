-- DropForeignKey
ALTER TABLE "IngredientWithAmount" DROP CONSTRAINT "IngredientWithAmount_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientWithAmount" DROP CONSTRAINT "IngredientWithAmount_recipeId_fkey";

-- AddForeignKey
ALTER TABLE "IngredientWithAmount" ADD CONSTRAINT "IngredientWithAmount_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientWithAmount" ADD CONSTRAINT "IngredientWithAmount_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
