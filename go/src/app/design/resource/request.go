package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("requests", func() {
	BasePath("/api/requests")
	DefaultMedia(media.RequestType)
	Action("list", func() {
		Description("ラヴちゃんが出来る動作一覧を取得する")
		Routing(
			GET(""),
		)
		Response(OK, CollectionOf(media.RequestType))
		UseTrait(GeneralUserTrait)
	})
	Action("request", func() {
		Description(`ラヴちゃんに動作をリクエストする
curl -F 'uploadfile=@./sampleVoice/request-ippatugei.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/requests'`)
		Routing(
			POST(""),
		)
		Response(OK, func() {
			Media(media.RequestType, "full")
		})
		UseTrait(GeneralUserTrait)
	})
})
