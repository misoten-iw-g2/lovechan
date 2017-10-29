-- +migrate Up
-- questions
INSERT INTO `questions` (`id`, `question`, `answer_type`) VALUES ('1', '体調は？', '1');
INSERT INTO `questions` (`id`, `question`, `answer_type`) VALUES ('2', 'イベント楽しんでますか？', '2');

-- free_answers
INSERT INTO `free_answers` (`id`, `emotion`, `filename`, `answer`, `question_id`) VALUES ('1', '1', '1.wav', 'すばらしいです！引き続きお身体を大事にしてくださいね！', '1');
INSERT INTO `free_answers` (`id`, `emotion`, `filename`, `answer`, `question_id`) VALUES ('2', '2', '2.wav', 'インフルエンザが流行ってるので気をつけてくださいね！', '1');
INSERT INTO `free_answers` (`id`, `emotion`, `filename`, `answer`, `question_id`) VALUES ('3', '3', '3.wav', 'ええええ大丈夫ですか？今日は早くおうちに帰りましょう！', '1');

-- choice_answers
INSERT INTO `choice_answers` (`id`, `answer`, `filename`, `choice_display` ,`choice`, `question_id`) VALUES ('1', 'うれしい！この後も楽しんで下さいね！', '1.wav', '楽しい', '楽しい,たのしい', '2');
INSERT INTO `choice_answers` (`id`, `answer`, `filename`, `choice_display` ,`choice`, `question_id`) VALUES ('2', '！？でもでも私のブース楽しかったですよね・・・？', '2.wav', '普通', '普通,ふつう', '2');
INSERT INTO `choice_answers` (`id`, `answer`, `filename`, `choice_display` ,`choice`, `question_id`) VALUES ('3', 'もっと楽しんでいきましょー！', '3.wav', '面白くない', '面白くない,おもしろくない', '2');

-- requests
INSERT INTO `requests` (`request_display`, `request`, `filename`) VALUES ('踊って', '踊って,おどって', 'dance.wav');
INSERT INTO `requests` (`request_display`, `request`, `filename`) VALUES ('歌って', '歌って,うたって', 'music.wav');

-- +migrate Down
