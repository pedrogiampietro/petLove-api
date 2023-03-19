/*
  Warnings:

  - You are about to drop the column `price` on the `JobOffer` table. All the data in the column will be lost.
  - Changed the type of `offerType` on the `JobOffer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OfferType" AS ENUM ('WALKING', 'BOARDING');

-- AlterTable
ALTER TABLE "JobOffer" DROP COLUMN "price",
ADD COLUMN     "pricePerDay" DOUBLE PRECISION,
ADD COLUMN     "pricePerHour" DOUBLE PRECISION,
DROP COLUMN "offerType",
ADD COLUMN     "offerType" "OfferType" NOT NULL;
