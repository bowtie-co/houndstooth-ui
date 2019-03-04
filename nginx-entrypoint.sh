#!/bin/sh

set -e

APP_ENV=${APP_ENV:-staging}
APP_DIR=${BASE_DIR}/${APP_ENV}
SRV_DIR=/usr/share/nginx/html

if [ ! -d ${APP_DIR} ]; then
  echo "Unable to location app dir: ${APP_DIR}"
  exit 1
fi

if [ -d ${SRV_DIR} ]; then
  echo "Found existing SRV_DIR: ${SRV_DIR}, removing it ..."
  rm -rf ${SRV_DIR}
fi

ln -s ${APP_DIR} ${SRV_DIR}

echo "SERVING FROM APP DIR: ${APP_DIR}"

exec "$@"
