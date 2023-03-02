/*
  Warnings:

  - You are about to drop the column `foodType` on the `Preferences` table. All the data in the column will be lost.
  - Added the required column `formOfDiet` to the `Preferences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "foodType",
ADD COLUMN     "formOfDiet" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Weekplan" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weekplan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeekplanEntry" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "weekplanId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "WeekplanEntry_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeekplanEntry" ADD CONSTRAINT "WeekplanEntry_weekplanId_fkey" FOREIGN KEY ("weekplanId") REFERENCES "Weekplan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeekplanEntry" ADD CONSTRAINT "WeekplanEntry_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
