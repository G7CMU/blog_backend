#!/bin/sh

export ENV=production

git checkout master
git pull

npm i -g yarn
npm i -g ts-node
yarn install
yarn build
yarn start