FROM node:10-alpine as build-dep
WORKDIR /app
COPY /capg/package.json .
COPY /capg/package-lock.json .
RUN npm install
COPY /capg .
RUN npm run build

FROM node:10-alpine 
WORKDIR /app/api
COPY /api/package.json .
COPY /api/package-lock.json .
RUN npm install
COPY --from=build-dep /app/build .
CMD ["npm","start"]