/*
  Warnings:

  - You are about to drop the `_IngredientToRecipe` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `difficulty` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_A_fkey";

-- DropForeignKey
ALTER TABLE "_IngredientToRecipe" DROP CONSTRAINT "_IngredientToRecipe_B_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "difficulty" TEXT NOT NULL,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "kitchenware" TEXT[],
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "cookingTime" DROP NOT NULL;

-- DropTable
DROP TABLE "_IngredientToRecipe";

-- CreateTable
CREATE TABLE "IngredientWithAmount" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "IngredientWithAmount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IngredientWithAmount" ADD CONSTRAINT "IngredientWithAmount_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientWithAmount" ADD CONSTRAINT "IngredientWithAmount_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
