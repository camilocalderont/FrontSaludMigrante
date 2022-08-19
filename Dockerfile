#stage 1
FROM node:latest as node
WORKDIR /app
COPY FrontSaludMigrante/ .
RUN npm install && npm run build --prod

#stage 2
FROM nginx:alpine
#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 
COPY --from=node /app/dist/front-salud-migrantes /usr/share/nginx/html
EXPOSE 80
