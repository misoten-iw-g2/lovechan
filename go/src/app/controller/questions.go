package controller

import (
	"app/app"
	"app/model"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// QuestionsController implements the questions resource.
type QuestionsController struct {
	*goa.Controller
	db *sqlx.DB
}

// NewQuestionsController creates a questions controller.
func NewQuestionsController(service *goa.Service, db *sqlx.DB) *QuestionsController {
	return &QuestionsController{
		Controller: service.NewController("QuestionsController"),
		db:         db,
	}
}

// Answers runs the answers action.
func (c *QuestionsController) Answers(ctx *app.AnswersQuestionsContext) error {
	// QuestionsController_Answers: start_implement

	// Put your logic here
	qDB := model.NewQuestions(c.db)
	q, err := qDB.Get(ctx, ctx.ID)
	if err != nil {
		return goa.ErrInternal("answer 1", err)
	}

	res := app.Answertype{}
	if q.AnswerType == model.FreeAnswerType {
		faDB := model.NewFreeAnswersDB(c.db)
		res, err = faDB.GetFreeAnswerReplay(ctx, ctx.ID, ctx.Payload.UserAnswer)
		if err != nil {
			return goa.ErrInternal("answer 3", err)
		}
	} else if q.AnswerType == model.ChoiceAnswerType {
		goa.LogInfo(ctx, "%d", q.AnswerType)
		caDB := model.NewChoiceAnswersDB(c.db)
		res, err = caDB.GetChoiceAnswerReplay(ctx, ctx.ID, ctx.Payload.UserAnswer)
		if err != nil {
			return goa.ErrInternal("answer 2", err)
		}
	}
	// QuestionsController_Answers: end_implement
	return ctx.OK(&res)
}

// Questions runs the questions action.
func (c *QuestionsController) Questions(ctx *app.QuestionsQuestionsContext) error {
	// QuestionsController_Questions: start_implement

	// Put your logic here
	qDB := model.NewQuestions(c.db)
	q, err := qDB.GetRandomQuestion(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	// QuestionsController_Questions: end_implement
	res := &app.Questiontype{}
	res.Question = q.Question
	res.ID = q.ID
	res.Choices = q.Choice
	res.AnswerType = q.AnswerType
	return ctx.OK(res)
}
