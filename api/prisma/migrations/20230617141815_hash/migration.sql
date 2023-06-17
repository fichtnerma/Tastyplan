-- CreateTable
CREATE TABLE "DataSchema" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "ingredientHash" TEXT,
    "recipeHash" TEXT,

    CONSTRAINT "DataSchema_pkey" PRIMARY KEY ("id")
);
