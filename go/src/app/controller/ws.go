package controller

import (
	"app/app"
	"app/mywebsocket"

	"github.com/goadesign/goa"
)

// WsController implements the ws resource.
type WsController struct {
	*goa.Controller
	ws *mywebsocket.Server
}

// NewWsController creates a ws controller.
func NewWsController(service *goa.Service, ws *mywebsocket.Server) *WsController {
	return &WsController{
		Controller: service.NewController("WsController"),
		ws:         ws,
	}
}

// Ws runs the ws action.
func (c *WsController) Ws(ctx *app.WsWsContext) error {
	// WsController_Ws: start_implement

	// Put your logic here
	c.ws.WebsocketServe(ctx.Channel, ctx.ResponseWriter, ctx.Request)

	// WsController_Ws: end_implement
	return nil
}
