#!/bin/sh

if [ "$GO_DEP" = true ]; then
  go get -u github.com/golang/dep/cmd/dep
  dep init
  dep ensure -update
else
  go-wrapper download
  go-wrapper install
fi

if [ "$WATCH" = true ] ; then
  go get -u github.com/pilu/fresh
  fresh
else
  go build -o goapp . && ./goapp
fi