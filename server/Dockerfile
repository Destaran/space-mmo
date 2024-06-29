FROM node:20 as base

FROM base as builder

WORKDIR /server

COPY package.json /server
COPY yarn.lock /server

RUN yarn

FROM builder as source

COPY start.sh /server
COPY nest-cli.json /server
COPY tsconfig.json /server
COPY tsconfig.build.json /server
COPY .prettierrc /server 
COPY .eslintrc.js /server
COPY src /server
COPY test /server

FROM source as dev

CMD ["yarn", "start:dev"]
