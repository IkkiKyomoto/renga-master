/*
  Warnings:

  - Added the required column `completed` to the `Hokku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hokku" ADD COLUMN     "completed" BOOLEAN NOT NULL;
