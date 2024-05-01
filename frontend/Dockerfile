FROM node:20.10.0 as builder

#FROM node:lts-alpine as builder

WORKDIR /frontend

ENV PATH /frontend/node_modules/.bin:$PATH

COPY package.json /frontend/package.json

RUN npm install

COPY . ./


