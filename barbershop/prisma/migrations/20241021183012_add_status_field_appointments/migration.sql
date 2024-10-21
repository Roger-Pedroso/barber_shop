/*
  Warnings:

  - Added the required column `client_fone` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_name` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "appointmentStatus" AS ENUM ('Finalizado', 'Agendado', 'Cancelado');

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "client_fone" TEXT NOT NULL,
ADD COLUMN     "client_name" TEXT NOT NULL,
ADD COLUMN     "status" "appointmentStatus" NOT NULL DEFAULT 'Agendado';
