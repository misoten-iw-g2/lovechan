-- +migrate Up
CREATE TABLE requests
(
  id bigint NOT NULL AUTO_INCREMENT COMMENT 'id',
  request_display varchar(100) NOT NULL COMMENT 'リクエスト表示名',
  request varchar(200) NOT NULL COMMENT 'リクエスト',
  filename varchar(100) NOT NULL COMMENT 'ファイル名',
  PRIMARY KEY (id)
) COMMENT = 'リクエストの選択肢' COLLATE='utf8mb4_general_ci' ENGINE=InnoDB;

-- +migrate Down
DROP TABLE requests;
