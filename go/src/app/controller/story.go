package controller

import (
	"app/app"
	"app/model"
	"app/mywebsocket"
	"context"
	"fmt"

	"github.com/goadesign/goa"
)

// StoryController implements the story resource.
type StoryController struct {
	*goa.Controller
	ws *mywebsocket.Server
}

// NewStoryController creates a story controller.
func NewStoryController(service *goa.Service, ws *mywebsocket.Server) *StoryController {
	return &StoryController{
		Controller: service.NewController("StoryController"),
		ws:         ws,
	}
}

const (
	// 障害のヒントを探してほしい
	hintPattern = "hint"
	// 必要な情報を探し出す
	findPattern = "find"
	// 担当者を呼ぶ
	callPattern = "call"
	// みんなにラブちゃんを聞く
	listenPattern = "listen"
)

const (
	wsCollect = "wsCollect"
	wsMiss    = "wsMiss"
)

// Story runs the story action.
func (c *StoryController) Story(ctx *app.StoryStoryContext) error {
	// StoryController_Story: start_implement

	// Put your logic here
	now := ctx.Payload.NowStep
	userAnswer := ctx.Payload.UserAnswer
	res := app.Storytype{}
	switch ctx.Payload.StoryPattern {
	case hintPattern:
		r, err := hintPatternStory(ctx, userAnswer, now)
		v := mywebsocket.VideoChange{
			VideoFileName: "naruhodo.mp4",
			VoiceFileName: "",
		}
		// 再度質問し直しの発生
		goa.LogInfo(ctx, "err", "err", err)
		if err != nil {
			v.VideoFileName = "situmon.mp4"
		}
		res = r
		c.ws.Send(mywebsocket.WsChannel, wsCollect, v)
	case findPattern:
		r, err := findPatternStory(ctx, userAnswer, now)
		if err != nil {
			return goa.ErrBadRequest(err)
		}
		res = r
	case callPattern:
		r, err := callPatternStory(ctx, userAnswer, now)
		if err != nil {
			return goa.ErrBadRequest(err)
		}
		res = r
	case listenPattern:
		r, err := listenPatternStory(ctx, userAnswer, now)
		if err != nil {
			return goa.ErrBadRequest(err)
		}
		res = r
	default:
	}
	goa.LogInfo(ctx, "request now: now", "now", now)
	goa.LogInfo(ctx, "request user_answer: user_answer", "user_answer", userAnswer)
	// StoryController_Story: end_implement
	return ctx.OK(&res)
}

func hintPatternStory(ctx context.Context, userAnswer string, now int) (app.Storytype, error) {
	s := app.Storytype{}

	// ストーリーに使う選択肢
	cd1 := []string{"エラーが出てる", "何もしてないけど壊れた", "画面が映らない", "インターネットに繋がらない"}
	c1 := []string{
		"エラーが出てる,えらーがでてる",
		"何もしてないけど壊れた,なにもしてないけどこわれた",
		"画面が映らない,がめんがうつらない",
		"インターネットに繋がらない,いんたーねっとにつならがない",
	}
	cd2 := []string{"417", "114", "514", "1919"}
	cd3 := []string{"はい", "いいえ"}

	// ストーリ設定
	s.StoryPattern = hintPattern

	if now == 1 {
		s.Question = "画面に何か出てますか？"
		s.Choices = cd1
		s.NextStep = 2
		s.Answer = cd1[0]
		return s, nil
	}
	if now == 2 {
		userChoices, err := model.UserChoiceAnswer(c1, userAnswer)
		if err != nil || cd1[userChoices] != cd1[0] {
			// TODO WebSocketで間違っていると伝える
			s.Question = "画面に何か出てますか？"
			s.Choices = cd1
			s.NextStep = 2
			s.Answer = cd1[0]
			return s, err
		}
		s.Question = "エラーコードを教えてください"
		s.Choices = cd2
		s.NextStep = 3
		s.Answer = cd2[1]
		return s, nil
	}
	if now == 3 {
		userChoices, err := model.UserChoiceAnswer(cd2, userAnswer)
		if err != nil || cd2[userChoices] != cd2[1] {
			// TODO WebSocketで間違っていると伝える
			s.Question = "エラーコードを教えてください"
			s.Choices = cd2
			s.NextStep = 3
			s.Answer = cd2[1]
			return s, err
		}
		s.Question = "担当者を呼びますか？"
		s.Choices = cd3
		s.NextStep = 4
		s.Answer = cd3[0]
		return s, nil
	}
	if now == 4 {
		userChoices, err := model.UserChoiceAnswer(cd3, userAnswer)
		if err != nil || cd3[userChoices] != cd3[0] {
			// TODO WebSocketで間違っていると伝える
			s.Question = "同期さんが詳しいようです呼びますか？"
			s.Choices = cd3
			s.NextStep = 4
			s.Answer = cd3[0]
		}
		s.Question = "ストーリークリア"
		s.IsClear = true
		return s, err
	}
	return s, fmt.Errorf("存在しないステップが選択されています")
}

func findPatternStory(ctx context.Context, userAnswer string, now int) (app.Storytype, error) {
	return app.Storytype{}, nil
}

func callPatternStory(ctx context.Context, userAnswer string, now int) (app.Storytype, error) {
	return app.Storytype{}, nil
}

func listenPatternStory(ctx context.Context, userAnswer string, now int) (app.Storytype, error) {
	return app.Storytype{}, nil
}
