package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("analytic", func() {
	BasePath("/api/analytic")
	Action("ShowGraphLine", func() {
		Description("感情分析データ(波線グラフ)")
		Routing(
			GET("graph/line"),
		)
		Response(OK, media.GraphLineType)
		UseTrait(GeneralUserTrait)
	})
	Action("ShowGraphPie", func() {
		Description("感情分析データ(円グラフ)")
		Routing(
			GET("graph/pie"),
		)
		Response(OK, media.GraphPieType)
		UseTrait(GeneralUserTrait)
	})
	Action("ShowGraphBar", func() {
		Description("感情分析データ(棒グラフ)")
		Routing(
			GET("graph/bar"),
		)
		Response(OK, media.GraphBarType)
		UseTrait(GeneralUserTrait)
	})
	Action("ListUserAnswer", func() {
		Description("感情分析データ(時系列)")
		Routing(
			GET("user_answer"),
		)
		Response(OK, CollectionOf(media.UserAnswerType))
		UseTrait(GeneralUserTrait)
	})
})
