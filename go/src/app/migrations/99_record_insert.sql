-- +migrate Up
-- questions
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('1', 'たいちょうは？', '体調は？', '1', 'situmon.mp4', 'questions-1.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('2', 'イベント楽しんでますか？', 'イベント楽しんでますか？', '2', 'hanasikakeru.mp4', 'questions-2.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('3', '今日は寒かったですね', '今日は寒かったですね', '2', 'situmon.mp4', 'questions-3.wav', 'sadness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('4', '昨晩はどんな夢を見ましたか？', '昨晩はどんな夢を見ましたか？', '2', 'situmon.mp4', 'questions-4.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('5', '明日の予定はなんですか？', '明日の予定はなんですか？', '1', 'situmon.mp4', 'questions-5.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('6', '晩御飯はなにを食べる予定ですか？', '晩御飯はなにを食べる予定ですか？', '1', 'situmon.mp4', 'questions-6.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('7', 'どのブースがおもしろかったですか？', 'どのブースがおもしろかったですか？', '2', 'situmon.mp4', 'questions-7.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('8', 'あけましておめでとうございます！今年も一緒に頑張りましょう！', 'あけましておめでとうございます！今年も一緒に頑張りましょう！', '1', 'gutpause.mp4', 'questions-8.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('9', '私って、、何歳に見えますか？？', '私って、、何歳に見えますか？？', '2', 'situmon.mp4', 'questions-9.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('10', 'おせち料理は食べましたか？', 'おせち料理は食べましたか？', '2', 'situmon.mp4', 'questions-10.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('11', 'ここだけの話、わたしは早口言葉が得意なんです！速さはどれくらいがいいですか？', 'ここだけの話、私早口言葉が得意なんです！速さはどれくらいが良いですか？', '2', 'situmon.mp4', 'questions-11.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('12', 'はるについてどう思いましたか？', 'HALについてどう思いましたか？', '2', 'situmon.mp4', 'questions-12.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('13', '異性の好きなタイプは？', '異性の好きなタイプは？', '1', 'situmon.mp4', 'questions-13.wav', 'happiness', '100');
INSERT INTO `questions` (`id`, `question`, `question_display`, `answer_type`, `video_file_name`, `voice_file_name`, `voice_emotion`, `voice_speed`) VALUES ('14', 'びっしゅさんのライブ楽しみですね！', 'BiSHさんのライブ楽しみですね！', '1', 'gutpause.mp4', 'questions-14.wav', 'happiness', '100');

-- free_answers
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('1', '1', '1', 'subarashi.mp4', 'free_answers-1-1.wav', 'すばらしいです！引き続きお身体を大事にしてくださいね！', 'すばらしいです！ひきつづきおからだをだいじにしてくださいね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('2', '1', '2', 'chui.mp4', 'free_answers-1-2.wav', 'インフルエンザが流行ってるので気をつけてくださいね！', 'インフルエンザがはやってるのできをつけてくださいね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('3', '1', '3', 'sinpai.mp4', 'free_answers-1-3.wav', 'ええええ大丈夫ですか？今日は早くおうちに帰りましょう！', 'ええええだいじょうぶですか？きょうははやくおうちにかえりましょう！', 'sadness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('4', '5', '1', 'gutspause.mp4', 'free_answers-5-4.wav', '明日も楽しんでいきましょう！', 'あしたもたのしんでいきましょう！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('5', '5', '2', 'gutspause.mp4', 'free_answers-5-5.wav', '何か面白いことが起きるといいですね', 'なにかおもしろいことがおきるといいですね', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('6', '5', '3', 'gutspause.mp4', 'free_answers-5-6.wav', '良い日になるように、私がお祈りしておきます！', 'よいひになるように、私がおいのりしておきます！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('7', '6', '1', 'watasimotabetai.mp4', 'free_answers-6-7.wav', 'いいですね！私も食べたいです！', 'いいですね！わたしもたべたいです！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('8', '6', '2', 'watasimotabetai.mp4', 'free_answers-6-8.wav', 'おいしそうです。お腹減った。', 'おいしそうです。おなかへった。', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('9', '6', '3', '', 'free_answers-6-9.wav', 'おいしいものを食べて元気出しましょう！', 'おいしいものをたべてげんきだしましょう！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('10', '8', '1', 'yorosiku.mp4', 'free_answers-8-10.wav', '今年もよろしくお願いします！', 'ことしもよろしくおねがいします！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('11', '8', '2', 'yorosiku.mp4', 'free_answers-8-11.wav', '今年もよろしくお願いします！', 'ことしもよろしくおねがいします！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('12', '8', '3', 'yorosiku.mp4', 'free_answers-8-12.wav', '今年もよろしくお願いします！', 'ことしもよろしくおねがいします！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('13', '13', '1', '', 'free_answers-13-13.wav', 'おお〜♡そういう人に出会えるといいですね！', 'おお〜そういうひとにであえるといいですね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('14', '13', '2', '', 'free_answers-13-14.wav', 'おお〜♡そういう人に出会えるといいですね！', 'おお〜そういうひとにであえるといいですね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('15', '13', '3', '', 'free_answers-13-15.wav', 'おお〜♡そういう人に出会えるといいですね！', 'おお〜そういうひとにであえるといいですね！', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('16', '14', '1', '', 'free_answers-14-16.wav', 'その手と手繋いで〜笑いあった声〜忘れはしないよ〜  ♫ by Bish', 'その手と手繋いで〜笑いあった声〜忘れはしないよ〜  ♫ by ビッシュ', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('17', '14', '2', '', 'free_answers-14-17.wav', 'その手と手繋いで〜笑いあった声〜忘れはしないよ〜 ♫ by Bish', 'その手と手繋いで〜笑いあった声〜忘れはしないよ〜  ♫ by ビッシュ', 'happiness', '100');
INSERT INTO `free_answers` (`id`, `question_id`, `emotion`, `video_file_name`, `voice_file_name`, `answer`, `answer_display`, `voice_emotion`, `voice_speed`) VALUES ('18', '14', '3', '', 'free_answers-14-18.wav', 'その手と手繋いで〜笑いあった声〜忘れはしないよ〜 ♫ by Bish', 'その手と手繋いで〜笑いあった声〜忘れはしないよ〜  ♫ by ビッシュ', 'happiness', '100');

-- choice_answers
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('1', '2', 'うれしい！このあともたのしんでくださいね！', 'うれしい！この後も楽しんで下さいね！', '.mp4', 'choice_answers-2-1.wav', '楽しい', '楽しい,たのしい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('2', '2', 'え！？でもでもわたしのブースたのしかったですよね？', 'え！？でもでも私のブース楽しかったですよね・・・？', '.mp4', 'choice_answers-2-2.wav', '普通', '普通,ふつう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('3', '2', 'もっとたのしんでいきましょー！', 'もっと楽しんでいきましょー！', '.mp4', 'choice_answers-2-3.wav', '面白くない', '面白くない,おもしろくない', 'sadness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('4', '3', 'えええ！おからだつよいんですね！', 'えええ！お身体つよいんですね！', '.mp4', 'choice_answers-3-4.wav', '寒かったです', '寒かったです,さむかったです', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('5', '3', 'かぜひかないようにきをつけましょう！', '風邪ひかないように気をつけましょう！', '.mp4', 'choice_answers-3-5.wav', '普通', '普通,ふつう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('6', '3', 'よるになるとぐっとひえこむのできをつけてくださいね', '夜になるとぐっと冷え込むので気をつけてくださいね', '.mp4', 'choice_answers-3-6.wav', '暑い', '暑い,あつい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('7', '4', 'それはさんざんでしたね・・・きっときょうはいいゆめがみられますよ！', 'それは散々でしたね・・・きっと今日はいい夢がみられますよ！', '.mp4', 'choice_answers-4-7.wav', '面白かった', '面白かった,おもしろかった', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('8', '4', 'こわいですね・・・！きょうはいいゆめがみられるようにおはらいをせねば！', 'こわいですね・・・！今日はいい夢がみられるようにお祓いをせねば！', '.mp4', 'choice_answers-4-8.wav', '見てない', '見てない,みてない', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('9', '4', 'そうなんですね！わたしもきょうはおにくいっぱいにかこまれたゆめをみました！', 'そうなんですね！私も今日はおにくいっぱいに囲まれた夢をみました！', '.mp4', 'choice_answers-4-9.wav', '悪夢', '悪夢,あくむ', 'sadness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('10', '7', 'ですよね！さすが！', 'ですよね！さすが！', '.mp4', 'choice_answers-7-10.wav', 'ここ', 'ここ', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('11', '7', 'X417でしょ！', 'X417でしょ！', '.mp4', 'choice_answers-7-11.wav', 'それ以外', 'それ以外,それいがい', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('12', '7', 'X417でしょ！', 'X417でしょ！', '.mp4', 'choice_answers-7-12.wav', 'ない', 'ない', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('13', '9', 'せいかいです！よくわかりましたね', '正解です！よくわかりましたね', '.mp4', 'choice_answers-9-13.wav', '3633', '3633', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('14', '9', 'じつは・・・わたし・・・えいえんの3663歳なんです', '実は・・・私・・・永遠の꒰♡꒱（3663）歳なんです', '.mp4', 'choice_answers-9-14.wav', '23', '23', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('15', '9', 'じつは・・・わたし・・・えいえんの3663歳なんです', '実は・・・私・・・永遠の꒰♡꒱（3663）歳なんです', '.mp4', 'choice_answers-9-15.wav', '1000', '1000', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('16', '9', 'じつは・・・わたし・・・えいえんの3663歳なんです', '実は・・・私・・・永遠の꒰♡꒱（3663）歳なんです', '.mp4', 'choice_answers-9-16.wav', '30', '30', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('17', '10', 'わたしはまだたべてないんですよ〜ずるいです　ぷんぷん', '私はまだ食べてないんですよ〜ずるいです　ぷんぷん', '.mp4', 'choice_answers-10-17.wav', 'はい', 'はい', 'sadness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('18', '10', 'わたしもなんです！いっしょにたべましょう', '私もなんです！一緒に食べましょう♡', '.mp4', 'choice_answers-10-18.wav', 'いいえ', 'いいえ', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('19', '11', 'なまむぎなまごめなまたまごなまむぎなまごめなまたまごなまむぎなまごめなまたまご', '生麦生米生卵（1000倍速）', '.mp4', 'choice_answers-11-19.wav', '4倍速', '4倍速,4ばいそく', 'happiness', '400');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('20', '11', 'なまむぎなまごめなまたまごなまむぎなまごめなまたまごなまむぎなまごめなまたまご', '生麦生米生卵（100倍速）', '.mp4', 'choice_answers-11-20.wav', '3倍速', '3倍速,3ばいそく', 'happiness', '300');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('21', '11', 'なまむぎなまごめなまたまごなまむぎなまごめなまたまごなまむぎなまごめなまたまご', '生麦生米生卵（10倍速）', '.mp4', 'choice_answers-11-21.wav', '1倍速', '1倍速,1ばいそく', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('22', '12', 'ありがとうございます！と～ってもたのしいがっこうなんですよ！', 'ありがとうございます！と～っても楽しい学校なんですよ！', '.mp4', 'choice_answers-12-22.wav', '良さそう', '良さそう,よさそう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('23', '12', 'ぜひこのあともみらいそうぞうてんをたのしんでください！きっとみりょくがみつかるはずです！', '是非この後も未来創造展を楽しんで下さい！きっと魅力が見つかるはずです！', '.mp4', 'choice_answers-12-23.wav', '普通', '普通,ふつう', 'happiness', '100');
INSERT INTO `choice_answers` (`id`, `question_id`, `answer`, `answer_display`, `video_file_name`, `voice_file_name`, `choice_display` ,`choice`,`voice_emotion`, `voice_speed`) VALUES ('24', '12', 'そんな・・・', 'そんな・・・・・・・・・・・・・・・・・・・・・・・・・・・・', '.mp4', 'choice_answers-12-24.wav', 'だめそう', 'だめそう', 'sadness', '100');

-- requests
INSERT INTO `requests` (`id`, `video_file_name`, `voice_file_name`, `request_display` ,`request`) VALUES ('1', '', 'requests-1.wav', '踊って', '踊って,おどって');
INSERT INTO `requests` (`id`, `video_file_name`, `voice_file_name`, `request_display` ,`request`) VALUES ('2', '', 'requests-2.wav', '一発芸して', '一発芸して,いっぱつげいして');
INSERT INTO `requests` (`id`, `video_file_name`, `voice_file_name`, `request_display` ,`request`) VALUES ('3', '', 'requests-3.wav', '歌って', '歌って,うたって');

-- +migrate Down
