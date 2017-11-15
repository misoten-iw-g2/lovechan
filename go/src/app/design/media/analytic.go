package media

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var GraphPieType = MediaType("application/vnd.graphPieType+json", func() {
	Description("円グラフ")
	Attributes(func() {
		Attribute("emotion", Integer, "感情", func() {
			Example(1)
		})
		Attribute("percent", Number, "割合", func() {
			Example(1.2)
		})
	})
	Required(
		"emotion",
		"percent",
	)
	View("default", func() {
		Attribute("emotion")
		Attribute("percent")
		Required(
			"emotion",
			"percent",
		)
	})
})

var GraphBarType = MediaType("application/vnd.graphBarType+json", func() {
	Description("棒グラフ")
	Attributes(func() {
		Attribute("date", String, "date", func() {
			Example("2016-10-10")
		})
		Attribute("count", ArrayOf(Integer), "count", func() {
			Example([]int{1, 3, 5})
		})
	})
	Required(
		"date",
		"count",
	)
	View("default", func() {
		Attribute("date")
		Attribute("count")
		Required(
			"date",
			"count",
		)
	})
})

var UserAnswerType = MediaType("application/vnd.userAnswerType+json", func() {
	Description("ユーザー回答感情分析")
	Attributes(func() {
		Attribute("id", Integer, "id", func() {
			Example(1)
		})
		Attribute("question", String, "質問", func() {
			Example("体調どうですか？")
		})
		Attribute("answer", String, "ユーザーの回答", func() {
			Example("とても元気です")
		})
		Attribute("score", Number, "感情スコア", func() {
			Example(1.2)
		})
		Attribute("question_id", Integer, "質問ID", func() {
			Example(1)
		})
		Attribute("created_at", DateTime, "作成日時")
	})
	Required(
		"id",
		"question",
		"answer",
		"score",
		"question_id",
		"created_at",
	)
	View("default", func() {
		Attribute("id")
		Attribute("question")
		Attribute("answer")
		Attribute("score")
		Attribute("question_id")
		Attribute("created_at")
		Required(
			"id",
			"question",
			"answer",
			"score",
			"question_id",
			"created_at",
		)
	})
})
