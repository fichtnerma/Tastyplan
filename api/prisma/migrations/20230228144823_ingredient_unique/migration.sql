/*
  Warnings:

  - A unique constraint covering the columns `[name,categories,subcategories]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_categories_subcategories_key" ON "Ingredient"("name", "categories", "subcategories");
