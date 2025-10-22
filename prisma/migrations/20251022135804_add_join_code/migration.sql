/*
  Warnings:

  - A unique constraint covering the columns `[join_code]` on the table `Group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Group` ADD COLUMN `join_code` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Group_join_code_key` ON `Group`(`join_code`);
