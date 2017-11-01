#!/bin/sh

go get -u github.com/golang/dep/cmd/dep
dep init -v
if [ -e vendor ]; then
  dep ensure -update -v
else
  dep ensure -v
fi

(cd vendor/github.com/goadesign/goa/goagen && GOROOT=/usr/local/go go get && GOROOT=/usr/local/go go build)
./vendor/github.com/goadesign/goa/goagen/goagen version
./vendor/github.com/goadesign/goa/goagen/goagen app -d app/design
./vendor/github.com/goadesign/goa/goagen/goagen client -d app/design
./vendor/github.com/goadesign/goa/goagen/goagen swagger -d app/design -o ./public

if [ "$WATCH" = true ] ; then
  go get -u github.com/pilu/fresh
  fresh
else
  go build -o goapp . && ./goapp
fi
