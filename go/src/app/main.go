//go:generate goagen bootstrap -d github.com/pei0804/goa-stater/design

package main

import (
	"flag"
	"log"
	"os"

	"app/app"
	"app/config"
	"app/controller"
	"app/design"

	"path/filepath"

	"app/design/constant"

	"github.com/deadcheat/goacors"
	"github.com/goadesign/goa"
	"github.com/goadesign/goa/middleware"
	"github.com/jmoiron/sqlx"
)

// Server 実行に必要な値を保持している
type Server struct {
	service *goa.Service
	mysql   *sqlx.DB
}

// NewServer Server構造体を作成する
func NewServer(s *goa.Service) *Server {
	return &Server{
		service: s,
	}
}

func (s *Server) mountController() {
	// Mount "talk" controller
	talks := controller.NewTalksController(s.service)
	app.MountTalksController(s.service, talks)
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
}

func (s *Server) loadConfig(settingFolder string, env string) {
	mc, err := config.NewMysqlConfigsFromFile(filepath.Join(settingFolder, "mysql.yml"))
	if err != nil {
		log.Fatalf("cannot open database configuration. exit. %s", err)
	}
	var hostname string
	if hostname != "" {
		hostname = os.Getenv("HOSTNAME")
	}
	s.mysql, err = mc.Open(env, hostname)
	if err != nil {
		log.Fatalf("database initialization failed: %s", err)
	}
	if err != nil {
		log.Fatalf("database ping failed: %s", err)
	}
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
	s.mountMiddleware()
	s.loadConfig(*confDir, *env)
	s.mountController()

	// Start service
	if err := service.ListenAndServe(*port); err != nil {
		service.LogError("startup", "err", err)
	}
}
