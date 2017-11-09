package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("talks", func() {
	BasePath("/api/talks")
	Action("Select", func() {
		Description("与えられた選択肢の中で、ユーザーが選択したと思われる選択肢を返す")
		Routing(
			POST("/select"),
		)
		Payload(func() {
			Attribute("selects", ArrayOf(String), "選択肢", func() {
				Example([]string{
					"ドキュメント管理",
					"ラブちゃん情報",
					"スケジュール管理",
					"障害対策",
				})
			})
			Attribute("input", String, "ユーザーの入力", func() {
				Default("")
				Example("障害対策をしたい")
			})
			Required(
				"selects",
				"input",
			)
		})
		Response(OK, media.SelectType)
		UseTrait(GeneralUserTrait)
	})

	Action("Speech", func() {
		Description("音声ファイルを投げて、その音声の文字起こしを返す")
		Routing(
			POST("/speech"),
		)
		Response(OK, media.SpeechType)
		UseTrait(GeneralUserTrait)
	})
})
