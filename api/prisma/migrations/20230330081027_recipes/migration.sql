/*
  Warnings:

  - You are about to drop the column `amount` on the `IngredientWithAmount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "IngredientWithAmount" DROP COLUMN "amount",
ADD COLUMN     "unit" TEXT;
