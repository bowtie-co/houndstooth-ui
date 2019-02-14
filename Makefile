project_name = houndstooth-ui

setup: init rebuild
up: start
restart: install start
rebuild: reset

init:
	([ ! -e .git/hooks/pre-push ] || rm .git/hooks/pre-push) && ln -s ../../bin/pre-push .git/hooks

clean:
	rm -rf node_modules

install:
	npm install

start:
	npm start

build:
	npm run build

test:
	npm test

reset: clean install

lint:
	npm run lint

fix:
	npm run lint:fix

analyze:
	npm run analyze

scan:
	npm audit

build-dll:
	npm run build:dll

ci-reset: reset

ci-test:
	CI=true npm run ci

ci: ci-reset ci-test
