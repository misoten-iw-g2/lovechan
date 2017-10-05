FROM google/cloud-sdk:alpine

# install go1.8
RUN curl -Lso go1.8.linux-amd64.tar.gz https://storage.googleapis.com/golang/go1.8.linux-amd64.tar.gz \
	&& tar -C /usr/local -xzf go1.8.linux-amd64.tar.gz \
	&& rm go1.8.linux-amd64.tar.gz

# install GAE for Go SDK
RUN gcloud components install app-engine-go

# install git
RUN apk add --update --no-cache \
		sudo \
		git

# create docker user
RUN adduser -S -u 1000 -g 50 docker \
	&& echo 'docker:tcuser' | chpasswd

# for saving gcloud config
RUN sudo -u docker gcloud config set core/disable_usage_reporting true && \
    sudo -u docker gcloud config set component_manager/disable_update_check true && \
    sudo -u docker gcloud config set metrics/environment github_docker_image

RUN mkdir -p /data/go
VOLUME ["/data","/home/docker/.config"]
WORKDIR /data/go/src/app
ENV GOPATH /data/go
ENV PATH $PATH:/usr/local/go/bin:/data/go/bin

USER 1000

CMD ["dev_appserver.py","--host","0.0.0.0","--admin_host","0.0.0.0","./server"]