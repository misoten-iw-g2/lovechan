package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("questions", func() {
	BasePath("/questions")
	Action("questions", func() {
		Description("ラブちゃんから質問をする")
		Routing(
			POST(""),
		)
		Response(OK, media.QuestionType)
		UseTrait(GeneralUserTrait)
	})
	Action("answers", func() {
		Description("ラブちゃんからの質問に回答する")
		Routing(
			POST("/:id/answers"),
		)
		Params(func() {
			Attribute("id", Integer, "id", func() {
				Example(1)
			})
		})
		Payload(func() {
			Attribute("user_answer", String, "ユーザーからの回答", func() {
				MinLength(1)
				Example("今日はしんどい")
			})
			Required("user_answer")
		})
		Response(OK, media.AnswerType)
		UseTrait(GeneralUserTrait)
	})
})
