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
	// 使用変更
	changePattern = "change"
)

const (
	wsCollect = "wsCollect"
	wsMiss    = "wsMiss"
)

type storyInfo struct {
	resp          app.Storytype
	videoFileName string
	voiceFileName string
}

var (
	// ErrMissChoice 一致している選択がない場合のエラー
	ErrMissChoice = errors.New("incorrect choice")
	// ErrNotFoundStep 存在しない選択肢が選ばれた場合のエラー
	ErrNotFoundStep = errors.New("not found step")
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
	si := storyInfo{}
	switch ctx.StoryPattern {
	case suddenlyPattern:
		si, err = suddenlyPatternStory(ctx, t, now)
	case changePattern:
		si, err = changePatternStory(ctx, t, now)
	}
	goa.LogInfo(ctx, "request now: now", "now", now)
	goa.LogInfo(ctx, "request user_answer: user_answer", "user_answer", t)
	if err != nil && err == model.ErrNotFoundChoice {
		v := mywebsocket.VideoChange{
			VideoFileName: "once_again.mp4",
			VoiceFileName: "once_again.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	if err != nil && err == ErrNotFoundStep {
		v := mywebsocket.VideoChange{
			VideoFileName: "stories_question.mp4",
			VoiceFileName: "stories_question.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	if err != nil && err == ErrMissChoice {
		v := mywebsocket.VideoChange{
			VideoFileName: "stories_question.mp4",
			VoiceFileName: "stories_question.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.UnprocessableEntity(ErrUnprocessableEntity(err))
	}
	if err != nil {
		v := mywebsocket.VideoChange{
			VideoFileName: "stories_question.mp4",
			VoiceFileName: "stories_question.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	// StoriesController_PlayStory: end_implement
	res := si.resp
	res.URL = fmt.Sprintf("/api/stories/%s/%d", res.StoryPattern, res.NextStep)
	res.UserVoiceText = t
	v := mywebsocket.VideoChange{
		VideoFileName: si.videoFileName,
		VoiceFileName: si.voiceFileName,
	}
	c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
	return ctx.OK(&res)
}

// SelectStory runs the SelectStory action.
func (c *StoriesController) SelectStory(ctx *app.SelectStoryStoriesContext) error {
	// StoriesController_SelectStory: start_implement

	// Put your logic here
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	goa.LogInfo(ctx, "user_voice_text: t", "t", t)
	isReturn, _ := model.IsReturn(t)
	if isReturn {
		ctx.ResponseData.Header().Set("Location", "/")
		return ctx.MovedPermanently()
	}
	storiesDisplay := []string{suddenlyPattern, changePattern}
	stories := []string{"突然のエラー,とつぜんのエラー", "仕様変更,しようへんこう"}
	i, err := model.UserChoiceAnswer(stories, t)
	if err != nil {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	si := storyInfo{}
	switch storiesDisplay[i] {
	case suddenlyPattern:
		si, err = suddenlyPatternStory(ctx, t, 1)
	case changePattern:
		si, err = changePatternStory(ctx, t, 1)
	}
	if err != nil && err == model.ErrNotFoundChoice {
		v := mywebsocket.VideoChange{
			VideoFileName: "once_again.mp4",
			VoiceFileName: "once_again.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	if err != nil && err == ErrNotFoundStep {
		v := mywebsocket.VideoChange{
			VideoFileName: "stories_question.mp4",
			VoiceFileName: "stories_question.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	if err != nil && err == ErrMissChoice {
		v := mywebsocket.VideoChange{
			VideoFileName: "stories_question.mp4",
			VoiceFileName: "stories_question.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.UnprocessableEntity(ErrUnprocessableEntity(err))
	}
	if err != nil {
		v := mywebsocket.VideoChange{
			VideoFileName: "stories_question.mp4",
			VoiceFileName: "stories_question.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	// StoriesController_PlayStory: end_implement
	res := si.resp
	res.URL = fmt.Sprintf("/api/stories/%s/%d", res.StoryPattern, res.NextStep)
	res.UserVoiceText = t
	v := mywebsocket.VideoChange{
		VideoFileName: si.videoFileName,
		VoiceFileName: si.voiceFileName,
	}
	c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)

	// StoriesController_SelectStory: end_implement
	return ctx.OK(&res)
}
func changePatternStory(ctx context.Context, t string, now int) (storyInfo, error) {
	s := app.Storytype{}
	si := storyInfo{}
	s.StoryPattern = suddenlyPattern
	cd1 := []string{"詳しい人へ<br />のアポ", "勝手に<br />壊れた", "画面が<br />映らない", "ネットに<br />繋がらない"}
	c1 := []string{
		"詳しい人へのアポ,くわしいひとへのあぽ",
		"勝手に壊れた,かってにこわれた",
		"画面が映らない,がめんがうつらない",
		"ネットに繋がらない,ねっとにつならがない",
	}
	cd2 := []string{"114", "3327", "3639", "223"}
	cd3 := []string{"はい", "いいえ"}
	switch now {
	case 1:
		s.Question = "何かお困りですか？"
		s.Choices = cd1
		s.NextStep = 2
		s.Answer = cd1[0]
		si.resp = s
		si.videoFileName = "stories_change_1.mp4"
		si.voiceFileName = "stories_change_1.wav"
		return si, nil
	case 2:
		userChoices, err := model.UserChoiceAnswer(c1, t)
		if err != nil {
			goa.LogError(ctx, "changePatternStory 1: err", "err", err)
			return storyInfo{}, err
		}
		if cd1[userChoices] != cd1[0] {
			goa.LogError(ctx, "changePatternStory 2: err", "err", ErrMissChoice)
			return storyInfo{}, ErrMissChoice
		}
		s.Question = "プロジェクトIDを教えてください"
		s.Choices = cd2
		s.NextStep = 3
		s.Answer = cd2[0]
		si.resp = s
		si.videoFileName = "stories_change_2.mp4"
		si.voiceFileName = "stories_change_2.wav"
		return si, nil
	case 3:
		userChoices, err := model.UserChoiceAnswer(cd2, t)
		if err != nil {
			goa.LogError(ctx, "changePatternStory 3: err", "err", err)
			return storyInfo{}, err
		}
		if cd2[userChoices] != cd2[0] {
			goa.LogError(ctx, "changePatternStory 4: err", "err", ErrMissChoice)
			return storyInfo{}, ErrMissChoice
		}
		s.Question = "同期さんが詳しいようです。呼びますか？"
		s.Choices = cd3
		s.NextStep = 4
		s.Answer = cd3[0]
		si.resp = s
		si.videoFileName = "stories_change_3.mp4"
		si.voiceFileName = "stories_change_3.wav"
		return si, nil
	case 4:
		userChoices, err := model.UserChoiceAnswer(cd3, t)
		if err != nil {
			goa.LogError(ctx, "changePatternStory 5: err", "err", err)
			return storyInfo{}, err
		}
		if cd3[userChoices] != cd3[0] {
			goa.LogError(ctx, "changePatternStory 6: err", "err", ErrMissChoice)
			return storyInfo{}, ErrMissChoice
		}
		s.Question = "ストーリークリア"
		s.IsClear = true
		si.resp = s
		si.videoFileName = "stories_change_4.mp4"
		si.voiceFileName = "stories_change_4.wav"
		return si, nil
	default:
		return storyInfo{}, ErrNotFoundStep
	}
}

func suddenlyPatternStory(ctx context.Context, t string, now int) (storyInfo, error) {
	s := app.Storytype{}
	si := storyInfo{}
	s.StoryPattern = changePattern

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

	switch now {
	case 1:
		s.Question = "画面に何か出てますか？"
		s.Choices = cd1
		s.NextStep = 2
		s.Answer = cd1[0]
		si.resp = s
		si.videoFileName = "stories_suddenly_1.mp4"
		si.voiceFileName = "stories_suddenly_1.wav"
		return si, nil
	case 2:
		userChoices, err := model.UserChoiceAnswer(c1, t)
		if err != nil {
			goa.LogError(ctx, "suddenlyPatternStory 1: err", "err", err)
			return storyInfo{}, err
		}
		if cd1[userChoices] != cd1[0] {
			goa.LogError(ctx, "suddenlyPatternStory 2: err", "err", ErrMissChoice)
			return storyInfo{}, ErrMissChoice
		}
		s.Question = "エラーコードを教えてください"
		s.Choices = cd2
		s.NextStep = 3
		s.Answer = cd2[1]
		si.resp = s
		si.videoFileName = "stories_suddenly_2.mp4"
		si.voiceFileName = "stories_suddenly_2.wav"
		return si, nil
	case 3:
		userChoices, err := model.UserChoiceAnswer(cd2, t)
		if err != nil {
			goa.LogError(ctx, "suddenlyPatternStory 3: err", "err", err)
			return storyInfo{}, err
		}
		if cd2[userChoices] != cd2[1] {
			goa.LogError(ctx, "suddenlyPatternStory 4: err", "err", ErrMissChoice)
			return storyInfo{}, ErrMissChoice
		}
		s.Question = "担当者を呼びますか？"
		s.Choices = cd3
		s.NextStep = 4
		s.Answer = cd3[0]
		si.resp = s
		si.videoFileName = "stories_suddenly_3.mp4"
		si.voiceFileName = "stories_suddenly_3.wav"
		return si, nil
	case 4:
		userChoices, err := model.UserChoiceAnswer(cd3, t)
		if err != nil {
			goa.LogError(ctx, "suddenlyPatternStory 5: err", "err", err)
			return storyInfo{}, err
		}
		if cd3[userChoices] != cd3[0] {
			goa.LogError(ctx, "suddenlyPatternStory 6: err", "err", ErrMissChoice)
			return storyInfo{}, ErrMissChoice
		}
		s.Question = "ストーリークリア"
		s.IsClear = true
		si.resp = s
		si.videoFileName = "stories_suddenly_4.mp4"
		si.voiceFileName = "stories_suddenly_4.wav"
		return si, nil
	default:
		return storyInfo{}, ErrNotFoundStep
	}
}
