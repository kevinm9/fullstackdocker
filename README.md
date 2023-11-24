
  
# levantar aplicativo con DOCKER (docker-compose.yml)

  ## Requisitos
- DOCKER

## levantar proyecto con docker

- clonar el repositorio
- situarse dentro del repositorio y correr el siguiente comando.

      docker compose up --build

  el cual levantara y creara los siguientes contenedores:
  - base de datos (mysql)
  - backend (springboot)
  - frontend(angular)

el   docker-compose.yml buscara dentro de las carpeta backend y frotend los archivos Dockerfile para levantarlos en contenedores.
abrir los siguientes link:

    HTTP://http://localhost:4200

 `localhost:8080`
 
`http://localhost:8080/swagger-ui/index.html`.

  ## levantar proyecto sin docker
  en cada carpeta backend y frotend estan las instrucciones para levantar en ambientes de desarollo 