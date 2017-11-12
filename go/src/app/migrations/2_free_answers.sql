-- +migrate Up
CREATE TABLE free_answers
(
	id bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
	emotion int(1) unsigned NOT NULL COMMENT '感情(good:1, normal:2, bad:3)',
	video_file_name varchar(100) NOT NULL COMMENT '動画ファイル名',
	voice_file_name varchar(100) NOT NULL COMMENT '音声ファイル名',
	answer varchar(100) NOT NULL COMMENT '回答',
	answer_display varchar(100) NOT NULL COMMENT '回答表示用',
	voice_emotion varchar(20) NOT NULL COMMENT '音声感情',
	voice_speed int NOT NULL COMMENT '音声スピード',
	question_id bigint unsigned NOT NULL COMMENT '質問ID',
	PRIMARY KEY (id)
) COMMENT = '回答の選択肢' COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

ALTER TABLE free_answers
	ADD FOREIGN KEY (question_id)
	REFERENCES questions (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;

-- +migrate Down
DROP TABLE free_answers;
