package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("questions", func() {
	BasePath("/api/questions")
	Action("questions", func() {
		Description("ラヴちゃんから質問をもらう")
		Routing(
			GET(""),
		)
		Response(OK, media.QuestionType)
		UseTrait(GeneralUserTrait)
	})
	Action("answers", func() {
		Description(`ラヴちゃんからの質問に回答する<br>
curl -F 'uploadfile=@./sampleVoice/questions-2-tanosii.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/questions/2/answers'`)
		Routing(
			POST("/:id/answers"),
		)
		Params(func() {
			Attribute("id", Integer, "id", func() {
				Example(1)
			})
		})
		Response(OK, media.AnswerType)
		Response(MovedPermanently)
		UseTrait(GeneralUserTrait)
	})
})
