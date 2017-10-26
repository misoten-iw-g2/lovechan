package controller

import (
	"app/app"
	"app/mywebsocket"

	"github.com/goadesign/goa"
)

// WebsocketController implements the websocket resource.
type WebsocketController struct {
	*goa.Controller
	ws *mywebsocket.Server
}

// NewWebsocketController creates a websocket controller.
func NewWebsocketController(service *goa.Service, ws *mywebsocket.Server) *WebsocketController {
	return &WebsocketController{
		Controller: service.NewController("WebsocketController"),
		ws:         ws,
	}
}

// Websocket runs the websocket action.
func (c *WebsocketController) Websocket(ctx *app.WebsocketWebsocketContext) error {
	// WebsocketController_Websocket: start_implement

	// Put your logic here
	c.ws.WebsocketServe("lovechan", ctx.ResponseWriter, ctx.Request)

	// WebsocketController_Websocket: end_implement
	return nil
}
