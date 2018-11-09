#!/bin/bash

APP_ENV=staging

if [ "$BRANCH" == "production" ]; then
  APP_ENV=production
fi

npm install

npm test

echo "Building for env: $APP_ENV"

APP_ENV=$APP_ENV npm run build
