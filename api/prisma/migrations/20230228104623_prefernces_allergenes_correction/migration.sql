/*
  Warnings:

  - You are about to drop the column `allergics` on the `Preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "allergics",
ADD COLUMN     "allergenes" TEXT[];
