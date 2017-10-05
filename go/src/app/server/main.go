//go:generate goagen bootstrap -d github.com/pei0804/goa-stater/design

package server

import (
	"net/http"

	"os"

	"app/app"
	"app/controller"
	"app/design"
	"app/mymiddleware"

	"github.com/deadcheat/goacors"
	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
)

// Server 実行に必要な値を保持している
type Server struct {
	service *goa.Service
}

// NewServer Server構造体を作成する
func NewServer(s *goa.Service) *Server {
	return &Server{
		service: s,
	}
}

func (s *Server) mountController() {
	// Mount "example" controller
	example := controller.NewExampleController(s.service)
	app.MountExampleController(s.service, example)
	// Mount "front" controller
	front := controller.NewFrontController(s.service)
	app.MountFrontController(s.service, front)
	// Mount "swagger" controller
	swagger := controller.NewSwaggerController(s.service)
	app.MountSwaggerController(s.service, swagger)
	// Mount "swaggerui" controller
	swaggerui := controller.NewSwaggeruiController(s.service)
	app.MountSwaggeruiController(s.service, swaggerui)
}

func (s *Server) mountMiddleware() {
	s.service.Use(middleware.RequestID())
	s.service.Use(middleware.LogRequest(true))
	s.service.Use(middleware.ErrorHandler(s.service, true))
	s.service.Use(middleware.Recover())
	s.service.Use(goacors.WithConfig(s.service, design.CorsConfig[os.Getenv("Op")]))

	if os.Getenv("NoSecure") == "true" {
		app.UseAdminAuthMiddleware(s.service, mymiddleware.NewTestModeMiddleware())
		app.UseGeneralAuthMiddleware(s.service, mymiddleware.NewTestModeMiddleware())
	} else {
		app.UseAdminAuthMiddleware(s.service, mymiddleware.NewAdminUserAuthMiddleware())
		app.UseGeneralAuthMiddleware(s.service, mymiddleware.NewGeneralUserAuthMiddleware())
	}
}

func init() {
	service := goa.New("pei0804/goa-stater")
	s := NewServer(service)
	s.mountMiddleware()
	s.mountController()

	// Start service
	http.HandleFunc("/", service.Mux.ServeHTTP)
}
