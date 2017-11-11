package media

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var RequestType = MediaType("application/vnd.requestType+json", func() {
	Description("ラブちゃんへのリクエスト")
	Attributes(func() {
		Attribute("id", Integer, "id", func() {
			Example(1)
		})
		Attribute("request", String, "リクエスト項目", func() {
			Default("踊って")
			Example("踊って")
		})
		Attribute("user_voice_text", String, "発言の文字起こし", func() {
			Example("こんにちは")
			Default("")
		})
	})
	Required(
		"id",
		"request",
		"user_voice_text",
	)
	View("default", func() {
		Attribute("id")
		Attribute("request")
		Required(
			"id",
			"request",
		)
	})
	View("full", func() {
		Attribute("id")
		Attribute("request")
		Attribute("user_voice_text")
		Required(
			"id",
			"request",
			"user_voice_text",
		)
	})
})
