-- +migrate Up
CREATE TABLE answers
(
	id bigint unsigned NOT NULL AUTO_INCREMENT,
	emotion int(1) unsigned NOT NULL,
	filename varchar(100) NOT NULL,
	word varchar(100) NOT NULL,
	question_id bigint unsigned,
	PRIMARY KEY (id)
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

ALTER TABLE answers
	ADD FOREIGN KEY (question_id)
	REFERENCES questions (id)
	ON UPDATE RESTRICT
	ON DELETE RESTRICT
;

-- +migrate Down
DROP TABLE answers;
