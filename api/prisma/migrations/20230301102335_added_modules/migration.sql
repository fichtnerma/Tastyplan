-- DropForeignKey
ALTER TABLE "IngredientWithAmount" DROP CONSTRAINT "IngredientWithAmount_ingredientId_fkey";

-- AlterTable
ALTER TABLE "IngredientWithAmount" ALTER COLUMN "ingredientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IngredientWithAmount" ADD CONSTRAINT "IngredientWithAmount_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE SET NULL ON UPDATE CASCADE;
