/*
  Warnings:

  - You are about to drop the column `client_fone` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `client_name` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Work_schedule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_off` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `clientFone` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Work_schedule" DROP CONSTRAINT "Work_schedule_barberId_fkey";

-- DropForeignKey
ALTER TABLE "time_off" DROP CONSTRAINT "time_off_barberId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "client_fone",
DROP COLUMN "client_name",
ADD COLUMN     "clientFone" TEXT NOT NULL,
ADD COLUMN     "clientName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Work_schedule";

-- DropTable
DROP TABLE "time_off";

-- CreateTable
CREATE TABLE "WorkSchedule" (
    "id" SERIAL NOT NULL,
    "barberId" INTEGER NOT NULL,
    "dayOfWeek" "days" NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,

    CONSTRAINT "WorkSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeOff" (
    "id" SERIAL NOT NULL,
    "barberId" INTEGER NOT NULL,
    "dayOfWeek" "days" NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,

    CONSTRAINT "TimeOff_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkSchedule" ADD CONSTRAINT "WorkSchedule_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeOff" ADD CONSTRAINT "TimeOff_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
