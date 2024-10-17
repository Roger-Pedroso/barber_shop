/*
  Warnings:

  - Added the required column `address` to the `BarberShop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fone` to the `BarberShop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BarberShop" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "fone" TEXT NOT NULL;
