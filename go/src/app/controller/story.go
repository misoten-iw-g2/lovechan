package controller

import (
	"app/app"

	"github.com/goadesign/goa"
)

// StoryController implements the story resource.
type StoryController struct {
	*goa.Controller
}

// NewStoryController creates a story controller.
func NewStoryController(service *goa.Service) *StoryController {
	return &StoryController{Controller: service.NewController("StoryController")}
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

// Story runs the story action.
func (c *StoryController) Story(ctx *app.StoryStoryContext) error {
	// StoryController_Story: start_implement

	// Put your logic here
	now := ctx.Payload.NowStep
	userAnswer := ctx.Payload.UserAnswer
	res := app.Storytype{}
	switch ctx.Payload.StoryPattern {
	case hintPattern:
		r, err := hintPatternStory(userAnswer, now)
		if err != nil {
			return goa.ErrInternal(err)
		}
		res = r
	case findPattern:
		r, err := findPatternStory(userAnswer, now)
		if err != nil {
			return goa.ErrInternal(err)
		}
		res = r
	case callPattern:
		r, err := callPatternStory(userAnswer, now)
		if err != nil {
			return goa.ErrInternal(err)
		}
		res = r
	case listenPattern:
		r, err := listenPatternStory(userAnswer, now)
		if err != nil {
			return goa.ErrInternal(err)
		}
		res = r
	default:
	}
	goa.LogInfo(ctx, "request now: now", "now", now)
	goa.LogInfo(ctx, "request user_answer: user_answer", "user_answer", userAnswer)
	// StoryController_Story: end_implement
	return ctx.OK(&res)
}

func hintPatternStory(userAnswer string, now int) (app.Storytype, error) {
	s := app.Storytype{}

	// ストーリーに使う選択肢
	c1 := []string{"エラーが出てる", "何もしてないけど壊れた", "画面が映らない", "インターネットに繋がらない"}
	c2 := []string{"417", "114", "514", "1919"}
	c3 := []string{"はい", "いいえ"}

	// ストーリ設定
	s.StoryPattern = hintPattern
	s.NextStep = now + 1
	switch now {
	case 1:
		s.Question = "画面に何か出てますか？"
		s.Choices = c1
		fallthrough
	case 2:
		s.Question = "エラーコードを教えてください"
		s.Choices = c2
	case 3:
		s.Question = "担当者を呼びますか？"
		s.Choices = c3
	case 4:
		s.Choices = []string{}
		s.IsClear = true
	default:
	}
	return s, nil
}

func findPatternStory(userAnswer string, now int) (app.Storytype, error) {
	// 現在のストーリーフェーズ
	switch now {
	case 2:
		// エラーコードを教えてください
	case 3:
		// 担当者を呼びますか
	default:
	}
	return app.Storytype{}, nil
}

func callPatternStory(userAnswer string, now int) (app.Storytype, error) {
	// 現在のストーリーフェーズ
	switch now {
	case 2:
		// 誰を呼びますか
	default:
	}
	return app.Storytype{}, nil
}

func listenPatternStory(userAnswer string, now int) (app.Storytype, error) {
	// 現在のストーリーフェーズ
	switch now {
	case 2:
		// 画面に何か出てますか？
	case 3:
		// エラーコードを教えてください
	case 4:
		// 担当者を呼びますか
	default:
	}
	return app.Storytype{}, nil
}
