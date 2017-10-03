.PHONY: swaggerui \
		models

##### run ######

local:
	cp -f ./server/env.yaml.dev ./server/env.yaml
	dev_appserver.py --datastore_path=./datastore ./server

rollback:
	appcfg.py rollback ./server -A lovechan

no-secure-local:
	cp -f ./server/env.yaml.dev.nosec ./server/env.yaml
	goapp serve ./server

##### goa ######

REPO:=github.com/pei0804/goa-stater

init: depend bootstrap
gen: clean generate
rerun: clean generate run
install: submodule depend

submodule:
	git submodule init
	git submodule update

depend:
	go get -u github.com/goadesign/goa/goagen
	go get -u github.com/alecthomas/gometalinter/...
	gometalinter --install --update --force
	go get -u github.com/goadesign/goa
	go get -u github.com/goadesign/gorma
	go get -u github.com/jinzhu/gorm
	go get -u github.com/deadcheat/goacors

bootstrap:
	goagen bootstrap -d $(REPO)/design

main:
	goagen main -d $(REPO)/design

clean:
	rm -rf app
	rm -rf client
	rm -rf server/swagger
	rm -f build

generate:
	goagen app     -d $(REPO)/design
	goagen swagger -d $(REPO)/design -o server
	goagen client -d $(REPO)/design
	rm -rf tool

models:
	ls models | grep -v '_defined.go' | xargs rm -f
	goagen --design=$(REPO)/design gen --pkg-path=github.com/goadesign/gorma

##### etc #####

ENV:=develop
PORT:=:8080
NOSECURE:=false

run:
	go run server/main.go --env=$(ENV) --port=$(PORT) --noSecure=$(NOSECURE)

build:
	go build -o build ./server/main.go

swaggerui:
	open http://localhost:8080/swaggerui/index.html

lint:
	@if [ "`gometalinter ./... --deadline=1000s --config=lint_config.json | tee /dev/stderr`" ]; then \
    		echo "^ - lint err" && echo && exit 1; \
    fi

##### Change package name ######

BEFORE:=github.com/pei0804/goa-stater
AFTER:=github.com/misoten-iw-g2/lovechan

change-package:
	which gorep || go get -v github.com/novalagung/gorep
	gorep -path="./" \
          -from="$(BEFORE)/app" \
          -to="$(AFTER)/app"
	gorep -path="./" \
          -from="$(BEFORE)/design/client" \
          -to="$(AFTER)/design/client"
	gorep -path="./" \
          -from="$(BEFORE)/design/constant" \
          -to="$(AFTER)/design/constant"
	gorep -path="./" \
          -from="$(BEFORE)/design/media" \
          -to="$(AFTER)/design/media"
	gorep -path="./" \
          -from="$(BEFORE)/design/resource" \
          -to="$(AFTER)/design/resource"
	gorep -path="./" \
          -from="$(BEFORE)/app/test" \
          -to="$(AFTER)/app/test"
	gorep -path="./" \
          -from="$(BEFORE)/controller" \
          -to="$(AFTER)/controller"
	gorep -path="./" \
          -from="$(BEFORE)/mymiddleware" \
          -to="$(AFTER)/mymiddleware"
	gorep -path="./" \
          -from="$(BEFORE)/server" \
          -to="$(AFTER)/server"

##### Appengine ######

#init: depend bootstrap appengine
#gen: clean generate appengine
#rerun: clean generate appengine run

appengine:
	which gorep || go get -v github.com/novalagung/gorep
	gorep -path="./vendor/github.com/goadesign/goa" \
          -from="context" \
          -to="golang.org/x/net/context"
	gorep -path="./models" \
          -from="context" \
          -to="golang.org/x/net/context"
	gorep -path="./app" \
          -from="context" \
          -to="golang.org/x/net/context"
	gorep -path="./client" \
          -from="context" \
          -to="golang.org/x/net/context"
	gorep -path="./tool" \
          -from="context" \
          -to="golang.org/x/net/context"
	gorep -path="./" \
          -from="../app" \
          -to="$(REPO)/app"
	gorep -path="./" \
          -from="../client" \
          -to="$(REPO)/client"
	gorep -path="./" \
          -from="../tool/cli" \
          -to="$(REPO)/tool/cli"
