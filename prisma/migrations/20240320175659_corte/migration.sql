/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `subjects` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subjects_nombre_key" ON "subjects"("nombre");
