FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm run build

# Serve avec Nginx
FROM nginx:stable-alpine

RUN apk add --no-cache curl

COPY --from=builder /app/dist /usr/share/nginx/html

COPY ../nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
