package controller

import (
	"app/app"
	"app/model"

	"github.com/goadesign/goa"
	"github.com/jmoiron/sqlx"
)

// RequestsController implements the requests resource.
type RequestsController struct {
	*goa.Controller
	db *sqlx.DB
}

// NewRequestsController creates a requests controller.
func NewRequestsController(service *goa.Service, db *sqlx.DB) *RequestsController {
	return &RequestsController{
		Controller: service.NewController("RequestsController"),
		db:         db,
	}
}

// List runs the list action.
func (c *RequestsController) List(ctx *app.ListRequestsContext) error {
	// RequestsController_List: start_implement

	// Put your logic here
	rDB := model.NewRequestsDB(c.db)
	rs, err := rDB.GetList(ctx)
	if err != nil {
		return goa.ErrInternal(err)
	}
	var ar []*app.Requesttype
	for _, v := range rs {
		ar = append(ar, v.RequestToRequesttypePtr())
	}
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
		return goa.ErrInternal(err)
	}
	r, err := rDB.GetUserRequest(ctx, rs, ctx.Payload.UserAnswer)
	if err != nil {
		return goa.ErrInternal(err)
	}

	// RequestsController_Request: end_implement
	res := app.Requesttype{}
	res = r.RequestToRequesttype()
	return ctx.OK(&res)
}
