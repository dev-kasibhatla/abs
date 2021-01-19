SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+05:30";

CREATE DATABASE IF NOT EXISTS `fyinumlf_absdb` DEFAULT CHARACTER SET ascii COLLATE ascii_bin;
USE `fyinumlf_absdb`;

CREATE TABLE `admin` (
	`id` TINYINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT 'ID of admin',
	`name` varchar(50) COLLATE utf8mb4_bin DEFAULT NULL COMMENT 'Display name of admin',
	`email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Login email of admin',
	`password` char(60) DEFAULT NULL COMMENT 'Hash of admin'
) ENGINE=InnoDB;
INSERT INTO `admin`(id,name) VALUES(0,'Default Ghost');

CREATE TABLE `club` (
	`id` SMALLINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT 'ID of club',
	`name` varchar(25) DEFAULT NULL COLLATE utf8mb4_bin COMMENT 'Display name of club',
	`email` varchar(50) DEFAULT NULL COLLATE utf8mb4_unicode_ci COMMENT 'Login email of club',
	`password` char(60) DEFAULT NULL COMMENT 'Hash of club',
	`registered` timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL COMMENT 'Registration timestamp',
	`lastlogin` datetime NOT NULL COMMENT 'Last login timestamp',
	`lastloginip` VARBINARY(16) DEFAULT NULL COMMENT 'Last login IP address'
) ENGINE=InnoDB;

CREATE TABLE `booking` (
	`id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL COMMENT 'ID of booking',
	`club` SMALLINT UNSIGNED NOT NULL COMMENT 'ID of club',
	`bdate` DATE DEFAULT NULL COMMENT 'Date of booking',
	`tslot` BIT(4) DEFAULT b'0000' COMMENT 'Timeslot of booking',
	`approved` BIT(1) DEFAULT b'1' NOT NULL COMMENT 'Whether booking is approved',
	`admin` TINYINT UNSIGNED NOT NULL COMMENT 'ID of last-modified admin',
	CONSTRAINT Single_Approved_Slot UNIQUE (bdate,tslot,approved),
	FOREIGN KEY(club) REFERENCES club(id),
	FOREIGN KEY(admin) REFERENCES admin(id)
) ENGINE=InnoDB;

