FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
#COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /usr/src/app/dist/frontend /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/angular-14-jwt-auth /usr/share/nginx/html