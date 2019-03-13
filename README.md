[![Maintainability](https://api.codeclimate.com/v1/badges/602c77fbbb46728dfac1/maintainability)](https://codeclimate.com/github/bowtie-co/houndstooth-ui/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/602c77fbbb46728dfac1/test_coverage)](https://codeclimate.com/github/bowtie-co/houndstooth-ui/test_coverage)

[![GitHub contributors](https://img.shields.io/github/contributors/bowtie-co/houndstooth-ui.svg?style=flat-square)](https://github.com/bowtie-co/houndstooth-ui/graphs/contributors)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/bowtie-co/houndstooth-ui.svg?style=flat-square)](https://github.com/bowtie-co/houndstooth-ui/pulls)
[![GitHub closed pull requests](https://img.shields.io/github/issues-pr-closed/bowtie-co/houndstooth-ui.svg?style=flat-square)](https://github.com/bowtie-co/houndstooth-ui/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+)
[![GitHub issues](https://img.shields.io/github/issues/bowtie-co/houndstooth-ui.svg?style=flat-square)](https://github.com/bowtie-co/houndstooth-ui/issues)
[![GitHub closed issues](https://img.shields.io/github/issues-closed/bowtie-co/houndstooth-ui.svg?style=flat-square)](https://github.com/bowtie-co/houndstooth-ui/issues?utf8=%E2%9C%93&q=is%3Aissue+is%3Aclosed+)

Houndstooth UI
---

A Free CMS for Jekyll and Github

Houndstooth gives content editors a simple interface to publish changes to static sites hosted on Github.

[Houndstooth.work](https://houndstooth.work)

## Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quick Start](#quick-start)
- [Advanced](#advanced)
  - [Bowtie Dev Usage](#bowtie-dev-usage)
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

- Install git `pre-push` hook
```bash
ln -s ../../bin/pre-push .git/hooks
```

- Install node_modules
```bash
npm install
```

- Start the React App
```bash
npm start
```

- [Visit local instance](http://localhost:3000)

## Advanced

#### Bowtie Dev Usage

*Requires `btdev` from `dev-setup` to work!*

- Run `make setup` for initial repo setup
```bash
make setup
```

- Run `make start` to start local version after setup
```bash
make start
```

- Run `make rebuild` to rebuild local version after pulling changes
```bash
make rebuild
```

- Local App running on [https://houndstooth.bowtie.dev](https://houndstooth.bowtie.dev)

- See [Advanced > Local Services](#local-services) for details on running against local services


#### Local Services

- Create file `.env.development.local`, add entries to customize local dev
  - *Filename is `.env.btdev.local` to override local dev env using btdev*
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



