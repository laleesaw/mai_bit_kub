-- RenameIndex
ALTER TABLE `notification` RENAME INDEX `notification_group_id_idx` TO `Notification_group_id_fkey`;

-- RenameIndex
ALTER TABLE `notification` RENAME INDEX `notification_user_id_idx` TO `Notification_user_id_fkey`;
