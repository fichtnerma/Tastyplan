/*
  Warnings:

  - You are about to drop the column `foodDislikes` on the `Preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "foodDislikes";

-- CreateTable
CREATE TABLE "_IngredientToPreferences" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToPreferences_AB_unique" ON "_IngredientToPreferences"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToPreferences_B_index" ON "_IngredientToPreferences"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToPreferences" ADD CONSTRAINT "_IngredientToPreferences_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToPreferences" ADD CONSTRAINT "_IngredientToPreferences_B_fkey" FOREIGN KEY ("B") REFERENCES "Preferences"("id") ON DELETE CASCADE ON UPDATE CASCADE;
