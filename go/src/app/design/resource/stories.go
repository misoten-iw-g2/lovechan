package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("stories", func() {
	BasePath("/api/stories")
	DefaultMedia(media.StoryType)
	Action("PlayStory", func() {
		Description(`ストーリーを選択し、プレイをする<br>
curl -F 'uploadfile=@./sampleVoice/story-selectpattern-hint-2.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/stories/suddenly/2'`)
		Routing(
			POST("/:story_pattern/:now_step"),
		)
		Params(func() {
			Param("now_step", Integer, func() {
				Example(1)
				Default(1)
			})
			Param("story_pattern", String, func() {
				Enum("suddenly", "change", "")
				Default("")
			})
			Required("now_step", "story_pattern")
		})
		Response(OK)
		Response(UnprocessableEntity, ErrorMedia)
		Response(MovedPermanently)
		UseTrait(GeneralUserTrait)
	})
	Action("SelectStory", func() {
		Description(`どのストーリーで遊ぶか選択する。選択肢は固定なので、フロント側で選択肢だけ描画しておく。<br>
・突然のエラー<br>
・何か考える(仮)<br>
curl -F 'uploadfile=@./sampleVoice/story-select-err.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/stories'`)
		Routing(
			POST(""),
		)
		Response(OK)
		Response(UnprocessableEntity, ErrorMedia)
		Response(MovedPermanently)
		UseTrait(GeneralUserTrait)
	})
})
