package resource

import (
	. "app/design/constant"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("batch", func() {
	BasePath("/api/batch")
	Action("createVoices", func() {
		Description("必要な音声データを作成すｒ")
		Routing(
			POST("voices"),
		)
		Params(func() {
			Param("is_overwrite", Boolean, func() {
				Example(false)
				Default(false)
			})
			Required("is_overwrite")
		})
		Response(OK)
		UseTrait(GeneralUserTrait)
	})
})
