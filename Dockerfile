FROM node:16.14.2

WORKDIR /usr/src/app

#ENV PATH /app/node_modules/.bin:$PATH

#COPY ./package*.json ./

#RUN cat package.json

#RUN npm install
#RUN npm install react-scripts -g

#RUN cd node_modules && ls

#COPY . .

#CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true

RUN npm install -g react-scripts

RUN chown -Rh node:node /usr/src/app

USER node

EXPOSE 3000

CMD [ "sh", "-c", "npm install && npm run start" ]

