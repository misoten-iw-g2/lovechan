.DEFAULT_GOAL := help

mac-install:
	which direnv || brew install direnv
	@echo 'zshならzshrcに eval "$$(direnv hook zsh)" の記述を追加してください'
	@echo 'bashならbashrcに　eval "$$(direnv hook bash)"  の記述を追加してください'
	@echo 参考URL:https://qiita.com/ngyuki/items/fda1bbf29384bef7a805

win-install:
	git clone http://github.com/zimbatm/direnv
	cd direnv
	sudo make install
	@echo bashrcに　eval "$(direnv hook bash)"  の記述を追加してください
	@echo 参考URL:https://qiita.com/ngyuki/items/fda1bbf29384bef7a805

direnv:
	direnv allow

docker_server: docker_build docker_up

docker_clean: docker_stop docker_rm 

help:
	@echo docker_build:	Build the docker container
	@echo docker_up:	Start the docker container
	@echo docker_stop:	Stop the docker container
	@echo docker_rm:	Remove the docker container
	@echo docker_ssh:	Execute an interactive bash shell on the container

docker_build:
	docker-compose build

docker_up:
	docker-compose up

docker_stop:
	docker-compose stop

docker_rm:
	docker-compose rm

docker_ssh_mysql:
	docker exec -it lovechan_mysql_1 /bin/bash

docker_ssh_api:
	docker exec -it lovechan_golang_1 /bin/bash

ws-install:
	go get -u github.com/raphael/wsc

ws:
	wsc ws://localhost:8080/api/ws
