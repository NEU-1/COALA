CREATE DATABASE IF NOT EXISTS d108team;
USE d108team;

CREATE TABLE IF NOT EXISTS `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `depart` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `name` varchar(45) NOT NULL,
  `nickname` varchar(45) NOT NULL,
  `ordinal` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `OTP` varchar(255) DEFAULT NULL,
  `phone_no` varchar(45) NOT NULL,
  `student_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_9qv6yhjqm8iafto8qk452gx8h` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `member` 
(`id`,`email`,`password`,`name`,`nickname`,`student_id`,`depart`,`ordinal`,`phone_no`)
 VALUES (1,'tncks097@naver.com','1234','my_name','nickname','929229','gumi',`9기`,'01099557124');
INSERT INTO `member` 
(`id`,`email`,`password`,`name`,`nickname`,`student_id`,`depart`,`ordinal`,`phone_no`) 
VALUES (2,'tncks097@gmail.com','1234','eman_ym','emankcin','922929','gumi',`9기`,'41275599010');

CREATE TABLE IF NOT EXISTS `chat_room` (
	`id`	bigint NOT NULL AUTO_INCREMENT,
	`pr_id`	bigint	NULL,
	`pp_id`	bigint	NULL,
	`name`	varchar(10)	NOT NULL,
	`created_at`	DATETIME	DEFAULT CURRENT_TIMESTAMP NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `room_member` (
  `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
  `member_id` BIGINT,
  `room_id` BIGINT,
  FOREIGN KEY (`member_id`) REFERENCES `member`(`id`),
  FOREIGN KEY (`room_id`) REFERENCES `chat_room`(`id`)
);
