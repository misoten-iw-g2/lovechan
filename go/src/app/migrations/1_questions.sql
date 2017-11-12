-- +migrate Up
CREATE TABLE questions
(
	id bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
	question varchar(100) NOT NULL COMMENT '質問',
	question_display varchar(100) NOT NULL COMMENT '質問表示用',
	answer_type int(1) NOT NULL COMMENT '回答タイプ（free: 1, select: 2）',
	count bigint DEFAULT 0 NOT NULL COMMENT '質問回数',
	video_file_name varchar(100) NOT NULL COMMENT '動画ファイル名',
	voice_file_name varchar(100) NOT NULL COMMENT '音声ファイル名',
	voice_emotion varchar(20) NOT NULL COMMENT '音声感情',
	voice_speed int NOT NULL COMMENT '音声スピード',
	PRIMARY KEY (id)
) COMMENT = '質問' COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

-- +migrate Down
DROP TABLE questions;
