#!/bin/bash

set -e

APP_ENV=preview
GENERATE_SOURCEMAP=true

if [ "$BRANCH" == "production" ]; then
  APP_ENV=production
  # GENERATE_SOURCEMAP=false
elif [ "$BRANCH" == "master" ]; then
  APP_ENV=staging
fi

npm install

npm test

echo "Building for env: $APP_ENV"

GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP APP_ENV=$APP_ENV npm run build
