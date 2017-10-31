package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("story", func() {
	BasePath("/api/story")
	DefaultMedia(media.StoryType)
	Action("story", func() {
		Description("ストーリー")
		Routing(
			POST(""),
		)
		Payload(func() {
			Attribute("now_step", Integer, func() {
				Example(1)
				Default(1)
			})
			Attribute("story_pattern")
			Attribute("user_answer", String, func() {
				Example("障害のヒントを知りたい")
			})
			Required("now_step", "story_pattern", "user_answer")
		})
		Response(OK)
		UseTrait(GeneralUserTrait)
	})
})
