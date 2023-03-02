-- DropForeignKey
ALTER TABLE "WeekplanEntry" DROP CONSTRAINT "WeekplanEntry_weekplanId_fkey";

-- AddForeignKey
ALTER TABLE "WeekplanEntry" ADD CONSTRAINT "WeekplanEntry_weekplanId_fkey" FOREIGN KEY ("weekplanId") REFERENCES "Weekplan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
