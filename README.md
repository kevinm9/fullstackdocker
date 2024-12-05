
  
# levantar aplicativo con DOCKER (docker-compose.yml)

en caso de errores seguir las instrucciones de levantar el aplicativo sin docker 

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

 mensaje x consola  del correcto despliegue 

`Started BackendApplication in 12.233 seconds (process running for 13.244)`
o
`Completed initialization in 3 ms`


    
el   docker-compose.yml buscara dentro de las carpeta backend y frotend los archivos Dockerfile para levantarlos en contenedores.
abrir los siguientes link:

    http://localhost:4200

 `http://localhost:8080`
 
`http://localhost:8080/swagger-ui/index.html`.




  ## levantar proyecto sin docker
  en cada carpeta backend y frotend estan las instrucciones para levantar en ambientes de desarollo 

  - recordar crear la base de datos
  - al iniciar el spring boot crea las tablas de las entidades
  - se llena la bd con registros automaticamente al iniciar la app de spring con del data.sql 



****************new release ******************
se actualizo typescript y node del contenedor para que se pueda levantar
[![captura](https://github.com/kevinm9/fullstackdocker/blob/nuevocambio1792024/captura.png  "captura")](https://github.com/kevinm9/fullstackdocker/blob/nuevocambio1792024/captura.png  "captura")


[![captura](https://raw.githubusercontent.com/kevinm9/fullstackdocker/refs/heads/main/deploydonweb.png  "captura")](https://raw.githubusercontent.com/kevinm9/fullstackdocker/refs/heads/main/deploydonweb.png  "captura")

