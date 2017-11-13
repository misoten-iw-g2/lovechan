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
			Param("update_choice_answer", Boolean, func() {
				Example(false)
				Default(false)
			})
			Param("update_free_answer", Boolean, func() {
				Example(false)
				Default(false)
			})
			Param("update_question", Boolean, func() {
				Example(false)
				Default(false)
			})
			Required(
				"update_choice_asnwer",
				"update_free_answer",
				"update_question",
			)
		})
		Response(OK)
		UseTrait(GeneralUserTrait)
	})
})
