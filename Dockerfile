FROM node:14-alpine as build-stage

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY .eslintignore ./
COPY .eslintrc.js ./
COPY .pug-lintrc.js ./
COPY .stylelintrc.json ./
COPY babel.config.js ./
COPY postcss.config.js ./
COPY public ./public
COPY src ./src
COPY tests ./tests
COPY tsconfig.json ./
COPY .env ./
COPY vue.config.js ./

RUN yarn build

# production-stage
FROM nginx:1.17.0-alpine

COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/default.conf /etc/nginx/conf.d/default.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENV \
    API_URL=http://192.168.49.103:8080/api/v1/

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
