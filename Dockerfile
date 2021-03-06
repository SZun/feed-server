FROM node:11-alpine

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

CMD [ "yarn", "start" ]