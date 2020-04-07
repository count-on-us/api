FROM node:12.16 as development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:12.16 as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --prod

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
