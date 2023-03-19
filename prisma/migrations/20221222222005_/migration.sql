-- CreateTable
CREATE TABLE "HistoryMaintenance" (
    "id" TEXT NOT NULL,
    "clearHardware" BOOLEAN NOT NULL DEFAULT false,
    "analysisInstalledSoftware" BOOLEAN NOT NULL DEFAULT false,
    "softwareUpdate" BOOLEAN NOT NULL DEFAULT false,
    "temporaryCleaning" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "maintenanceId" TEXT NOT NULL,

    CONSTRAINT "HistoryMaintenance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HistoryMaintenance" ADD CONSTRAINT "HistoryMaintenance_maintenanceId_fkey" FOREIGN KEY ("maintenanceId") REFERENCES "Maintenance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
