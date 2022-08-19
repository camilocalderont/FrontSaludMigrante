#stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install && npm run build --prod

#stage 2
FROM nginx:alpine
COPY --from=node /app/dist/front-salud-migrantes /usr/share/nginx/html
EXPOSE 80
