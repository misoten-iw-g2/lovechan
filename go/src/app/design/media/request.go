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
	})
	Required(
		"id",
		"request",
	)
	View("default", func() {
		Attribute("id")
		Attribute("request")
		Required(
			"id",
			"request",
		)
	})
})
