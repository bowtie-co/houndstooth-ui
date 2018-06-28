Houndstooth
---

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
- [Testing](#testing)
  - [Linting](#linting)
  - [Unit Tests](#unit-tests)

## Getting Started

#### Requirements
- Install [Yarn](https://yarnpkg.com/en/docs/install#mac-stable) `>= 1.5.0`

- API must be be running at http://localhost:4000
  - [See the API README.md](https://github.com/bowtie-co/sls-houndstooth-api/blob/master/README.md) for more info

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
