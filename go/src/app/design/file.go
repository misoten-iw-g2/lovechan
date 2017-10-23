package design

import (
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = Resource("swaggerui", func() {
	Origin("*", func() {
		Methods("GET")
	})
	Files("/swaggerui/*filepath", "public/swaggerui/")
})

var _ = Resource("swagger", func() {
	Files("/swagger.json", "public/swagger/swagger.json")
})

var _ = Resource("front", func() {
	Files("static/js/*filepath", "public/dist/static/js")
	Files("/", "public/dist/index.html")
	Files("*", "public/dist/index.html")
	Files("/manifest.json", "public/dist/manifest.json")
})
