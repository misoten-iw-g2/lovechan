package media

import (
	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var GraphLineType = MediaType("application/vnd.graphLineType+json", func() {
	Description("波線グラフ")
	Attributes(func() {
		Attribute("score", Number, "感情スコア", func() {
			Example(1.2)
		})
	})
	Required(
		"score",
	)
	View("default", func() {
		Attribute("score")
		Required(
			"score",
		)
	})
})

var GraphPieType = MediaType("application/vnd.graphPieType+json", func() {
	Description("円グラフ")
	Attributes(func() {
		Attribute("emotion", Number, "感情", func() {
			Example(1.2)
		})
		Attribute("score", Number, "感情スコア", func() {
			Example(1.2)
		})
	})
	Required(
		"emotion",
		"score",
	)
	View("default", func() {
		Attribute("emotion")
		Attribute("score")
		Required(
			"emotion",
			"score",
		)
	})
})

var GraphBarType = MediaType("application/vnd.graphBarType+json", func() {
	Description("棒グラフ")
	Attributes(func() {
		Attribute("emotion", Number, "感情", func() {
			Example(1.2)
		})
		Attribute("score", Number, "感情スコア", func() {
			Example(1.2)
		})
		Attribute("date", String, "date", func() {
			Example("2016-10-10")
		})
	})
	Required(
		"emotion",
		"score",
		"date",
	)
	View("default", func() {
		Attribute("emotion")
		Attribute("score")
		Attribute("date")
		Required(
			"emotion",
			"score",
			"date",
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
