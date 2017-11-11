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
		Description(`音声ファイルを投げて、その音声の文字起こしを返す<br>
curl -F 'uploadfile=@./output.wav'  -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/talks/speech'`)
		Routing(
			POST("/speech"),
		)
		Response(OK, media.SpeechType)
		UseTrait(GeneralUserTrait)
	})
	Action("ShowRouting", func() {
		Description(`音声ファイルからテキストに起こして、次の画面情報を返す<br>
・root 最初の画面<br>
-> stories ストーリー で選択される<br>
-> conversations 話す で選択される<br>
<br>
・conversations 対話画面<br>
-> requests お願いする で選択される<br>
-> questions 質問してもらう で選択される<br>
<br>
curl -F 'uploadfile=@./output.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/talks/routings/conversations'`)
		Routing(
			POST("/routings/:current_page"),
		)
		Params(func() {
			Param("current_page", String, "現在のページ `/`は使えないので、rootとする", func() {
				Enum(
					"root",
					"conversations",
				)
				Default("root")
			})
			Required(
				"current_page",
			)
		})
		Response(OK, media.RoutingType)
		UseTrait(GeneralUserTrait)
	})
})
