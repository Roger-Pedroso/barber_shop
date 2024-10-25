/*
  Warnings:

  - You are about to drop the `WorkSchedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "WorkSchedule" DROP CONSTRAINT "WorkSchedule_barberId_fkey";

-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "schedule" JSONB NOT NULL DEFAULT '{}'::jsonb;

-- DropTable
DROP TABLE "WorkSchedule";
