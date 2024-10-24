/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `WorkSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `endHour` on the `WorkSchedule` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `WorkSchedule` table. All the data in the column will be lost.
  - Added the required column `schedule` to the `WorkSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkSchedule" DROP COLUMN "dayOfWeek",
DROP COLUMN "endHour",
DROP COLUMN "startHour",
ADD COLUMN     "schedule" JSONB NOT NULL;
