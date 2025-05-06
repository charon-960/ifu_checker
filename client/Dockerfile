FROM node:18 AS builder

WORKDIR /app

COPY ./client/package*.json ./
COPY ./client/tsconfig.json ./
COPY ./client/tsconfig.app.json ./
COPY ./client/tsconfig.node.json ./
COPY ./client/vite.config.ts ./
COPY ./client/public ./public
COPY ./client/index.html ./
COPY ./client/src ./src

RUN npm install

RUN npm run build

# Serve avec Nginx
FROM nginx:stable-alpine

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
