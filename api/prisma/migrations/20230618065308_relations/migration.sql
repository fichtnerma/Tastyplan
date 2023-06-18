-- DropForeignKey
ALTER TABLE "WeekplanEntry" DROP CONSTRAINT "WeekplanEntry_recipeId_fkey";

-- AlterTable
ALTER TABLE "WeekplanEntry" ALTER COLUMN "recipeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WeekplanEntry" ADD CONSTRAINT "WeekplanEntry_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;
