FROM node:20-alpine

#Dependencies
WORKDIR /urs/src/app

COPY / /urs/src/app/

RUN npm install

CMD ["npm", "start"]