# Build the go application into a binary
FROM golang:1.16-alpine as backendBuilder
WORKDIR /app
ADD ./server .
RUN go mod tidy && CGO_ENABLED=0 GOOS=linux go build -a -o server-linux ./cmd


FROM node:14-alpine as frontendBuilder
WORKDIR /app
ADD ./.* ./
ADD ./public ./public
ADD ./src ./src
ADD ./babel.config.js ./
ADD ./quasar.conf.js ./
ADD ./package.json ./
ADD ./*lock* ./
RUN yarn && yarn build


FROM caddy:2.3.0-alpine
WORKDIR /app
RUN apk add --update supervisor ca-certificates && rm  -rf /tmp/* /var/cache/apk/*

COPY --from=backendBuilder /app/server-linux ./server-linux
COPY --from=frontendBuilder /app/dist/spa ./public

COPY ./docker/supervisord.conf /etc/
COPY ./docker/Caddyfile /etc/caddy/

ENV ORIGINS_ALLOWED=""
ENV SERVER_HTTP_HOST="127.0.0.1"
ENV SERVER_HTTP_PORT="8843"

EXPOSE 8080

ENTRYPOINT ["supervisord", "--nodaemon", "--configuration", "/etc/supervisord.conf"]
