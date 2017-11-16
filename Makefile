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

docker-server: docker-build docker-up

docker-clean: docker-stop docker-rm

help:
	@echo docker-build:	Build the docker container
	@echo docker-up:	Start the docker container
	@echo docker-stop:	Stop the docker container
	@echo docker-rm:	Remove the docker container
	@echo docker-ssh:	Execute an interactive bash shell on the container

docker-build:
	docker-compose build

docker-up:
	rm -rf ./mysql
	docker-compose up

docker-stop:
	docker-compose stop

docker-rm:
	docker-compose rm

docker-ssh-mysql:
	docker exec -it lovechan_mysql_1 /bin/bash

docker-ssh-api:
	docker exec -it lovechan_golang_1 /bin/bash

ws-install:
	go get -u github.com/raphael/wsc

ws:
	wsc ws://localhost:8080/api/ws

CLIENT:=./client
SERVER :=./go/src/app
client-build:
	$(MAKE) -C $(CLIENT) build

config-set:
	$(MAKE) -C $(SERVER) config-set

host:=http://localhost:8080

curl_question_answer:
	curl -v -i -H "Content-Type: application/json" -X POST $(host)/api/questions/$(id)/answers -d '{"text": "$(text)"}'

curl_question_answer_voice:
	curl -F 'uploadfile=@./sampleVoice/questions-2-tanosii.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/questions/2/answers'

curl_requests:
	curl -v -i -H "Content-Type: application/json" -X POST $(host)/api/requests -d '{"text": "$(text)"}'

curl_requests_voice:
	curl -F 'uploadfile=@./sampleVoice/request-ippatugei.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/requests'

curl_stories:
	curl -F 'uploadfile=@./sampleVoice/story-selectpattern-hint-2.wav' -X POST --header 'Content-Type: multipart/form-data' 'http://localhost:8080/api/stories/hint/2'

curl_stories_suddenly:
	curl -v -H "Content-Type: application/json" -X POST $(host)/api/stories/suddenly/$(now_step) -d '{"text": "$(text)"}'

