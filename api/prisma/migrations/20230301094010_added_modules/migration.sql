-- DropForeignKey
ALTER TABLE "IngredientWithAmount" DROP CONSTRAINT "IngredientWithAmount_recipeId_fkey";

-- AlterTable
ALTER TABLE "IngredientWithAmount" ALTER COLUMN "amount" SET DATA TYPE TEXT,
ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "IngredientWithAmount" ADD CONSTRAINT "IngredientWithAmount_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
