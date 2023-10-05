/*
  Warnings:

  - You are about to drop the column `meals` on the `Preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "meals",
ADD COLUMN     "wantsDinner" BOOLEAN,
ADD COLUMN     "wantsLunch" BOOLEAN;
