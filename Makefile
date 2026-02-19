.PHONY: build dev install

build:
	npm run build

dev:
	./dev.sh

install:
	npm install && cd api && composer install
