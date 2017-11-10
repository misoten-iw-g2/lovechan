package media

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var SelectType = MediaType("application/vnd.selectType+json", func() {
	Description("選択肢の中からユーザーが選んだと思われるものを返す")
	Attributes(func() {
		Attribute("selects", ArrayOf(String), "選択肢", func() {
			Example([]string{
				"ドキュメント管理",
				"ラブちゃん情報",
				"スケジュール管理",
				"障害対策",
			})
		})
		Attribute("input", String, "ユーザーの入力", func() {
			Default("")
			Example("障害対策をしたい")
		})
		Attribute("answer", String, "ユーザーの入力", func() {
			Default("")
			Example("障害対策")
		})
	})
	Required(
		"selects",
		"input",
		"answer",
	)
	View("default", func() {
		Attribute("selects")
		Attribute("input")
		Attribute("answer")
		Required(
			"selects",
			"input",
			"answer",
		)
	})
})

var SpeechType = MediaType("application/vnd.speechType+json", func() {
	Description(`受け取った音声データからテキストに起こす
curl  -F 'uploadfile=@./output.wav'  -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/talks/speech'`)
	Attributes(func() {
		Attribute("text", String, "文字起こし", func() {
			Example("こんにちは")
		})
		Attribute("confidence", String, "信頼性", func() {
			Example("0.3")
		})
	})
	Required(
		"text",
		"confidence",
	)
	View("default", func() {
		Attribute("text")
		Attribute("confidence")
		Required(
			"text",
			"confidence",
		)
	})
})
