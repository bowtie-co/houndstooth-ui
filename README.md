[![Build](https://app.razorsite.co/projects/houndstooth/badge)](https://app.razorsite.co/projects/houndstooth/builds/latest)
[![Maintainability](https://api.codeclimate.com/v1/badges/17e180d74ac7e1fe8bb7/maintainability)](https://codeclimate.com/repos/5c50951ef5fffb7846004347/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/17e180d74ac7e1fe8bb7/test_coverage)](https://codeclimate.com/repos/5c50951ef5fffb7846004347/test_coverage)

Houndstooth UI
---

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
- [Testing](#testing)
  - [Linting](#linting)
  - [Unit Tests](#unit-tests)
  - [Code Coverage](#code-coverage)
- [Advanced](#advanced)
  - [Local Services](#local-services)
## Getting Started

#### Requirements
- Install [NodeJS](https://nodejs.org/en/download/) `>= 8.x`
- Install [NPM](https://nodejs.org/en/download/) `>= 6.x`
  - `npm install --global npm`

#### Installation
- Install git `pre-push` hook
```bash
ln -s ../../bin/pre-push .git/hooks
```

- Install node_modules
```bash
npm install
```

#### Usage

- Start the React App
```bash
npm start
```

- [Visit local instance](http://localhost:3000)

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

## Advanced

#### Local Services

- Create file `.env.development.local`, add entries to customize local dev
  - To run against local api:
    - `REACT_APP_API_ROOT_URL=http://localhost:4000`
  - To run against local oauth:
    - `REACT_APP_AUTHORIZE_URL=http://localhost:5000/dev/oauth/authorize`
    - `REACT_APP_CALLBACK_URL=http://localhost:5000/dev/oauth/callback`

