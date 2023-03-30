/*
  Warnings:

  - You are about to drop the column `difficulty` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `kitchenware` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `servings` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "IngredientWithAmount" ADD COLUMN     "quantity" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "difficulty",
DROP COLUMN "kitchenware",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "servings" INTEGER NOT NULL,
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "totalTime" INTEGER NOT NULL;
