-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema coala
-- -----------------------------------------------------
CREATE USER 'coala'@'%' IDENTIFIED BY 'Ssafy123!';
GRANT ALL PRIVILEGES ON coala.* TO 'coala'@'%';
FLUSH PRIVILEGES;
-- -----------------------------------------------------
-- Schema coala
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `coala` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `coala` ;

-- -----------------------------------------------------
-- Table `coala`.`Certification`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`Certification` (
  `email` VARCHAR(255) NOT NULL,
  `otp` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`Member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`Member` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `depart` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `image_path` VARCHAR(255) NULL DEFAULT NULL,
  `name` VARCHAR(45) NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `ordinal` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone_no` VARCHAR(45) NOT NULL,
  `student_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `UK_9qv6yhjqm8iafto8qk452gx8h` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`FreePost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`FreePost` (
  `count` INT NOT NULL DEFAULT '0',
  `is_anonymous` BIT(1) NOT NULL,
  `views` INT NOT NULL DEFAULT '0',
  `create_at` DATETIME(6) NULL DEFAULT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `update_at` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NOT NULL,
  `image_path` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `detail` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKcnt4cdkywsufm0ukky9ei0puo` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKcnt4cdkywsufm0ukky9ei0puo`
    FOREIGN KEY (`user_id`)
    REFERENCES `coala`.`Member` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`FreeComment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`FreeComment` (
  `create_at` DATETIME(6) NULL DEFAULT NULL,
  `fp_id` BIGINT NOT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `update_at` DATETIME(6) NULL DEFAULT NULL,
  `author` VARCHAR(255) NOT NULL,
  `content` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK6ncyiqmu8dl8dnyq6sdf9ae9o` (`fp_id` ASC) VISIBLE,
  CONSTRAINT `FK6ncyiqmu8dl8dnyq6sdf9ae9o`
    FOREIGN KEY (`fp_id`)
    REFERENCES `coala`.`FreePost` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`FreeGood`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`FreeGood` (
  `is_good` INT NULL DEFAULT '0',
  `fp_id` BIGINT NOT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `writer_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKgstpk00x94s782sg9dodd6dyi` (`fp_id` ASC) VISIBLE,
  INDEX `FK2n7obb1yia2pimok7axxdv1bj` (`user_id` ASC) VISIBLE,
  INDEX `FK2bhyj6ln6ihcixjuytr24p94o` (`writer_id` ASC) VISIBLE,
  CONSTRAINT `FK2bhyj6ln6ihcixjuytr24p94o`
    FOREIGN KEY (`writer_id`)
    REFERENCES `coala`.`FreePost` (`id`),
  CONSTRAINT `FK2n7obb1yia2pimok7axxdv1bj`
    FOREIGN KEY (`user_id`)
    REFERENCES `coala`.`Member` (`id`),
  CONSTRAINT `FKgstpk00x94s782sg9dodd6dyi`
    FOREIGN KEY (`fp_id`)
    REFERENCES `coala`.`FreePost` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`FreeImage`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`FreeImage` (
  `fp_id` BIGINT NOT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `image_path` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKa5walo7g52y26cakb99w66wl4` (`fp_id` ASC) VISIBLE,
  CONSTRAINT `FKa5walo7g52y26cakb99w66wl4`
    FOREIGN KEY (`fp_id`)
    REFERENCES `coala`.`FreePost` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`Member_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`Member_roles` (
  `Member_id` BIGINT NOT NULL,
  `roles` VARCHAR(255) NULL DEFAULT NULL,
  INDEX `FKir4impnx11537bf58qopf7i5h` (`Member_id` ASC) VISIBLE,
  CONSTRAINT `FKir4impnx11537bf58qopf7i5h`
    FOREIGN KEY (`Member_id`)
    REFERENCES `coala`.`Member` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`RefreshToken`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`RefreshToken` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `refreshToken` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`TechPost`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`TechPost` (
  `count` INT NOT NULL DEFAULT '0',
  `views` INT NOT NULL DEFAULT '0',
  `create_at` DATETIME(6) NULL DEFAULT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `nickname` BIGINT NULL DEFAULT NULL,
  `update_at` DATETIME(6) NULL DEFAULT NULL,
  `user_id` BIGINT NOT NULL,
  `image_path` VARCHAR(255) NULL DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `detail` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKq2toml8mbiws0bro359pw0x2p` (`nickname` ASC) VISIBLE,
  INDEX `FKeig9vlj558dwquwk7tq5uqkev` (`user_id` ASC) VISIBLE,
  CONSTRAINT `FKeig9vlj558dwquwk7tq5uqkev`
    FOREIGN KEY (`user_id`)
    REFERENCES `coala`.`Member` (`id`),
  CONSTRAINT `FKq2toml8mbiws0bro359pw0x2p`
    FOREIGN KEY (`nickname`)
    REFERENCES `coala`.`Member` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `coala`.`TechGood`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `coala`.`TechGood` (
  `is_good` INT NULL DEFAULT '0',
  `fp_id` BIGINT NOT NULL,
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `writer_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FKfnkqpl9pre5b6wgmjflrtv6e7` (`fp_id` ASC) VISIBLE,
  INDEX `FKcl854jvynah9jrq40px15eqbd` (`user_id` ASC) VISIBLE,
  INDEX `FKpx7g8m6jg45y29gus2v0466qu` (`writer_id` ASC) VISIBLE,
  CONSTRAINT `FKcl854jvynah9jrq40px15eqbd`
    FOREIGN KEY (`user_id`)
    REFERENCES `coala`.`TechPost` (`id`),
  CONSTRAINT `FKfnkqpl9pre5b6wgmjflrtv6e7`
    FOREIGN KEY (`fp_id`)
    REFERENCES `coala`.`TechPost` (`id`),
  CONSTRAINT `FKpx7g8m6jg45y29gus2v0466qu`
    FOREIGN KEY (`writer_id`)
    REFERENCES `coala`.`TechPost` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


CREATE TABLE IF NOT EXISTS `coala`.`chat_room` (
	`id`	bigint NOT NULL AUTO_INCREMENT,
	`pr_id`	bigint	NULL,
	`pp_id`	bigint	NULL,
	`name`	varchar(10)	NOT NULL,
	`created_at`	DATETIME	DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `coala`.`room_member` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `member_id` BIGINT,
  `room_id` BIGINT,
  FOREIGN KEY (`member_id`) REFERENCES `coala`.`member`(`id`),
  FOREIGN KEY (`room_id`) REFERENCES `coala`.`chat_room`(`id`)
);



SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
