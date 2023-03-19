/*
  Warnings:

  - Changed the type of `startDate` on the `Availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endDate` on the `Availability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "startDate",
ADD COLUMN     "startDate" JSONB NOT NULL,
DROP COLUMN "endDate",
ADD COLUMN     "endDate" JSONB NOT NULL;
