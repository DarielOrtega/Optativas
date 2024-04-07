-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes');

-- CreateEnum
CREATE TYPE "Shift" AS ENUM ('Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto');

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "shift" "Shift" NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subjects" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "boss" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_id_key" ON "subjects"("id");
