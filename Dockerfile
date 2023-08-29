FROM node:16-alpine as base
USER root
RUN apk update
WORKDIR /app
ADD ./package* /app/
RUN ln -s /app/package.json /package.json && ln -s /app/package-lock.json /package-lock.json

FROM base as development
RUN apk add git openssh-client
RUN cd / && npm install
ENV PATH=$PATH:/node_modules/.bin

FROM base as production
COPY ./src /app
RUN cd / && mkdir node_modules && chown node:node node_modules
RUN cd / && mkdir dist && chown node:node dist
USER node
RUN cd / && npm ci --only-production
ENV PATH=$PATH:/node_modules/.bin
RUN cd /app && tsc
CMD node /dist/index.js