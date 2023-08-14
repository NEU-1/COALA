-- 모듈을 만들기 전 테스트를 위해 수행하는 작업

-- 채팅을 테스트 하기 위한 가장 기본적인 세팅만 수행했습니다. 이 버전에서 user_ID는 socket으로 연결된 id값을 바탕으로 진행을 할 것이기 때문에
-- 게시글을 제작했을 때 생성되는 id 값은 배제했습니다 (로그인 구현이 안되어있기 때문...)



Drop TABLE if exists `category`;
CREATE TABLE `category` (
	`id`	bigint NOT NULL,
	`name`	varchar(20)	NOT NULL
);
INSERT INTO `category` (`id`, `name`)
VALUES (1, '키보드'), (2, '마우스'), (3, '해드셋'), (4, '테블릿');

Drop TABLE IF EXISTS `chat_content`;
CREATE TABLE `chat_content` (
	`id`	bigint NOT NULL,
	`room_id`	bigint	NOT NULL,
	`text_content`	longtext	NULL,
	`created_at`	DATETIME	NOT NULL
);

Drop TABLE if exists `chat_room`;
CREATE TABLE `chat_room` (
	`id`	bigint NOT NULL,
	`name`	varchar(255)	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`pr_id`	bigint	NULL,
	`pp_id`	bigint	NULL,
	`user_id`	bigint	NOT NULL
);

Drop TABLE if exists `Posts_Receiver`;
CREATE TABLE `Posts_Receiver` (
	`id`	bigint NOT NULL,
	`cartegory_id`	int	NOT NULL,
	`title`	varchar(255)	NOT NULL,
	`min_rental_period`	SMALLINT	NOT NULL,
	`views`	int	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`status`	int(2)	NOT NULL
);

Drop TABLE if exists `Posts_Provider`;
CREATE TABLE `Posts_Provider` (
	`id`	bigint NOT NULL,
	`cartegory_id`	bigint	NOT NULL,
	`title`	varchar(255)	NOT NULL,
	`min_rental_period`	SMALLINT	NULL,
	`max_rental_period`	SMALLINT	NULL,
	`redemption_date`	DATETIME	NULL,
	`rental_cost`	varchar(255)	NOT NULL,
	`deposit`	varchar(255)	NULL,
	`views`	int	NOT NULL,
	`created_at`	DATETIME	NOT NULL,
	`updated_at`	DATETIME	NOT NULL,
	`status`	int(2)	NOT NULL
);


CREATE TABLE `History` (
    `id`    bigint NOT NULL,
    `producer_id`    bigint NOT NULL,
    `consumer_id`    bigint NOT NULL,
    `deposit`    int NOT NULL,
    `rental_cost`    int NOT NULL,
    `created_at`    datetime NOT NULL,
    `rental_at`    datetime NOT NULL,
    `return_at`    datetime NOT NULL,
    `status`    int NOT NULL,
    `contract_path`    varchar(255) NULL,
    `producer_sign`    varchar(255) NULL,
    `consumer_sign`    varchar(255) NULL,
    `account`    varchar(255) NOT NULL
);
ALTER TABLE `History` ADD CONSTRAINT `PK_HISTORY` PRIMARY KEY (
	`id`
);
ALTER TABLE `History` MODIFY `id` bigint AUTO_INCREMENT;

ALTER TABLE `History` ADD CONSTRAINT `FK_Member_TO_history_1` FOREIGN KEY (
	`producer_id`
)
REFERENCES `Member` (
	`id`
);




ALTER TABLE `category` ADD CONSTRAINT `PK_CATEGORY` PRIMARY KEY (
	`id`
);
ALTER TABLE `category` MODIFY `id` bigint AUTO_INCREMENT;

ALTER TABLE `chat_room` ADD CONSTRAINT `PK_CHAT_ROOM` PRIMARY KEY (
	`id`
);
ALTER TABLE `chat_room` MODIFY `id` bigint AUTO_INCREMENT;

ALTER TABLE `chat_content` ADD CONSTRAINT `PK_CHAT_CONTENT` PRIMARY KEY (
	`id`,
	`room_id`
);
ALTER TABLE `chat_content` MODIFY `id` bigint AUTO_INCREMENT;

ALTER TABLE `chat_content` ADD CONSTRAINT `FK_chat_room_TO_chat_content_1` FOREIGN KEY (
	`room_id`
)
REFERENCES `chat_room` (
	`id`
);

ALTER TABLE `Posts_Receiver` ADD CONSTRAINT `PK_POSTS_RECEIVER` PRIMARY KEY (
	`id`
);
ALTER TABLE `Posts_Receiver` MODIFY `id` bigint AUTO_INCREMENT;

ALTER TABLE `Posts_Provider` ADD CONSTRAINT `PK_POSTS_PROVIDER` PRIMARY KEY (
	`id`
);
ALTER TABLE `Posts_Provider` MODIFY `id` bigint AUTO_INCREMENT;