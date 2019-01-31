#!/bin/bash

set -e

export CC_TEST_REPORTER_ID=ee26d23b8aa32895e62199d77e80c885e41ffb580127b8a960fbebf67d20c779

APP_ENV=preview
GENERATE_SOURCEMAP=true

if [ "$BRANCH" == "production" ]; then
  APP_ENV=production
  # GENERATE_SOURCEMAP=false
elif [ "$BRANCH" == "master" ]; then
  APP_ENV=staging
fi

bin/cc-test-reporter before-build

npm install

npm test

echo "Building for env: $APP_ENV"

GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP APP_ENV=$APP_ENV npm run build

bin/cc-test-reporter after-build
