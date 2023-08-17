#!/usr/bin/env bash

rtx x node -- npm install -g yarn
cp .env_sample .env
echo "APP_DOMAIN=\"$(gp url 3000 | cut -f 3 -d /)\"" >> .env
echo 'APP_PROTOCOL="https://"' >> .env
rtx x ruby -- gem install foreman
bin/setup
bin/webpack
