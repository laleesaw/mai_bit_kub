/*
  Warnings:

  - A unique constraint covering the columns `[join_code]` on the table `group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `group` ADD COLUMN `join_code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `profile_image` LONGTEXT NULL;

-- CreateTable
CREATE TABLE `notification` (
    `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `is_read` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `notification_user_id_idx`(`user_id`),
    INDEX `notification_group_id_idx`(`group_id`),
    PRIMARY KEY (`notification_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `group_join_code_key` ON `group`(`join_code`);

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `Notification_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notification` ADD CONSTRAINT `Notification_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `group`(`group_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
