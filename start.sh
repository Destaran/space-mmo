#!/bin/bash

yarn install
yarn install --cwd ./server
yarn install --cwd ./client

docker compose up --build

