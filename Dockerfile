FROM oven/bun:latest as base
USER root
RUN apt-get -y update
WORKDIR /app
ADD ./package* /app/
RUN ln -s /app/package.json /package.json && ln -s /app/bun.lockb /bun.lockb

FROM base as development
RUN apt-get -y install git openssh-client
RUN cd / && bun install
ENV PATH=$PATH:/node_modules/.bin
WORKDIR /app
CMD bun --hot /app/src/rest/server.ts

FROM base as production
COPY ./src /app
#RUN cd / && mkdir node_modules && chown node:node node_modules
#RUN cd / && mkdir dist && chown node:node dist
#USER node
RUN cd / && bun install
ENV PATH=$PATH:/node_modules/.bin
WORKDIR /app
#RUN cd /app && tsc
CMD "bun --hot /app/src/rest/server.ts"