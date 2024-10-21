/*
  Warnings:

  - You are about to drop the column `clientId` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fone` to the `Barber` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('Admin', 'Barber', 'Dev', 'Owner');

-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "clientId";

-- AlterTable
ALTER TABLE "Barber" ADD COLUMN     "Role" "role" NOT NULL DEFAULT 'Barber',
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fone" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";
