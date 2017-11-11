package controller

import (
	"app/app"
	"app/model"
	"fmt"

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

// Speech runs the Speech action.
func (c *TalksController) Speech(ctx *app.SpeechTalksContext) error {
	// TalksController_Speech: start_implement

	// Put your logic here
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return goa.ErrInternal(err)
	}

	// TalksController_Speech: end_implement
	res := &app.Speechtype{}
	res.Text = t
	return ctx.OK(res)
}

const (
	root          = "root"
	conversations = "conversations"
	stories       = "stories"
	requests      = "requests"
	questions     = "questions"
)

// ShowRouting runs the ShowRouting action.
func (c *TalksController) ShowRouting(ctx *app.ShowRoutingTalksContext) error {
	// TalksController_ShowRouting: start_implement

	// Put your logic here
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return goa.ErrInternal(err)
	}
	goa.LogInfo(ctx, "score", "score", t)

	res := app.Routingtype{}
	basePath := "/api"
	switch ctx.CurrentPage {
	case conversations:
		routings := []string{requests, questions}
		routingChoices := []string{"何かお願いする,なにかおねがいする", "質問してもらう,しつもんしてもらう"}
		i, err := model.UserChoiceAnswer(routingChoices, t)
		if err != nil {
			return goa.ErrBadRequest(err)
		}
		res.NextPage = fmt.Sprintf("%s/%s", basePath, routings[i])
	case root:
		routings := []string{conversations, stories}
		routingChoices := []string{"話す,はなす", "ストーリー,すとーりー"}
		i, err := model.UserChoiceAnswer(routingChoices, t)
		if err != nil {
			return goa.ErrBadRequest(err)
		}
		res.NextPage = fmt.Sprintf("%s/%s", basePath, routings[i])
	}
	res.UserVoiceText = t

	// TalksController_ShowRouting: end_implement
	return ctx.OK(&res)
}
