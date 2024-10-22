/*
  Warnings:

  - You are about to drop the column `Role` on the `Barber` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Barber" DROP COLUMN "Role",
ADD COLUMN     "role" "role" NOT NULL DEFAULT 'Barber';
