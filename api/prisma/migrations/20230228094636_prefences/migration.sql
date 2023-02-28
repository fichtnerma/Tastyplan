-- CreateTable
CREATE TABLE "Preferences" (
    "id" SERIAL NOT NULL,
    "foodType" TEXT NOT NULL,
    "allergics" TEXT[],
    "foodDislikes" INTEGER[],

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);
