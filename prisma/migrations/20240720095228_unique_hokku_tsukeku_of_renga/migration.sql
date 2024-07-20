/*
  Warnings:

  - You are about to drop the column `description` on the `Renga` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hokkuId]` on the table `Renga` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tsukekuId]` on the table `Renga` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Renga" DROP COLUMN "description";

-- CreateIndex
CREATE UNIQUE INDEX "Renga_hokkuId_key" ON "Renga"("hokkuId");

-- CreateIndex
CREATE UNIQUE INDEX "Renga_tsukekuId_key" ON "Renga"("tsukekuId");
