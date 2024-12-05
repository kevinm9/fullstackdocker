# Etapa de construcción de la aplicación Angular
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción con Nginx
FROM nginx:latest
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/angular-14-jwt-auth /usr/share/nginx/html

# Copiar el archivo de configuración de la variable de entorno

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
#CMD ["nginx", "-g", "daemon off;"]
