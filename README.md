Houndstooth
---

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
- [Testing](#testing)
  - [Linting](#linting)
  - [Unit Tests](#unit-tests)
- [Advanced](#advanced)
  - [Local Services](#local-services)
## Getting Started

#### Requirements
- Install [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) `>= 1.5.0`

#### Installation
- Install git `pre-push` hook
```bash
ln -s ../../bin/pre-push .git/hooks
```

- Install node_modules (using yarn)
```bash
yarn install
```

#### Usage

- Start the React App
```bash
yarn start
```

- [Visit local instance](http://localhost:3000)

## Testing

#### Linting

- Just lint the code and show warnings
```bash
yarn lint
```
- Lint code and attempt to fix simple issues
```bash
yarn lint:fix
```

#### Unit Tests

- Run ReactJS test suite (interactive)
```bash
yarn test
```
- Run ReactJS test suite (CI mode - not interactive)
```bash
CI=true app yarn test
```

## Advanced

#### Local Services

- Create file `.env.development.local`, add entries to customize local dev
  - To run against local api:
    - `REACT_APP_API_ROOT_URL=http://localhost:4000`
  - To run against local oauth:
    - `REACT_APP_AUTHORIZE_URL=http://localhost:5000/dev/oauth/authorize`
    - `REACT_APP_CALLBACK_URL=http://localhost:5000/dev/oauth/callback`