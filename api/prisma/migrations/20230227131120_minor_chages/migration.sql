/*
  Warnings:

  - You are about to drop the column `name` on the `Step` table. All the data in the column will be lost.
  - Added the required column `categories` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategories` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookingTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparimgTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Step` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stepCount` to the `Step` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "categories" TEXT NOT NULL,
ADD COLUMN     "subcategories" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "cookingTime" INTEGER NOT NULL,
ADD COLUMN     "preparimgTime" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Step" DROP COLUMN "name",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "stepCount" INTEGER NOT NULL;
