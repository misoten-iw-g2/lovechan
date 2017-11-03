//go:generate goagen bootstrap -d github.com/pei0804/goa-stater/design

package main

import (
	"flag"
	"log"

	"app/app"
	"app/config"
	"app/controller"
	"app/design"
	"app/mywebsocket"

	"app/design/constant"
	"path/filepath"

	"github.com/deadcheat/goacors"
	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
	"github.com/jmoiron/sqlx"
	migrate "github.com/rubenv/sql-migrate"
)

// Server 実行に必要な値を保持している
type Server struct {
	service *goa.Service
	mysql   *sqlx.DB
	ws      *mywebsocket.Server
}

// NewServer Server構造体を作成する
func NewServer(s *goa.Service) *Server {
	ws := mywebsocket.NewServer()
	go ws.Start()
	return &Server{
		service: s,
		ws:      ws,
	}
}

func (s *Server) mountController() {
	// Mount "talks" controller
	talks := controller.NewTalksController(s.service)
	app.MountTalksController(s.service, talks)
	// Mount "story" controller
	story := controller.NewStoryController(s.service)
	app.MountStoryController(s.service, story)
	// Mount "questions" controller
	questions := controller.NewQuestionsController(s.service, s.mysql, s.ws)
	app.MountQuestionsController(s.service, questions)
	// Mount "requests" controller
	requests := controller.NewRequestsController(s.service, s.mysql)
	app.MountRequestsController(s.service, requests)
	// Mount "front" controller
	front := controller.NewFrontController(s.service)
	app.MountFrontController(s.service, front)
	// Mount "swagger" controller
	swagger := controller.NewSwaggerController(s.service)
	app.MountSwaggerController(s.service, swagger)
	// Mount "swaggerui" controller
	swaggerui := controller.NewSwaggeruiController(s.service)
	app.MountSwaggeruiController(s.service, swaggerui)
	// Mount "ws" controller
	ws := controller.NewWsController(s.service, s.ws)
	app.MountWsController(s.service, ws)
}

func (s *Server) mountMiddleware(env string) {
	s.service.Use(middleware.RequestID())
	s.service.Use(middleware.LogRequest(true))
	s.service.Use(middleware.ErrorHandler(s.service, true))
	s.service.Use(middleware.Recover())
	s.service.Use(goacors.WithConfig(s.service, design.CorsConfig[env]))
}

func (s *Server) loadConfig(settingFolder string, env string) {
	mc, err := config.NewMysqlConfigsFromFile(filepath.Join(settingFolder, "mysql.yml"))
	if err != nil {
		log.Fatalf("cannot open database configuration. exit. %s", err)
	}
	s.mysql, err = mc.Open(env)
	if err != nil {
		log.Fatalf("database initialization failed: %s", err)
	}
	err = s.mysql.Ping()
	if err != nil {
		log.Fatalf("database ping failed: %s", err)
	}
}

func (s *Server) migrations() {
	migrations := &migrate.FileMigrationSource{
		Dir: "migrations",
	}
	n, err := migrate.Exec(s.mysql.DB, "mysql", migrations, migrate.Up)
	if err != nil {
		log.Fatalf("database migrate failed: %s", err)
	}
	log.Printf("Applied %d migrations!\n", n)
}

func main() {
	var (
		port    = flag.String("port", ":8080", "addr to bind")
		confDir = flag.String("conf", "config", "configファイルのディレクトリパス")
		env     = flag.String("env", "develop", "実行環境 (production, staging, develop)")
	)
	flag.Parse()

	service := goa.New(constant.REPO)
	s := NewServer(service)
	s.mountMiddleware(*env)
	s.loadConfig(*confDir, *env)
	s.migrations()
	s.mountController()

	// Start service
	if err := service.ListenAndServe(*port); err != nil {
		service.LogError("startup", "err", err)
	}
}
