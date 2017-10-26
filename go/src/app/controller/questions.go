package controller

import (
	"app/app"
	"app/model"
	"app/util"
	"fmt"
	"strconv"

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
	s, err := util.AnalyzeSentiment(c.Context, ctx.Payload.UserAnswer)
	if err != nil {
		return goa.ErrInternal(err)
	}
	score := s.DocumentSentiment.GetScore()
	scoref64, err := strconv.ParseFloat(fmt.Sprint(score), 64)
	if err != nil {
		return goa.ErrInternal(err)
	}
	// QuestionsController_Answers: end_implement
	res := &app.Answertype{}
	res.Score = scoref64
	return ctx.OK(res)
}

// Questions runs the questions action.
func (c *QuestionsController) Questions(ctx *app.QuestionsQuestionsContext) error {
	// QuestionsController_Questions: start_implement

	// Put your logic here
	qDB := model.NewQuestions(c.db)
	q, err := qDB.GetRandomQuestion()
	if err != nil {
		return goa.ErrInternal(err)
	}
	// QuestionsController_Questions: end_implement
	res := &app.Questiontype{}
	res.Question = q.Question
	res.ID = q.ID
	return ctx.OK(res)
}
