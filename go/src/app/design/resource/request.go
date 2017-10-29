package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("requests", func() {
	BasePath("/requests")
	DefaultMedia(media.RequestType)
	Action("list", func() {
		Description("ラブちゃんが出来る動作一覧を取得する")
		Routing(
			GET(""),
		)
		Response(OK, CollectionOf(media.RequestType))
		UseTrait(GeneralUserTrait)
	})
	Action("request", func() {
		Description("ラブちゃんに動作をリクエストする")
		Routing(
			POST(""),
		)
		Payload(func() {
			Attribute("user_answer", String, "ユーザーからの回答", func() {
				MinLength(1)
				Example("踊って")
			})
			Required("user_answer")
		})
		Response(OK)
		UseTrait(GeneralUserTrait)
	})
})
