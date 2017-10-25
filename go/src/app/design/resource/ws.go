package resource

import (
	. "app/design/constant"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("websocket", func() {
	Action("websocket", func() {
		Description("websocket配信")
		Routing(GET("/ws"))
		UseTrait(GeneralUserTrait)
		Response(SwitchingProtocols)
	})
})
