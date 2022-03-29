FROM node:16.14.2-alpine

WORKDIR /react

COPY ./package*.json ./

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true
