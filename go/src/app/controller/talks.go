package controller

import (
	"app/app"

	"github.com/goadesign/goa"
	"github.com/texttheater/golang-levenshtein/levenshtein"
)

// TalksController implements the talks resource.
type TalksController struct {
	*goa.Controller
}

// NewTalksController creates a talks controller.
func NewTalksController(service *goa.Service) *TalksController {
	return &TalksController{Controller: service.NewController("TalksController")}
}

// Select runs the select action.
func (c *TalksController) Select(ctx *app.SelectTalksContext) error {
	// TalksController_Select: start_implement

	// Put your logic here
	topRateIndex := 0
	var topRate float64
	for k, v := range ctx.Payload.Selects {
		rate := levenshtein.RatioForStrings([]rune(v), []rune(ctx.Payload.Input), levenshtein.DefaultOptions)
		if rate > topRate {
			topRateIndex = k
		}
	}

	// TalksController_Select: end_implement
	res := &app.Selecttype{}
	res.Selects = ctx.Payload.Selects
	res.Input = ctx.Payload.Input
	res.Answer = ctx.Payload.Selects[topRateIndex]
	return ctx.OK(res)
}
