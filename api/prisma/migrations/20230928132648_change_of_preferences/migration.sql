/*
  Warnings:

  - The `days` column on the `Preferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `meals` column on the `Preferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "days",
ADD COLUMN     "days" INTEGER[],
DROP COLUMN "meals",
ADD COLUMN     "meals" INTEGER[];
