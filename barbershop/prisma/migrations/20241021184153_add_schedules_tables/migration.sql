-- CreateEnum
CREATE TYPE "days" AS ENUM ('Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo');

-- CreateTable
CREATE TABLE "Work_schedule" (
    "id" SERIAL NOT NULL,
    "barberId" INTEGER NOT NULL,
    "day_of_week" "days" NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Work_schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_off" (
    "id" SERIAL NOT NULL,
    "barberId" INTEGER NOT NULL,
    "day_of_week" "days" NOT NULL,
    "start_hour" TIMESTAMP(3) NOT NULL,
    "end_hour" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_off_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Work_schedule" ADD CONSTRAINT "Work_schedule_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_barberId_fkey" FOREIGN KEY ("barberId") REFERENCES "Barber"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
