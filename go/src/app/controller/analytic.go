package controller

import (
	"app/app"

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

	// AnalyticController_ListUserAnswer: end_implement
	res := app.UseranswertypeCollection{}
	return ctx.OK(res)
}

// ShowGraphBar runs the ShowGraphBar action.
func (c *AnalyticController) ShowGraphBar(ctx *app.ShowGraphBarAnalyticContext) error {
	// AnalyticController_ShowGraphBar: start_implement

	// Put your logic here

	// AnalyticController_ShowGraphBar: end_implement
	res := &app.Graphbartype{}
	return ctx.OK(res)
}

// ShowGraphLine runs the ShowGraphLine action.
func (c *AnalyticController) ShowGraphLine(ctx *app.ShowGraphLineAnalyticContext) error {
	// AnalyticController_ShowGraphLine: start_implement

	// Put your logic here

	// AnalyticController_ShowGraphLine: end_implement
	res := &app.Graphlinetype{}
	return ctx.OK(res)
}

// ShowGraphPie runs the ShowGraphPie action.
func (c *AnalyticController) ShowGraphPie(ctx *app.ShowGraphPieAnalyticContext) error {
	// AnalyticController_ShowGraphPie: start_implement

	// Put your logic here

	// AnalyticController_ShowGraphPie: end_implement
	res := &app.Graphpietype{}
	return ctx.OK(res)
}
