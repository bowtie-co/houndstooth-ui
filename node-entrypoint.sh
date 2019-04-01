#!/bin/sh

set -e

APP_ENV=${APP_ENV:-dev}

# if [[ "${APP_ENV}" == "development" ]]; then
#   npm install
# fi

exec "$@"
