package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("talks", func() {
	DefaultMedia(media.SelectType)
	BasePath("/talks")
	Action("select", func() {
		Description("与えられた選択肢の中で、ユーザーが選択したと思われる選択肢を返す")
		Routing(
			POST("/select"),
		)
		Payload(func() {
			Attribute("selects")
			Attribute("input")
			Required(
				"selects",
				"input",
			)
		})
		Response(OK)
		UseTrait(GeneralUserTrait)
	})
})
