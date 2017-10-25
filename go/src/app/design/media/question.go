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
	})
	Required(
		"id",
		"question",
	)
	View("default", func() {
		Attribute("id")
		Attribute("question")
		Required(
			"id",
			"question",
		)
	})
})

var AnswerType = MediaType("application/vnd.answerType+json", func() {
	Description("ラブちゃんからの回答")
	Attributes(func() {
		Attribute("id", Integer, "id", func() {
			Example(1)
		})
		Attribute("answer", String, "回答", func() {
			Example("体には気をつけてください!")
		})
		Attribute("filename", String, "音声ファイル名", func() {
			Example("media01.wav")
		})
	})
	Required(
		"id",
		"answer",
		"filename",
	)
	View("default", func() {
		Attribute("id")
		Attribute("answer")
		Attribute("filename")
		Required(
			"id",
			"answer",
			"filename",
		)
	})
})
