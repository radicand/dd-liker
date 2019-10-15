FROM node:12-alpine

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i

COPY ./*.ts ./

ENTRYPOINT ["npx", "ts-node", "index"]