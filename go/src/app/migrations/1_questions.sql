-- +migrate Up
CREATE TABLE questions
(
	id bigint unsigned NOT NULL AUTO_INCREMENT,
	question text NOT NULL,
	count int NOT NULL,
	PRIMARY KEY (id)
) COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

-- +migrate Down
DROP TABLE questions;
