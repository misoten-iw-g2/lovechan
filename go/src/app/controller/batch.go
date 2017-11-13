package controller

import (
	"app/app"
	"app/config"
	"app/model"
	"fmt"
	"os"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
	voicetext "github.com/yosssi/go-voicetext"
)

// BatchController implements the batch resource.
type BatchController struct {
	*goa.Controller
	db        *sqlx.DB
	voiceText *config.VoiceTextConfig
}

// NewBatchController creates a batch controller.
func NewBatchController(service *goa.Service, db *sqlx.DB, voiceText *config.VoiceTextConfig) *BatchController {
	return &BatchController{
		Controller: service.NewController("BatchController"),
		db:         db,
		voiceText:  voiceText,
	}
}

type createVoice struct {
	text     string
	filename string
	emotion  string
	speed    int
	config   *config.VoiceTextConfig
}

// CreateVoices runs the createVoices action.
func (c *BatchController) CreateVoices(ctx *app.CreateVoicesBatchContext) error {
	// BatchController_CreateVoices: start_implement

	// Put your logic here
	if ctx.UpdateQuestion {
		qDB := model.NewQuestionsDB(c.db)
		qs, err := qDB.ListAll(ctx)
		if err != nil {
			return goa.ErrInternal(err)
		}
		for _, v := range qs {
			e := createVoice{
				text:     v.Question,
				filename: v.VoiceFileName,
				emotion:  v.VoiceEmotion,
				speed:    v.VoiceSpeed,
				config:   c.voiceText,
			}
			err = e.exec()
			if err != nil {
				return goa.ErrInternal(err)
			}
		}
	}

	if ctx.UpdateFreeAnswer {
		faDB := model.NewFreeAnswersDB(c.db)
		fas, err := faDB.ListAll(ctx)
		if err != nil {
			return goa.ErrInternal(err)
		}
		for _, v := range fas {
			e := createVoice{
				text:     v.Answer,
				filename: v.VoiceFileName,
				emotion:  v.VoiceEmotion,
				speed:    v.VoiceSpeed,
				config:   c.voiceText,
			}
			err = e.exec()
			if err != nil {
				return goa.ErrInternal(err)
			}
		}
	}
	if ctx.UpdateChoiceAnswer {
		caDB := model.NewChoiceAnswersDB(c.db)
		cas, err := caDB.ListAll(ctx)
		if err != nil {
			return goa.ErrInternal(err)
		}
		for _, v := range cas {
			e := createVoice{
				text:     v.Answer,
				filename: v.VoiceFileName,
				emotion:  v.VoiceEmotion,
				speed:    v.VoiceSpeed,
				config:   c.voiceText,
			}
			err = e.exec()
			if err != nil {
				return goa.ErrInternal(err)
			}
		}
	}
	// BatchController_CreateVoices: end_implement
	return nil
}

func (e *createVoice) exec() error {
	c := voicetext.NewClient(e.config.Token, nil)
	result, err := c.TTS(e.text, &voicetext.TTSOptions{
		Speaker:      voicetext.SpeakerHaruka,
		Emotion:      e.emotion,
		EmotionLevel: "4",
		Pitch:        100,
		Speed:        e.speed,
		Volume:       100,
	})
	if err != nil {
		return err
	}
	if result.ErrMsg != nil {
		return err
	}
	f, err := os.Create(fmt.Sprint("public/voice/", e.filename))
	if err != nil {
		return err
	}
	defer f.Close()
	if _, err := f.Write(result.Sound); err != nil {
		return err
	}
	return nil
}
