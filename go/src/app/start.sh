#!/bin/sh

go get -u github.com/golang/dep/cmd/dep
if [ ! -e Gopkg.toml ]; then
    /data/go/bin/dep init
fi
/data/go/bin/dep ensure -v
dev_appserver.py --host 0.0.0.0 --admin_host 0.0.0.0 ./server
