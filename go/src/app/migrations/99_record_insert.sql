-- +migrate Up
-- questions
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('1', '体調はどうですか？', '体調はどうですか？', '1', 'questions-1.mp4', 'questions-1.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('2', 'イベント楽しんでますか？', 'イベント楽しんでますか？', '2', 'questions-2.mp4', 'questions-2.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('3', '今日は寒かったですね', '今日は寒かったですね', '2', 'questions-3.mp4', 'questions-3.wav', 'sadness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('4', '昨晩はどんな夢を見ましたか？', '昨晩はどんな夢を見ましたか？', '2', 'questions-4.mp4', 'questions-4.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('5', '明日の予定はなんですか？', '明日の予定はなんですか？', '1', 'questions-5.mp4', 'questions-5.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('6', '晩御飯はなにを食べる予定ですか？', '晩御飯はなにを食べる予定ですか？', '1', 'questions-6.mp4', 'questions-6.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('7', 'どのブースがおもしろかったですか？', 'どのブースがおもしろかったですか？', '2', 'questions-7.mp4', 'questions-7.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('8', 'あけましておめでとうございます！', 'あけましておめでとうございます！', '1', 'questions-8.mp4', 'questions-8.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('9', '私って、、何歳に見えますか？', '私って、、何歳に見えますか？？', '2', 'questions-9.mp4', 'questions-9.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('10', 'おせち料理は食べましたか？', 'おせち料理は食べましたか？', '2', 'questions-10.mp4', 'questions-10.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('12', 'はるについてどう思いましたか？', 'HALについてどう思いましたか？', '2', 'questions-12.mp4', 'questions-12.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('13', '異性の好きなタイプは？', '異性の好きなタイプは？', '1', 'questions-13.mp4', 'questions-13.wav', 'happiness', '100');

-- free_answers
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('1', '1', '1', 'free_answers-1-1.mp4', 'free_answers-1-1.wav', 'すばらしいです！引き続きお身体を大事にしてくださいね！', 'すばらしいです！ひきつづきおからだをだいじにしてくださいね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('2', '1', '2', 'free_answers-1-2.mp4', 'free_answers-1-2.wav', 'インフルエンザが流行っているので気をつけてくださいね！', 'インフルエンザがはやっているのできをつけてくださいね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('3', '1', '3', 'free_answers-1-3.mp4', 'free_answers-1-3.wav', 'えーー体調に気をつけてくださいね', 'えーー体調に気をつけてくださいね', 'sadness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('4', '5', '1', 'free_answers-5-4.mp4', 'free_answers-5-4.wav', '明日も楽しんでいきましょう！', 'あしたもたのしんでいきましょう！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('5', '5', '2', 'free_answers-5-5.mp4', 'free_answers-5-5.wav', '何か面白いことが起きるといいですね', 'なにかおもしろいことがおきるといいですね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('6', '5', '3', 'free_answers-5-6.mp4', 'free_answers-5-6.wav', '良い日になりますように', '良い日になりますように', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('7', '6', '1', 'free_answers-6-7.mp4', 'free_answers-6-7.wav', 'いいですね！私も食べたいです！', 'いいですね！わたしもたべたいです！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('8', '6', '2', 'free_answers-6-8.mp4', 'free_answers-6-8.wav', 'おいしそうです。お腹減った。', 'おいしそうです！おなかへった。', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('9', '6', '3', 'free_answers-6-9.mp4', 'free_answers-6-9.wav', 'おいしいものを食べて元気出しましょう！', 'おいしいものをたべて、げんきをだしましょう！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('10', '8', '1', 'free_answers-8-10.mp4', 'free_answers-8-10.wav', '今年もよろしくお願いします！', 'ことしもよろしくおねがいします！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('11', '8', '2', 'free_answers-8-11.mp4', 'free_answers-8-11.wav', '今年もよろしくお願いします！', 'ことしもよろしくおねがいします！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('12', '8', '3', 'free_answers-8-12.mp4', 'free_answers-8-12.wav', '今年もよろしくお願いします！', 'ことしもよろしくおねがいします！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('13', '13', '1', 'free_answers-13-13.mp4', 'free_answers-13-13.wav', 'おお〜♡そういう人に出会えるといいですね！', 'おーーー、そういうひとにであえるといいですね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('14', '13', '2', 'free_answers-13-14.mp4', 'free_answers-13-14.wav', 'おお〜♡そういう人に出会えるといいですね！', 'おーーー、そういうひとにであえるといいですね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer_display`, `answer`, `voice_emotion`, `voice_speed`) VALUES ('15', '13', '3', 'free_answers-13-15.mp4', 'free_answers-13-15.wav', 'おお〜♡そういう人に出会えるといいですね！', 'おーーー、そういうひとにであえるといいですね！', 'happiness', '100');

-- choice_answers
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('1', '2', 'うれしい！このあともたのしんでくださいね！', 'うれしい！この後も楽しんで下さいね！', 'choice_answers-2-1.mp4', 'choice_answers-2-1.wav', '楽しい', '楽しい,たのしい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('2', '2', 'え！？でもでもわたしのブースたのしかったですよね？', 'え！？でもでも私のブース楽しかったですよね・・・？', 'choice_answers-2-2.mp4', 'choice_answers-2-2.wav', '普通', '普通,ふつう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('3', '2', 'もっとたのしんでいきましょー！', 'もっと楽しんでいきましょー！', 'choice_answers-2-3.mp4', 'choice_answers-2-3.wav', '面白くない', '面白くない,おもしろくない', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('4', '3', '夜は冷え込むので気をつけてくださいね', '夜は冷え込むので気をつけてくださいね', 'choice_answers-3-4.mp4', 'choice_answers-3-4.wav', '寒い', '寒い,さむい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('5', '3', 'かぜをひかないようにきをつけましょう！', '風邪ひかないように気をつけましょう！', 'choice_answers-3-5.mp4', 'choice_answers-3-5.wav', '普通', '普通,ふつう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('6', '3', 'えーー！おからだつよいんですね！', 'えええ！お身体つよいんですね！', 'choice_answers-3-6.mp4', 'choice_answers-3-6.wav', '暑い', '暑い,あつい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('7', '4', 'わたしもきょうはお肉いっぱいにかこまれたゆめをみました！', '私も今日はおにくいっぱいに囲まれた夢をみました！', 'choice_answers-4-7.mp4', 'choice_answers-4-7.wav', '面白かった', '面白かった,おもしろかった', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('8', '4', 'きょうはいい夢がみられるようにお祈りしておきます', '今日はいい夢がみられるようにお祈りしておきます', 'choice_answers-4-8.mp4', 'choice_answers-4-8.wav', '見てない', '見てない,みてない', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('9', '4', 'それはさんざんでしたね・・・きっときょうはいいゆめがみられますよ！', 'それは散々でしたね・・・きっと今日はいい夢がみられますよ！', 'choice_answers-4-9.mp4', 'choice_answers-4-9.wav', '悪夢', '悪夢,あくむ', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('10', '7', 'ですよね！さすがー！！', 'ですよね！さすが！', 'choice_answers-7-10.mp4', 'choice_answers-7-10.wav', 'ここ', 'ここ', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('11', '7', 'Hよんにーななでしょ！', 'H427でしょ！', 'choice_answers-7-11.mp4', 'choice_answers-7-11.wav', 'それ以外', 'それ以外,それいがい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('12', '7', 'Hよんにーななでしょ！', 'H427でしょ！', 'choice_answers-7-12.mp4', 'choice_answers-7-12.wav', 'ない', 'ない', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('13', '9', 'せいかいでーす！', '正解でーす！', 'choice_answers-9-13.mp4', 'choice_answers-9-13.wav', '3663', '3663', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('14', '9', 'じつはわたし・・・えいえんの3663歳なんです', '実は・・・私・・・永遠の꒰♡꒱（3663）歳なんです', 'choice_answers-9-14.mp4', 'choice_answers-9-14.wav', '23', '23', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('15', '9', 'じつはわたし・・・えいえんの3663歳なんです', '実は・・・私・・・永遠の꒰♡꒱（3663）歳なんです', 'choice_answers-9-15.mp4', 'choice_answers-9-15.wav', '1000', '1000', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('16', '9', 'じつはわたし・・・えいえんの3663歳なんです', '実は・・・私・・・永遠の꒰♡꒱（3663）歳なんです', 'choice_answers-9-16.mp4', 'choice_answers-9-16.wav', '30', '30', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('17', '10', 'わたしはまだなんです。ずるいです', '私はまだなんです。ずるいです', 'choice_answers-10-17.mp4', 'choice_answers-10-17.wav', 'はい', 'はい', 'sadness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('18', '10', 'わたしもなんです！いっしょにたべましょう', '私もなんです！一緒に食べましょう♡', 'choice_answers-10-18.mp4', 'choice_answers-10-18.wav', 'いいえ', 'いいえ', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('22', '12', 'ありがとうございます！とってもたのしいがっこうなんですよ！', 'ありがとうございます！と～っても楽しい学校なんですよ！', 'choice_answers-12-22.mp4', 'choice_answers-12-22.wav', '良さそう', '良さそう,よさそう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('23', '12', 'ぜひこのあともみらいそうぞうてんをたのしんでください！きっとみりょくがみつかるはずです！', '是非この後も未来創造展を楽しんで下さい！きっと魅力が見つかるはずです！', 'choice_answers-12-23.mp4', 'choice_answers-12-23.wav', '普通', '普通,ふつう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('24', '12', 'そんな・・・', 'そんな・・・・・・・・・・・・・・・・・・・・・・・・・・・・', 'choice_answers-12-24.mp4', 'choice_answers-12-24.wav', 'だめそう', 'だめそう', 'sadness', '100');

-- requests
INSERT INTO `requests` (`id`, `video_file_name`, `voice_file_name`, `request_display` ,`request`) VALUES ('1', 'requests-1.mp4', 'requests-1.wav', '踊って', '踊って,おどって');
INSERT INTO `requests` (`id`, `video_file_name`, `voice_file_name`, `request_display` ,`request`) VALUES ('2', 'requests-2.mp4', 'requests-2.wav', '一発芸して', '一発芸して,いっぱつげいして');

-- user_answers
INSERT INTO `user_answers` (`question`, `answer`, `score`, `question_id`, `emotion`, `created_at`) VALUES
('たいちょうはどうですか？', '今日は最高です', 0.7, 1, 1, '2017-11-15 03:10:00'),
('たいちょうはどうですか？', '眠い', 0.2, 1, 2, '2017-11-15 03:10:01'),
('イベント楽しんでますか？', '楽しい', 0.8, 2, 1, '2017-11-15 03:10:02'),
('明日の予定はなんですか？', '高級料理食べに行くの', 0.4, 5, 1, '2017-11-15 03:12:33'),
('今日は寒かったですね', '暑い', 0, 3, 2, '2017-11-15 03:13:00'),
('晩御飯はなにを食べる予定ですか？', 'ご飯', 0, 6, 2, '2017-11-15 03:14:14'),
('私って、、何歳に見えますか？', '100', 0, 9, 2, '2017-11-15 03:14:15'),
('イベント楽しんでますか？', '普通', -0.3, 2, 3, '2017-11-15 03:14:17'),
('イベント楽しんでますか？', '面白くない', -0.8, 2, 3, '2017-11-15 03:14:26'),
('今日は寒かったですね', '寒かったです', -0.6, 3, 3, '2017-11-15 03:14:27'),
('たいちょうはどうですか？', '普通だよ', -0.4, 1, 3, '2017-11-15 03:14:36'),
('今日は寒かったですね', '暑かったです', 0.2, 3, 2, '2017-11-15 03:10:52'),
('今日は寒かったですね', '寒い', 0.1, 3, 2, '2017-11-15 03:15:09'),
('今日は寒かったですね', '寒かったです', -0.6, 3, 3, '2017-11-15 03:16:14'),
('明日の予定はなんですか？', '何もない', -0.7, 5, 3, '2017-11-15 03:17:46'),
('昨晩はどんな夢を見ましたか？', '悪夢', 0, 4, 2, '2017-11-15 03:18:19'),
('昨晩はどんな夢を見ましたか？', '見てない', -0.3, 4, 3, '2017-11-15 03:19:25'),
('昨晩はどんな夢を見ましたか？', '面白かった', 0.8, 4, 1, '2017-11-15 03:20:33'),
('明日の予定はなんですか？', '外食しにいく', 0.1, 5, 2, '2017-11-15 03:22:14'),
('晩御飯はなにを食べる予定ですか？', '食べない', -0.4, 6, 3, '2017-11-15 03:23:00'),
('晩御飯はなにを食べる予定ですか？', 'ラーメン食べるよ', 0, 6, 2, '2017-11-15 03:25:12'),
('どのブースがおもしろかったですか？', 'ここ', 0.3, 7, 1, '2017-11-15 03:27:39'),
('どのブースがおもしろかったですか？', 'それ以外', 0.2, 7, 2, '2017-11-15 03:33:45'),
('どのブースがおもしろかったですか？', 'ない', -0.2, 7, 2, '2017-11-15 03:33:48'),
('あけましておめでとうございます！今年も一緒に頑張りましょう！', 'よろしく', 0.5, 8, 1, '2017-11-15 03:24:00'),
('私って、、何歳に見えますか？', '3663', 0, 9, 2, '2017-11-15 03:44:20'),
('私って、、何歳に見えますか？', '10', 0, 9, 2, '2017-11-15 03:54:29'),
('私って、、何歳に見えますか？', '100', 0, 9, 2, '2017-11-15 04:14:32'),
('おせち料理は食べましたか？', 'はい', 0.1, 10, 2, '2017-11-15 04:14:46'),
('おせち料理は食べましたか？', 'いいえ', 0, 10, 2, '2017-11-15 04:14:49'),
('はるについてどう思いましたか？', '良さそう', 0.9, 12, 1, '2017-11-16 03:17:21'),
('はるについてどう思いましたか？', '普通', -0.3, 12, 3, '2017-11-16 03:17:28'),
('はるについてどう思いましたか？', 'だめそう', -0.6, 12, 3, '2017-11-16 03:17:35'),
('異性の好きなタイプは？', 'イケメン', 0.8, 13, 1, '2017-11-16 03:17:46'),
('異性の好きなタイプは？', 'オタク', 0, 13, 2, '2017-11-16 03:17:50'),
('異性の好きなタイプは？', 'かっこいい', 0.9, 13, 1, '2017-11-16 03:17:56'),
('びっしゅさんのライブ楽しみですね！', '最高！楽しみ！', 0.8, 14, 1, '2017-11-16 03:18:12'),
('びっしゅさんのライブ楽しみですね！', 'いえーい！', 0.1, 14, 2, '2017-11-16 03:18:18');
COMMIT;

-- +migrate Down
