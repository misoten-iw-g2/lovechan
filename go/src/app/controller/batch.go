package controller

import (
	"app/app"
	"app/config"
	"app/model"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
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

// CreateVoices runs the createVoices action.
func (c *BatchController) CreateVoices(ctx *app.CreateVoicesBatchContext) error {
	// BatchController_CreateVoices: start_implement

	// Put your logic here

	qDB := model.NewQuestionsDB(c.db)
	qs, err := qDB.ListAll(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	faDB := model.NewFreeAnswersDB(c.db)
	fas, err := faDB.ListAll(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	caDB := model.NewChoiceAnswersDB(c.db)
	cas, err := caDB.ListAll(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}

	goa.LogInfo(ctx, "Questions qs", "qs", qs)
	goa.LogInfo(ctx, "FreeAnswer fas", "fas", fas)
	goa.LogInfo(ctx, "ChoiceAnswer cas", "cas", cas)

	// BatchController_CreateVoices: end_implement
	return nil
}

func execCreateVoice(dir string, filename string, overwrite bool) error {
	return nil
}
