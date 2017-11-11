package media

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var QuestionType = MediaType("application/vnd.questionType+json", func() {
	Description("ラヴちゃんからの質問")
	Attributes(func() {
		Attribute("id", Integer, "id", func() {
			Example(1)
		})
		Attribute("question", String, "ラヴちゃん", func() {
			Example("今日は体調どうですか？")
		})
		Attribute("choices", ArrayOf(String), "選択肢を与えるパターン", func() {
			Example([]string{"はい", "いいえ"})
		})
		Attribute("answer_type", Integer, "質問タイプ(free: 1, select: 2)", func() {
			Default(1)
		})
	})
	Required(
		"id",
		"question",
		"choices",
		"answer_type",
	)
	View("default", func() {
		Attribute("id")
		Attribute("question")
		Attribute("choices")
		Attribute("answer_type")
		Required(
			"id",
			"question",
			"choices",
			"answer_type",
		)
	})
})

var AnswerType = MediaType("application/vnd.answerType+json", func() {
	Description("ラヴちゃんからの回答")
	Attributes(func() {
		Attribute("id", Integer, "id", func() {
			Example(1)
		})
		Attribute("answer", String, "回答", func() {
			Example("体には気をつけてください!")
		})
		Attribute("score", Number, "感情分析結果", func() {
			Example(0.2)
		})
		Attribute("user_voice_text", String, "発言の文字起こし", func() {
			Example("こんにちは")
			Default("")
		})
	})
	Required(
		"id",
		"answer",
		"score",
		"user_voice_text",
	)
	View("default", func() {
		Attribute("id")
		Attribute("answer")
		Attribute("score")
		Attribute("user_voice_text")
		Required(
			"id",
			"answer",
			"score",
			"user_voice_text",
		)
	})
})
