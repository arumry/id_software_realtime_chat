FROM node:8.11-alpine
LABEL maintainer="aaronrumery@gmail.com"

RUN apk add --update \
  alpine-sdk \
  python \
  python-dev

COPY . /app
COPY docker/api/run.sh /run.sh

RUN chmod +x /run.sh
RUN chown -R 1000:1000 /app

WORKDIR /app

RUN yarn global add nodemon
RUN yarn install --no-progress

USER node

CMD [ "/run.sh" ]
