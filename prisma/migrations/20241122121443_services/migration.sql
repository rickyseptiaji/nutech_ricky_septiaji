-- CreateTable
CREATE TABLE `Services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_code` VARCHAR(191) NOT NULL,
    `service_name` VARCHAR(191) NOT NULL,
    `service_icon` VARCHAR(191) NOT NULL,
    `service_tarif` INTEGER NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
