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
		Routing(GET(""))
		UseTrait(GeneralUserTrait)
		Response(SwitchingProtocols)
	})
})
