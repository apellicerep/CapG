FROM node:10-alpine

WORKDIR /app

COPY /api .

RUN npm install

CMD ["npm","start"] 