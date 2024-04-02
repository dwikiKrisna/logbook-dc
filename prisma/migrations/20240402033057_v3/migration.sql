/*
  Warnings:

  - Added the required column `paraf` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `logbook` ADD COLUMN `paraf` TEXT NOT NULL;
