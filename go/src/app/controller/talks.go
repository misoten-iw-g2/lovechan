package controller

import (
	"app/app"
	"app/model"
	"app/mywebsocket"
	"fmt"

	"github.com/goadesign/goa"
	"github.com/texttheater/golang-levenshtein/levenshtein"
)

// TalksController implements the talks resource.
type TalksController struct {
	*goa.Controller
	ws *mywebsocket.Server
}

// NewTalksController creates a talks controller.
func NewTalksController(service *goa.Service, ws *mywebsocket.Server) *TalksController {
	return &TalksController{
		Controller: service.NewController("TalksController"),
		ws:         ws,
	}
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
		return ctx.BadRequest(goa.ErrBadRequest(err))
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
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	goa.LogInfo(ctx, "score", "score", t)

	res := app.Routingtype{}
	basePath := ""
	switch ctx.CurrentPage {
	case conversations:
		isReturn, _ := model.IsReturn(t)
		if isReturn {
			return ctx.Accepted(model.NewRoutingType("/", t))
		}
		routings := []string{requests, questions}
		routingChoices := []string{"何かお願いする,なにかおねがいする", "質問してもらう,しつもんしてもらう"}
		i, err := model.UserChoiceAnswer(routingChoices, t)
		if err != nil {
			return ctx.BadRequest(goa.ErrBadRequest(err))
		}
		res.NextPage = fmt.Sprintf("%s/%s", basePath, routings[i])
	case root:
		// もしラヴちゃんを起こすアクションの場合は、ルーティングを変更しない
		wakeupVideo, isWakeup := wakeupTalk(t)
		if isWakeup {
			c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, wakeupVideo)
			res.UserVoiceText = t
			return ctx.OK(&res)
		}
		routings := []string{conversations, stories}
		routingChoices := []string{"話す,はなす", "ストーリー,すとーりー"}
		i, err := model.UserChoiceAnswer(routingChoices, t)
		if err != nil {
			return ctx.BadRequest(goa.ErrBadRequest(err))
		}
		res.NextPage = fmt.Sprintf("%s/%s", basePath, routings[i])
	}
	res.UserVoiceText = t
	c.ws.Send(mywebsocket.WsSoundChannel, mywebsocket.WsSelectionSound, mywebsocket.VideoChange{})

	// TalksController_ShowRouting: end_implement
	return ctx.OK(&res)
}

var wakeupTalks = []mywebsocket.VideoChange{
	{VideoFileName: "wakeup-1.mp4", VoiceFileName: "wakeup-1.wav"},
	{VideoFileName: "wakeup-2.mp4", VoiceFileName: "wakeup-2.wav"},
	{VideoFileName: "wakeup-3.mp4", VoiceFileName: "wakeup-3.wav"},
}

// ラブちゃんとしているのは、SpeechAPIがおそらくラヴちゃんと変換しないため
var wakeupWords = []string{"ラブちゃん起きて,ラブちゃんおきて", "いま寝てたでしょ,いまねてたでしょ", "審査だからちゃんとして,しんさだからちゃんとして"}

// WakeupTalk 戻りたいというワードが入力されたか判定する
func wakeupTalk(userAnswer string) (mywebsocket.VideoChange, bool) {
	i, err := model.UserChoiceAnswer(wakeupWords, userAnswer)
	if err != nil {
		return mywebsocket.VideoChange{}, false
	}
	return wakeupTalks[i], true
}
