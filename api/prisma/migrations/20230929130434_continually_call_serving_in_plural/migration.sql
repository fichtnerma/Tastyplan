/*
  Warnings:

  - You are about to drop the column `serving` on the `Preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "serving",
ADD COLUMN     "servings" INTEGER;
