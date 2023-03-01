-- CreateTable
CREATE TABLE "Weekplan" (
    "id" SERIAL NOT NULL,
    "startDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" DATE NOT NULL DEFAULT DATEADD(day,7, GETDATE()),

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
