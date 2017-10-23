FROM golang:1.9.1

ARG USER
ARG UID

RUN useradd $USER -o -u $UID
USER $USER

WORKDIR /go/src/app
