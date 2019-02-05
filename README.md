[![Build](https://app.razorsite.co/projects/houndstooth/badge)](https://app.razorsite.co/projects/houndstooth/builds/latest)
[![Maintainability](https://api.codeclimate.com/v1/badges/17e180d74ac7e1fe8bb7/maintainability)](https://codeclimate.com/repos/5c50951ef5fffb7846004347/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/17e180d74ac7e1fe8bb7/test_coverage)](https://codeclimate.com/repos/5c50951ef5fffb7846004347/test_coverage)

Houndstooth UI
---

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quick Start](#quick-start)
- [Advanced](#advanced)
  - [Makefile Usage](#makefile-usage)
  - [Manual Installation](#manual-installation)
  - [Manual Usage](#manual-usage)
  - [Local Services](#local-services)
- [Testing](#testing)
  - [Linting](#linting)
  - [Unit Tests](#unit-tests)
  - [Code Coverage](#code-coverage)

## Getting Started

#### Requirements
- Install [NodeJS](https://nodejs.org/en/download/) `>= 8.x`
- Install [NPM](https://nodejs.org/en/download/) `>= 6.x`
  - `npm install --global npm`

#### Quick Start
- Run `make setup` for initial repo setup
```bash
make setup
```

- Run `make start` to start local version after setup
```bash
make start
```

- Local App running on [localhost:3000](http://localhost:3000)

- See [Advanced > Local Services](#local-services) for details on running against local services

#### Makefile Usage

- **Aliases:**
  - `setup`
    - `init`
    - `rebuild`
  - `reset`
    - `clean`
    - `install`
  - `restart`
    - `install`
    - `start`
  - `rebuild`
    - `reset`
  - `ci-reset`
    - `reset`
  - `ci`
    - `ci-reset`
    - `ci-test`
  - `up`
    - `start`
- **Targets:**
  - `init` - *Initialize local dev environment*
    - Runs `npm `
  - `clean` - *Clean up node_modules directory*
    - Runs `rm -rf node_modules`
  - `install` - *Install dependencies*
    - Runs `npm install`
  - `start` - *Start local dev instance*
    - Runs `npm start`
  - `build` - *Build project*
    - Runs `npm run build`
  - `test` - *Run tests*
    - Runs `npm test`
  - `lint` - *Run linter*
    - Runs `npm run lint`
  - `fix` - *Attempt to fix basic lint issues*
    - Runs `npm run lint:fix`
  - `analyze` - *Run analyzer for npm module debugging*
    - Runs `npm run analyze`
  - `scan` - *Scan for vulnerabilities*
    - Runs `npm audit`
  - `build-dll` - *Build vendor DLL file(s)*
    - Runs `npm run build:dll`
  - `ci-test` - *Run tests for CI (non interactive)*
    - Runs `CI=true npm run ci`

## Advanced

#### Manual Installation
- Install git `pre-push` hook
```bash
ln -s ../../bin/pre-push .git/hooks
```

- Install node_modules
```bash
npm install
```

#### Manual Usage

- Start the React App
```bash
npm start
```

- [Visit local instance](http://localhost:3000)

#### Local Services

- Create file `.env.development.local`, add entries to customize local dev
  - To run against local api:
    - `REACT_APP_API_ROOT_URL=http://localhost:4000`
  - To run against local oauth:
    - `REACT_APP_AUTHORIZE_URL=http://localhost:5000/dev/oauth/authorize`
    - `REACT_APP_CALLBACK_URL=http://localhost:5000/dev/oauth/callback`

## Testing

#### Linting

- Just lint the code and show warnings
```bash
npm run lint
```
- Lint code and attempt to fix simple issues
```bash
npm run lint:fix
```

#### Unit Tests

- Run ReactJS test suite (interactive)
```bash
npm test
```
- Run ReactJS test suite (CI mode - not interactive)
```bash
CI=true npm test
```

#### Code Coverage

- Prep CodeClimate build reporter before build/tests
```bash
bin/cc-test-reporter before-build
```
- Format and upload coverage to CodeClimate
```bash
bin/cc-test-reporter after-build
```
