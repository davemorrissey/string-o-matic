#!/usr/bin/env bash
COMMIT=`git rev-parse --short HEAD`
DATE=`date +%Y-%m-%d`
rm .env
echo "REACT_APP_COMMIT_NUMBER=${COMMIT}" >> .env
echo "REACT_APP_BUILD_DATE=${DATE}" >> .env