#!/bin/bash

set -e

APP_ENV=staging
GENERATE_SOURCEMAP=true

if [ "$BRANCH" == "production" ]; then
  APP_ENV=production
  # GENERATE_SOURCEMAP=false
fi

npm install --production

npm test

echo "Building for env: $APP_ENV"

GENERATE_SOURCEMAP=$GENERATE_SOURCEMAP APP_ENV=$APP_ENV npm run build
