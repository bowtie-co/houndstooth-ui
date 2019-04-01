#!/bin/sh

set -e

APP_ENV=${APP_ENV:-development}

# if [[ "${APP_ENV}" == "development" ]]; then
#   npm install
# fi

exec "$@"
