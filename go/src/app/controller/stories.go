package controller

import (
	"app/app"
	"app/model"
	"app/mywebsocket"
	"context"
	"errors"
	"fmt"

	"github.com/goadesign/goa"
)

const (
	// 突然のエラー
	suddenlyPattern = "suddenly"
	// 何か考える
	aboutPattern = "about"
)

const (
	wsCollect = "wsCollect"
	wsMiss    = "wsMiss"
)

var (
	// ErrMissChoice 一致している選択がない場合のエラー
	ErrMissChoice = errors.New("誤った選択肢が選択されたました")
	// ErrNotFoundStep 存在しない選択肢が選ばれた場合のエラー
	ErrNotFoundStep = errors.New("存在しないステップが選択されています")
	// ErrUnprocessableEntity 選択肢に存在するが、間違いを選択している場合のエラー
	ErrUnprocessableEntity = goa.NewErrorClass("unprocessable_entity", 422)
)

// StoriesController implements the story resource.
type StoriesController struct {
	*goa.Controller
	ws *mywebsocket.Server
}

// NewStoriesController creates a stories controller.
func NewStoriesController(service *goa.Service, ws *mywebsocket.Server) *StoriesController {
	return &StoriesController{
		Controller: service.NewController("StoriesController"),
		ws:         ws,
	}
}

// PlayStory runs the PlayStory action.
func (c *StoriesController) PlayStory(ctx *app.PlayStoryStoriesContext) error {
	// StoriesController_PlayStory: start_implement

	// Put your logic here
	now := ctx.NowStep
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	isReturn, _ := model.IsReturn(t)
	if isReturn {
		ctx.ResponseData.Header().Set("Location", "/")
		return ctx.MovedPermanently()
	}
	res := app.Storytype{}
	switch ctx.StoryPattern {
	case suddenlyPattern:
		res, err = suddenlyPatternStory(ctx, t, now)
	default:
	}
	res.URL = fmt.Sprintf("/api/stories/%s/%d", res.StoryPattern, res.NextStep)
	res.UserVoiceText = t
	goa.LogInfo(ctx, "request now: now", "now", now)
	goa.LogInfo(ctx, "request user_answer: user_answer", "user_answer", t)
	if err != nil && err == model.ErrNotFoundChoice {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	if err != nil && err == ErrNotFoundStep {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	if err != nil && err == ErrMissChoice {
		return ctx.UnprocessableEntity(ErrUnprocessableEntity(err))
	}
	if err != nil {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	// StoriesController_PlayStory: end_implement
	return ctx.OK(&res)
}

// SelectStory runs the SelectStory action.
func (c *StoriesController) SelectStory(ctx *app.SelectStoryStoriesContext) error {
	// StoriesController_SelectStory: start_implement

	// Put your logic here
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return goa.ErrBadRequest(err)
	}
	isReturn, _ := model.IsReturn(t)
	if isReturn {
		ctx.ResponseData.Header().Set("Location", "/")
		return ctx.MovedPermanently()
	}
	storiesDisplay := []string{suddenlyPattern, aboutPattern}
	stories := []string{"突然のエラー,とつぜんのエラー", "何か考える"}
	i, err := model.UserChoiceAnswer(stories, t)
	if err != nil {
		return goa.ErrBadRequest(err)
	}
	res := app.Storytype{}
	switch storiesDisplay[i] {
	case suddenlyPattern:
		r, err := suddenlyPatternStory(ctx, t, 1)
		v := mywebsocket.VideoChange{
			VideoFileName: "",
			VoiceFileName: "",
		}
		// 再度質問し直しの発生
		goa.LogInfo(ctx, "err", "err", err)
		if err != nil {
			v.VideoFileName = "please_choose.mp4"
		}
		res = r
		c.ws.Send(mywebsocket.WsChannel, wsCollect, v)
	default:
	}
	res.URL = fmt.Sprintf("/api/stories/%s/%d", res.StoryPattern, res.NextStep)
	res.UserVoiceText = t

	// StoriesController_SelectStory: end_implement
	return ctx.OK(&res)
}

func suddenlyPatternStory(ctx context.Context, t string, now int) (app.Storytype, error) {
	s := app.Storytype{}

	// ストーリーに使う選択肢
	cd1 := []string{"エラーが<br />出てる", "勝手に<br />壊れた", "画面が<br />映らない", "ネットに<br />繋がらない"}
	c1 := []string{
		"エラーが出てる,えらーがでてる",
		"勝手に壊れた,かってにこわれた",
		"画面が映らない,がめんがうつらない",
		"ネットに繋がらない,ねっとにつならがない",
	}
	cd2 := []string{"417", "114", "514", "1919"}
	cd3 := []string{"はい", "いいえ"}

	// ストーリ設定
	s.StoryPattern = suddenlyPattern

	if now == 1 {
		s.Question = "画面に何か出てますか？"
		s.Choices = cd1
		s.NextStep = 2
		s.Answer = cd1[0]
		return s, nil
	}
	if now == 2 {
		userChoices, err := model.UserChoiceAnswer(c1, t)
		if err != nil {
			goa.LogError(ctx, "suddenlyPatternStory 1: err", "err", err)
			return app.Storytype{}, err
		}
		if cd1[userChoices] != cd1[0] {
			goa.LogError(ctx, "suddenlyPatternStory 2: err", "err", ErrMissChoice)
			return app.Storytype{}, ErrMissChoice
		}
		s.Question = "エラーコードを教えてください"
		s.Choices = cd2
		s.NextStep = 3
		s.Answer = cd2[1]
		return s, nil
	}
	if now == 3 {
		userChoices, err := model.UserChoiceAnswer(cd2, t)
		if err != nil {
			goa.LogError(ctx, "suddenlyPatternStory 3: err", "err", err)
			return app.Storytype{}, err
		}
		if cd2[userChoices] != cd2[1] {
			goa.LogError(ctx, "suddenlyPatternStory 4: err", "err", ErrMissChoice)
			return s, ErrMissChoice
		}
		s.Question = "担当者を呼びますか？"
		s.Choices = cd3
		s.NextStep = 4
		s.Answer = cd3[0]
		return s, nil
	}
	if now == 4 {
		userChoices, err := model.UserChoiceAnswer(cd3, t)
		if err != nil {
			goa.LogError(ctx, "suddenlyPatternStory 5: err", "err", err)
			return app.Storytype{}, err
		}
		if cd3[userChoices] != cd3[0] {
			goa.LogError(ctx, "suddenlyPatternStory 6: err", "err", ErrMissChoice)
			return s, ErrMissChoice
		}
		s.Question = "ストーリークリア"
		s.IsClear = true
		return s, nil
	}
	return s, ErrNotFoundStep
}
