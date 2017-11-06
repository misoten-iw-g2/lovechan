package media

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var StoryType = MediaType("application/vnd.storyType+json", func() {
	Description("ストーリー")
	Attributes(func() {
		Attribute("next_step", Integer, "次のストーリー", func() {
			Example(2)
		})
		Attribute("answer", String, "現在のステップの正解", func() {
			Example("エラーが出ている")
		})
		Attribute("choices", ArrayOf(String), "選択肢", func() {
			Example([]string{"みんなに聞く", "調べる"})
		})
		Attribute("question", String, "ラブちゃんからの質問", func() {
			Example("どんな画面が出てますか？")
		})
		Attribute("story_pattern", String, `ストーリーの進行パターン<br>
			hint: 障害のヒント<br>
			find: 必要な情報を探し出す<br>
			call: 誰かを呼ぶ<br>
			listen: みんなのラヴちゃんに聞いてみる
			`, func() {
			Enum(
				"hint",
				"find",
				"call",
				"listen",
				"non",
			)
			Example("hint")
			Default("non")
		})
		Attribute("is_clear", Boolean, "クリアしたか", func() {
			Default(false)
		})
	})
	Required(
		"next_step",
		"answer",
		"choices",
		"question",
		"story_pattern",
		"is_clear",
	)
	View("default", func() {
		Attribute("next_step")
		Attribute("answer")
		Attribute("choices")
		Attribute("question")
		Attribute("story_pattern")
		Attribute("is_clear")
		Required(
			"next_step",
			"answer",
			"choices",
			"question",
			"story_pattern",
			"is_clear",
		)
	})
})
