SOURCES = src

lint:
	./node_modules/.bin/eslint scripts $(SOURCES) *.js --format=codeframe

build:
	yarn webpack:production
