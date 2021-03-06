package resource

import (
	. "app/design/constant"
	"app/design/media"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("analytic", func() {
	BasePath("/api/analytic")
	Action("ShowGraphBar", func() {
		Description("感情分析データ(棒グラフ)")
		Routing(
			GET("graph/bar"),
		)
		Response(OK, CollectionOf(media.GraphBarType))
		UseTrait(GeneralUserTrait)
	})
	Action("ShowGraphPie", func() {
		Description("感情分析データ(円グラフ)")
		Routing(
			GET("graph/pie"),
		)
		Response(OK, CollectionOf(media.GraphPieType))
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
