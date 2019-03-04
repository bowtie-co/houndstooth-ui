project_name = houndstooth

setup: init rebuild
start: up
stop: clean
restart: clean build up
rebuild: preup build
rebuild-clean: super-clean rebuild

init:
	([ ! -e .git/hooks/pre-push ] || rm .git/hooks/pre-push) && ln -s ../../bin/pre-push .git/hooks

clean:
	docker-compose rm --force --stop -v

super-clean: clean
	docker system prune --all --force --volumes

build: clean docker-build install

docker-build:
	docker-compose build

docker-build-no-cache:
	docker-compose build --pull --no-cache

install:
	docker-compose run -l traefik.enable=false --rm $(project_name) npm install

preup:
	btdev start

up: preup
	docker-compose up --force-recreate

sh:
	docker-compose run -l traefik.enable=false --rm $(project_name) sh

bash:
	docker-compose run -l traefik.enable=false --rm $(project_name) bash

lint:
	docker-compose run -l traefik.enable=false --rm $(project_name) npm run lint

test:
	docker-compose run -l traefik.enable=false --rm -e NODE_ENV=test -e CI=true $(project_name) npm test

cc-before:
	docker-compose -f docker-compose-ci.yml run --rm $(project_name) bin/cc-test-reporter before-build

cc-after:
	docker-compose -f docker-compose-ci.yml run --rm $(project_name) bin/cc-test-reporter after-build

ci-build:
	docker-compose -f docker-compose-ci.yml build

ci-install:
	docker-compose -f docker-compose-ci.yml run --rm $(project_name) npm install

ci-test:
	docker-compose -f docker-compose-ci.yml run --rm $(project_name) npm run test

ci: ci-build ci-install ci-test

fix:
	docker-compose run -l traefik.enable=false --rm $(project_name) npm run lint:fix

.PHONY: init clean build install lint test
