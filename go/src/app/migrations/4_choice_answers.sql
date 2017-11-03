-- +migrate Up
CREATE TABLE choice_answers
(
  id bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID',
	answer varchar(100) NOT NULL COMMENT '回答',
	video_file_name varchar(100) NOT NULL COMMENT '動画ファイル名',
	voice_file_name varchar(100) NOT NULL COMMENT '音声ファイル名',
	choice varchar(20) NOT NULL COMMENT '選択肢',
	choice_display varchar(100) NOT NULL COMMENT '表示用選択肢',
	question_id bigint unsigned NOT NULL COMMENT '質問ID',
	PRIMARY KEY (id)
) COMMENT = '回答の選択肢' COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

ALTER TABLE choice_answers
	ADD FOREIGN KEY (question_id)
	REFERENCES questions (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;

-- +migrate Down
DROP TABLE choice_answers;
