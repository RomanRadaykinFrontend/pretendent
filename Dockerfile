FROM node:10.16.0-alpine as build-stage

WORKDIR /app

COPY .yarnrc ./
COPY package*.json ./
COPY yarn.lock ./

RUN yarn

COPY .eslintrc.js ./
COPY .pug-lintrc.js ./
COPY .stylelintrc.json ./
COPY babel.config.js ./
COPY postcss.config.js ./
COPY ../frontend/public ./public
COPY ../frontend/src ./src
COPY ../frontend/tests ./tests
COPY tsconfig.json ./
COPY vue.config.js ./

RUN yarn build

# production-stage
FROM nginx:1.17.0-alpine

COPY ../frontend/docker/nginx.conf /etc/nginx/nginx.conf
COPY ../frontend/docker/default.conf /etc/nginx/conf.d/default.conf
COPY ../frontend/docker/entrypoint.sh /usr/local/bin/entrypoint.sh
COPY --from=build-stage /app/dist /usr/share/nginx/html

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
