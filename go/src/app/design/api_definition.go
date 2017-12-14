package design

import (
	"os"

	. "app/design/constant"
	_ "app/design/resource"

	. "github.com/goadesign/goa/design"
	. "github.com/goadesign/goa/design/apidsl"
)

var _ = API(REPO, func() {
	Host(func() string {
		switch os.Getenv("Op") {
		case "develop":
			return "localhost:8080"
		case "production":
			return "misoten-lovechan.appspot.com"
		}
		return "localhost:8080"
	}())
	Scheme(func() string {
		switch os.Getenv("Op") {
		case "develop":
			return "http"
		case "production":
			return "https"
		}
		return "http"
	}())
	BasePath("/")
	Trait(GeneralUserTrait, func() {
		Response(Unauthorized, ErrorMedia)
		Response(NotFound)
		Response(MovedPermanently)
		Response(BadRequest, ErrorMedia)
		Response(InternalServerError, ErrorMedia)
	})
})
