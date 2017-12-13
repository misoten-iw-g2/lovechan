package controller

import (
	"app/app"
	"app/model"
	"app/mywebsocket"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// RequestsController implements the requests resource.
type RequestsController struct {
	*goa.Controller
	db *sqlx.DB
	ws *mywebsocket.Server
}

// NewRequestsController creates a requests controller.
func NewRequestsController(service *goa.Service, db *sqlx.DB, ws *mywebsocket.Server) *RequestsController {
	return &RequestsController{
		Controller: service.NewController("RequestsController"),
		db:         db,
		ws:         ws,
	}
}

// List runs the list action.
func (c *RequestsController) List(ctx *app.ListRequestsContext) error {
	// RequestsController_List: start_implement

	// Put your logic here
	rDB := model.NewRequestsDB(c.db)
	rs, err := rDB.GetList(ctx)
	if err != nil {
		return ctx.InternalServerError(goa.ErrInternal(err))
	}
	var ar []*app.Requesttype
	for _, v := range rs {
		ar = append(ar, v.RequestToRequesttypePtr())
	}
	v := mywebsocket.VideoChange{
		VideoFileName: "requests_question.mp4",
		VoiceFileName: "requests_question.wav",
	}
	c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)
	// RequestsController_List: end_implement
	return ctx.OK(ar)
}

// Request runs the request action.
func (c *RequestsController) Request(ctx *app.RequestRequestsContext) error {
	// RequestsController_Request: start_implement

	// Put your logic here
	rDB := model.NewRequestsDB(c.db)
	rs, err := rDB.GetList(ctx)
	if err != nil {
		return ctx.InternalServerError(goa.ErrInternal(err))
	}
	t, err := model.GetTextByVoice(ctx, ctx.Request, "uploadfile")
	if err != nil {
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	isReturn, _ := model.IsReturn(t)
	if isReturn {
		ctx.ResponseData.Header().Set("Location", "/conversations")
		return ctx.MovedPermanently()
	}
	r, err := rDB.GetUserRequest(ctx, rs, t)
	if err != nil {
		return ctx.InternalServerError(goa.ErrInternal(err))
	}
	v := mywebsocket.VideoChange{
		VideoFileName: r.VideoFileName,
		VoiceFileName: r.VoiceFileName,
	}
	c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)

	// RequestsController_Request: end_implement
	res := app.RequesttypeFull{}
	res = r.RequestToRequesttypeFull()
	res.UserVoiceText = t
	res.IsFinish = true
	return ctx.OKFull(&res)
}
