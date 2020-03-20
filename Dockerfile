FROM node:10-alpine as build-dep
WORKDIR /app
COPY /capg/package.json .
COPY /capg/package-lock.json .
RUN npm install
COPY /capg ./
RUN npm run build

FROM node:10-alpine 
WORKDIR /api
COPY /api/package.json .
COPY /api/package-lock.json .
RUN npm install
COPY /api ./
COPY --from=build-dep /usr/src/app/build /usr/src/api
CMD ["npm","start"]
