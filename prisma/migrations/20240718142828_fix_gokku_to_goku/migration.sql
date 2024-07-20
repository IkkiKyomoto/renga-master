/*
  Warnings:

  - You are about to drop the column `gokku` on the `Tsukeku` table. All the data in the column will be lost.
  - Added the required column `goku` to the `Tsukeku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tsukeku" DROP COLUMN "gokku",
ADD COLUMN     "goku" TEXT NOT NULL;
