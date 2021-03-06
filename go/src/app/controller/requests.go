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
	c.ws.Send(mywebsocket.WsSoundChannel, mywebsocket.WsSelectionSound, mywebsocket.VideoChange{})
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
		c.ws.Send(mywebsocket.WsSoundChannel, mywebsocket.WsSelectionSound, mywebsocket.VideoChange{})
		v := mywebsocket.VideoChange{
			VideoFileName: "once_again.mp4",
			VoiceFileName: "once_again.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChangeStory, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	isReturn, _ := model.IsReturn(t)
	if isReturn {
		c.ws.Send(mywebsocket.WsSoundChannel, mywebsocket.WsSelectionSound, mywebsocket.VideoChange{})
		return ctx.Accepted(model.NewRoutingType("/conversations", t))
	}
	r, err := rDB.GetUserRequest(ctx, rs, t)
	if err != nil {
		c.ws.Send(mywebsocket.WsSoundChannel, mywebsocket.WsSelectionSound, mywebsocket.VideoChange{})
		v := mywebsocket.VideoChange{
			VideoFileName: "once_again.mp4",
			VoiceFileName: "once_again.wav",
		}
		c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChangeStory, v)
		return ctx.BadRequest(goa.ErrBadRequest(err))
	}
	v := mywebsocket.VideoChange{
		VideoFileName: r.VideoFileName,
		VoiceFileName: r.VoiceFileName,
	}
	c.ws.Send(mywebsocket.WsSoundChannel, mywebsocket.WsSelectionSound, mywebsocket.VideoChange{})
	c.ws.Send(mywebsocket.WsMovieChannel, mywebsocket.WsVideoChange, v)

	// RequestsController_Request: end_implement
	res := app.RequesttypeFull{}
	res = r.RequestToRequesttypeFull()
	res.UserVoiceText = t
	res.IsFinish = true
	res.NextPage = "/conversations"
	return ctx.OKFull(&res)
}
