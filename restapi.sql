-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table restapi.balance
CREATE TABLE IF NOT EXISTS `balance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `balance` int NOT NULL,
  `userId` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Balance_userId_fkey` (`userId`),
  CONSTRAINT `Balance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table restapi.balance: ~2 rows (approximately)
INSERT INTO `balance` (`id`, `balance`, `userId`, `createAt`) VALUES
	(1, 4620000, 1, '2024-11-23 11:21:58.010'),
	(2, 700000, 2, '2024-11-23 07:03:44.655');

-- Dumping structure for table restapi.banner
CREATE TABLE IF NOT EXISTS `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `banner_image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table restapi.banner: ~5 rows (approximately)
INSERT INTO `banner` (`id`, `banner_name`, `banner_image`, `description`, `createAt`) VALUES
	(1, 'Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-22 19:15:56.336'),
	(2, 'Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-22 19:16:30.041'),
	(3, 'Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-22 19:17:07.918'),
	(4, 'Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-22 19:17:07.918'),
	(5, 'Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet', '2024-11-22 19:17:07.918');

-- Dumping structure for table restapi.services
CREATE TABLE IF NOT EXISTS `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_code` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_icon` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service_tarif` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table restapi.services: ~12 rows (approximately)
INSERT INTO `services` (`id`, `service_code`, `service_name`, `service_icon`, `service_tarif`, `createAt`) VALUES
	(1, 'PAJAK', 'Pajak PBB', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-11-22 19:18:27.078'),
	(2, 'PLN', 'Listrik', 'https://nutech-integrasi.app/dummy.jpg', 10000, '2024-11-22 19:18:27.078'),
	(3, 'PDAM', 'PDAM Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-11-22 19:18:27.078'),
	(4, 'PULSA', 'Pulsa', 'https://nutech-integrasi.app/dummy.jpg', 40000, '2024-11-22 19:18:27.078'),
	(5, 'PGN', 'PGN Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-22 19:18:27.078'),
	(6, 'MUSIK', 'MUSIK Berlangganan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-22 19:18:27.078'),
	(7, 'TV', 'TV Berlanggan', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-22 19:18:27.078'),
	(8, 'PAKET_DATA', 'Paket Data', 'https://nutech-integrasi.app/dummy.jpg', 50000, '2024-11-22 19:18:27.078'),
	(9, 'VOUCHER_GAME', 'Voucher Game', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-11-22 19:18:27.078'),
	(10, 'VOUCHER_MAKANAN', 'Voucher Makan', 'https://nutech-integrasi.app/dummy.jpg', 100000, '2024-11-22 19:18:27.078'),
	(11, 'QURBAN', 'Qurban', 'https://nutech-integrasi.app/dummy.jpg', 200000, '2024-11-22 19:18:27.078'),
	(12, 'ZAKAT', 'Zakat', 'https://nutech-integrasi.app/dummy.jpg', 300000, '2024-11-22 19:18:27.078');

-- Dumping structure for table restapi.transaction
CREATE TABLE IF NOT EXISTS `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transaction_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` int NOT NULL,
  `serviceId` int NOT NULL,
  `userId` int NOT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `Transaction_serviceId_fkey` (`serviceId`),
  KEY `Transaction_userId_fkey` (`userId`),
  CONSTRAINT `Transaction_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table restapi.transaction: ~13 rows (approximately)
INSERT INTO `transaction` (`id`, `invoice_number`, `transaction_type`, `total`, `serviceId`, `userId`, `createAt`) VALUES
	(1, 'INV1732343978730-1', 'PAYMENT', 40000, 4, 1, '2024-11-23 06:39:40.443'),
	(2, 'INV1732344000547-1', 'PAYMENT', 40000, 4, 1, '2024-11-23 06:40:00.556'),
	(3, 'INV1732344023653-1', 'PAYMENT', 40000, 4, 1, '2024-11-23 06:40:23.663'),
	(4, 'INV1732344158795-1', 'PAYMENT', 40000, 4, 1, '2024-11-23 06:42:38.808'),
	(5, 'INV1732344165205-1', 'PAYMENT', 40000, 4, 1, '2024-11-23 06:42:45.216'),
	(6, 'INV1732345498253-2', 'PAYMENT', 300000, 12, 2, '2024-11-23 07:04:58.261'),
	(7, 'INV1732346866666-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:27:46.677'),
	(8, 'INV1732346889461-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:28:09.505'),
	(9, 'INV1732346897256-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:28:17.262'),
	(10, 'INV1732346933084-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:28:53.094'),
	(11, 'INV1732346966433-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:29:26.441'),
	(12, 'INV1732346976244-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:29:36.252'),
	(13, 'INV1732346995152-1', 'PAYMENT', 40000, 1, 1, '2024-11-23 07:29:55.161');

-- Dumping structure for table restapi.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table restapi.user: ~2 rows (approximately)
INSERT INTO `user` (`id`, `email`, `first_name`, `last_name`, `password`, `profile_image`, `createAt`) VALUES
	(1, 'admin@gmail.com', 'User update', 'admin Edited', '$2a$10$xLOOw1WFU3EiJP/Rh/0GeOHFYIM706x54tWg3xH1mGhguMl29wune', 'https://yoururlapi.com/profile.jpeg', '2024-11-22 13:12:05.056'),
	(2, 'admin2@gmail.com', 'admin', 'kedua', '$2a$10$0Me/JGtVxW9ftvwvfexdCOnhEGR.Pisw8bPJub4UQkU1D14.S.6yS', NULL, '2024-11-23 06:43:44.795');

-- Dumping structure for table restapi._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table restapi._prisma_migrations: ~0 rows (approximately)
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('1b7bd650-f59c-4a1b-9c93-997885b9e04e', 'afabcecd57839d1b22742e5b26c04eb0c590ae4cf0e5b27184871812c397dec4', '2024-11-22 12:14:11.981', '20241122121411_banner', NULL, NULL, '2024-11-22 12:14:11.966', 1),
	('28e40bc0-6e18-4dfa-b95c-737260434cb8', 'a51445fde9f51914497e0da100edffe8d4d1b87aea5a676359c00ee56cccde9f', '2024-11-22 12:14:11.853', '20241122074826_user', NULL, NULL, '2024-11-22 12:14:11.822', 1),
	('733646cf-4715-46c2-a200-fcb6391858af', 'daebcff40864b6c6fc20d193a3b0ac56034a3e8e1c278b3674bfd78231339c53', '2024-11-22 12:14:43.058', '20241122121443_services', NULL, NULL, '2024-11-22 12:14:43.043', 1),
	('94aeef20-709b-4111-b9ac-332084e09da7', '483bd7059a67ef23f02ebe9a0dc6e50996cf509c480a8cd44f5b870a74c2cee8', '2024-11-23 03:55:05.908', '20241123035505_balance', NULL, NULL, '2024-11-23 03:55:05.847', 1),
	('9e737a3d-72ec-481d-ad49-36c067ca8974', '6d4dd90c70987aa751728fdd0a87422665ef9a2ea0ba2362baea6b0760199fa1', '2024-11-23 04:05:04.965', '20241123040500_transaction', NULL, NULL, '2024-11-23 04:05:04.800', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
