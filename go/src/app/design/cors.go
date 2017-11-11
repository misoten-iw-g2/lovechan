package design

import "github.com/deadcheat/goacors"

var devCORS = &goacors.GoaCORSConfig{
	AllowOrigins:     []string{"*"},
	AllowMethods:     []string{goacors.GET, goacors.HEAD, goacors.PUT, goacors.POST, goacors.DELETE, goacors.OPTIONS},
	AllowHeaders:     []string{"Content-Type", "X-Authorization"},
	ExposeHeaders:    []string{"Location"},
	AllowCredentials: false,
	MaxAge:           600,
}

var productionCORS = &goacors.GoaCORSConfig{
	AllowOrigins:     []string{"*"},
	AllowMethods:     []string{goacors.GET, goacors.HEAD, goacors.PUT, goacors.POST, goacors.DELETE, goacors.OPTIONS},
	AllowHeaders:     []string{"Content-Type", "X-Authorization"},
	ExposeHeaders:    []string{"Location"},
	AllowCredentials: false,
	MaxAge:           600,
}

var CorsConfig = map[string]*goacors.GoaCORSConfig{
	"develop":    devCORS,
	"production": productionCORS,
}
