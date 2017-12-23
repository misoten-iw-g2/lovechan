package resource

import (
	. "app/design/constant"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("ws", func() {
	BasePath("/api/ws")
	Action("ws", func() {
		Description("websocket配信")
		Params(func() {
			Param("channel", String, "channel", func() {
				Enum("movie", "pie", "user_answer", "sound")
			})
			Required("channel")
		})
		Routing(GET(""))
		UseTrait(GeneralUserTrait)
		Response(SwitchingProtocols)
	})
})
