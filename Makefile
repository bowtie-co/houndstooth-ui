project_name = houndstooth

install: 
	npm install

start:
	npm start
	
build:
	npm run build

test:
	npm run test

reset:
	rm -rf node_modules && npm install

lint:
	npm run lint

fix:
	npm run lint:fix

audit:
	npm audit

dll:
	npm run dll

build-dll:
	npm run build:dll