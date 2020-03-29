# ========= BUILD =========
FROM node:10-alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --production

COPY /capg . 

RUN npm run build

# ========= RUN =========
FROM nginx:1.17

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
