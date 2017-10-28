-- +migrate Up
CREATE TABLE user_answers
(
	id bigint unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
	answer varchar(100) NOT NULL COMMENT 'ユーザーの回答',
	score float NOT NULL COMMENT '感情点数',
	question_id bigint unsigned NOT NULL COMMENT '質問ID',
	PRIMARY KEY (id)
) COMMENT = 'ユーザーの答え' COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

ALTER TABLE user_answers
	ADD FOREIGN KEY (question_id)
	REFERENCES questions (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;

-- +migrate Down
DROP TABLE user_answers;
