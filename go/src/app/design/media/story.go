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
			suddenly: 障害のヒント<br>
			non: 選択なし
			`, func() {
			Enum(
				"suddenly",
				"non",
			)
			Example("suddenly")
			Default("non")
		})
		Attribute("is_clear", Boolean, "クリアしたか", func() {
			Default(false)
		})
		Attribute("url", String, "次投げるべきURL", func() {
			Example("/api/stories/hint/2")
		})
		Attribute("user_voice_text", String, "発言の文字起こし", func() {
			Example("こんにちは")
			Default("")
		})
	})
	Required(
		"next_step",
		"answer",
		"choices",
		"question",
		"story_pattern",
		"is_clear",
		"url",
		"user_voice_text",
	)
	View("default", func() {
		Attribute("next_step")
		Attribute("answer")
		Attribute("choices")
		Attribute("question")
		Attribute("story_pattern")
		Attribute("is_clear")
		Attribute("url")
		Attribute("user_voice_text")
		Required(
			"next_step",
			"answer",
			"choices",
			"question",
			"story_pattern",
			"is_clear",
			"url",
			"user_voice_text",
		)
	})
})
