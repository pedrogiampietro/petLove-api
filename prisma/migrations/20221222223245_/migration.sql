/*
  Warnings:

  - You are about to drop the column `analysisInstalledSoftware` on the `HistoryMaintenance` table. All the data in the column will be lost.
  - You are about to drop the column `clearHardware` on the `HistoryMaintenance` table. All the data in the column will be lost.
  - You are about to drop the column `softwareUpdate` on the `HistoryMaintenance` table. All the data in the column will be lost.
  - You are about to drop the column `temporaryCleaning` on the `HistoryMaintenance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "HistoryMaintenance" DROP COLUMN "analysisInstalledSoftware",
DROP COLUMN "clearHardware",
DROP COLUMN "softwareUpdate",
DROP COLUMN "temporaryCleaning",
ADD COLUMN     "maintenanceListTodoo" JSONB;
