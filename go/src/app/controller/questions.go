package controller

import (
	"app/app"
	"app/model"
	"app/mywebsocket"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// QuestionsController implements the questions resource.
type QuestionsController struct {
	*goa.Controller
	db *sqlx.DB
	ws *mywebsocket.Server
}

// NewQuestionsController creates a questions controller.
func NewQuestionsController(service *goa.Service, db *sqlx.DB, ws *mywebsocket.Server) *QuestionsController {
	return &QuestionsController{
		Controller: service.NewController("QuestionsController"),
		db:         db,
		ws:         ws,
	}
}

// Answers runs the answers action.
func (c *QuestionsController) Answers(ctx *app.AnswersQuestionsContext) error {
	// QuestionsController_Answers: start_implement

	// Put your logic here
	qDB := model.NewQuestionsDB(c.db)
	q, err := qDB.Get(ctx, ctx.ID)
	if err != nil {
		return goa.ErrInternal(err)
	}
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return goa.ErrBadRequest(err)
	}
	isReturn, _ := model.IsReturn(t)
	if isReturn {
		ctx.ResponseData.Header().Set("Location", "/")
		return ctx.MovedPermanently()
	}
	uaDB := model.NewUserAnswersDB(c.db)
	ua := model.UserAnswers{
		Question:   q.Question,
		Answer:     t,
		QuestionID: ctx.ID,
	}
	go uaDB.AddAnalysis(ctx, ua)
	res := app.Answertype{}
	if q.AnswerType == model.FreeAnswerType {
		faDB := model.NewFreeAnswersDB(c.db)
		r, err := faDB.GetFreeAnswerReplay(ctx, ctx.ID, t)
		if err != nil {
			return ctx.BadRequest(goa.ErrBadRequest(err))
		}
		res = r.FreeAnswerToAnswertype()
	} else if q.AnswerType == model.ChoiceAnswerType {
		caDB := model.NewChoiceAnswersDB(c.db)
		r, err := caDB.GetChoiceAnswerReplay(ctx, ctx.ID, t)
		if err != nil {
			return ctx.BadRequest(goa.ErrBadRequest(err))
		}
		res = r.ChoiceAnswerToAnswertype()
	}
	res.UserVoiceText = t
	// QuestionsController_Answers: end_implement
	return ctx.OK(&res)
}

// Questions runs the questions action.
func (c *QuestionsController) Questions(ctx *app.QuestionsQuestionsContext) error {
	// QuestionsController_Questions: start_implement

	// Put your logic here
	qDB := model.NewQuestionsDB(c.db)
	q, err := qDB.GetRandomQuestion(ctx)
	if err != nil {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	v := mywebsocket.VideoChange{
		VideoFileName: q.VideoFileName,
		VoiceFileName: q.VoiceFileName,
	}
	c.ws.Send(mywebsocket.WsChannel, mywebsocket.WsVideoChange, v)
	// QuestionsController_Questions: end_implement
	res := &app.Questiontype{}
	res.Question = q.QuestionDisplay
	res.ID = q.ID
	res.Choices = q.Choice
	res.AnswerType = q.AnswerType
	return ctx.OK(res)
}
