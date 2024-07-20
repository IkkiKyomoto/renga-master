/*
  Warnings:

  - A unique constraint covering the columns `[userId,rengaId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Like_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_rengaId_key" ON "Like"("userId", "rengaId");
