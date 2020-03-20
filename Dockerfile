FROM node:10-alpine as build-dep
WORKDIR /app
COPY /capg/package.json /cap/package-lock.json .
RUN npm install
COPY /capg .
RUN npm run build

FROM node:10-alpine 
WORKDIR /api
COPY /capg/package.json /cap/package-lock.json .
RUN npm install
COPY --from=build-dep /app/build .
CMD ["npm","start"]