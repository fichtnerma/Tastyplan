/*
  Warnings:

  - You are about to drop the column `recipeId` on the `WeekplanEntry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "WeekplanEntry" DROP CONSTRAINT "WeekplanEntry_recipeId_fkey";

-- AlterTable
ALTER TABLE "Weekplan" ADD COLUMN     "hasDinner" BOOLEAN,
ADD COLUMN     "hasLunch" BOOLEAN;

-- AlterTable
ALTER TABLE "WeekplanEntry" DROP COLUMN "recipeId",
ADD COLUMN     "dinnerId" INTEGER,
ADD COLUMN     "lunchId" INTEGER;

-- AddForeignKey
ALTER TABLE "WeekplanEntry" ADD CONSTRAINT "WeekplanEntry_lunchId_fkey" FOREIGN KEY ("lunchId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekplanEntry" ADD CONSTRAINT "WeekplanEntry_dinnerId_fkey" FOREIGN KEY ("dinnerId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
