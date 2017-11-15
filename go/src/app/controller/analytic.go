package controller

import (
	"app/app"
	"app/model"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// AnalyticController implements the analytic resource.
type AnalyticController struct {
	*goa.Controller
	db *sqlx.DB
}

// NewAnalyticController creates a analytic controller.
func NewAnalyticController(service *goa.Service, db *sqlx.DB) *AnalyticController {
	return &AnalyticController{
		Controller: service.NewController("AnalyticController"),
		db:         db,
	}
}

// ListUserAnswer runs the ListUserAnswer action.
func (c *AnalyticController) ListUserAnswer(ctx *app.ListUserAnswerAnalyticContext) error {
	// AnalyticController_ListUserAnswer: start_implement

	// Put your logic here
	uaDB := model.NewUserAnswersDB(c.db)
	ua, err := uaDB.GetList(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	var res []*app.Useranswertype
	for _, v := range ua {
		res = append(res, v.UserAnswerToUserAnswertypePtr())
	}
	// AnalyticController_ListUserAnswer: end_implement
	return ctx.OK(res)
}

// ShowGraphPie runs the ShowGraphPie action.
func (c *AnalyticController) ShowGraphPie(ctx *app.ShowGraphPieAnalyticContext) error {
	// AnalyticController_ShowGraphPie: start_implement

	// Put your logic here
	uaDB := model.NewUserAnswersDB(c.db)
	uas, err := uaDB.GetListEmotionRatio(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	var res []*app.Graphpietype
	for _, v := range uas {
		res = append(res, v.UserAnswerToGraphpietypePtr())
	}

	// AnalyticController_ShowGraphPie: end_implement
	return ctx.OK(res)
}

// ShowGraphBar runs the ShowGraphBar action.
func (c *AnalyticController) ShowGraphBar(ctx *app.ShowGraphBarAnalyticContext) error {
	// AnalyticController_ShowGraphBar: start_implement

	// Put your logic here
	// uaDB := model.NewUserAnswersDB(c.db)
	// uaes, err := uaDB.GetListGroupByEmotion(ctx)
	// if err != nil {
	// 	return goa.ErrInternal(err)
	// }
	var res []*app.Graphbartype
	// for _, v := range uaes {
	// 	res = append(res, v.UserAnswerToGraphpietypePtr())
	// }

	// AnalyticController_ShowGraphBar: end_implement
	return ctx.OK(res)
}
