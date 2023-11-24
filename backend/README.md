# Backend

## Requisitos

- JAVA 17
- MAVEN
- MYSQL
- GIT

## Configuración con docker  (DOCKERFILE)

configurado para mediante el docker-compose.yml se envie las variables de entorno y en caso de que estas no lleguen tiene valores por default que se puede ejecutar sin problema

```
spring.datasource.url=${DATABASE_URL\:jdbc\:mysql\://db\:3306/test}
spring.datasource.username=${MYSQL_USER\:root}
spring.datasource.password=${MYSQL_PASSWORD\:root}
```
  

una vez configurada y creada la base de dato en este caso `test`ya que esa se configuro en el `application.properties`
destacar que por default si en la variables de entorno no existen tomara este aspecto el `application.properties`

```
spring.datasource.url=jdbc:mysql://localhost:3306/test
spring.datasource.username=root
spring.datasource.password=root
```
  

## Configuración sin usar docker

- clonar el repositorio 
- cambiar de rama a la mas actualizado con el ultimo commit si es el caso
- configurar la conexión y creación de la base de datos   

actualizar la conexión de la base de datos en `application.properties` o crea tu propio `application-local.properties` .
en mi caso uso `laragon` `https://laragon.org/download/index.html` pero pueden usar `xampp` O  `wamp` ,donde levanto la base de datos para consumirla con el backend es `laragon`  y alli el usuario es root y la clave esta definida en blanco ,solo hay que declarar como se llamara la base de datos este caso es `test` y el puerto de esta base de datos es `3306` todo configurado por default por `laragon`

    spring.datasource.url=jdbc:mysql://localhost:3306/test
    
    spring.datasource.username=root
    
    spring.datasource.password=
    

  

una vez configurada y creada la base de dato en este caso `test`ya que esa se configuro en el `application.properties`



## Ejecutar

ejecutar el siguiente comando.
  
```

mvn spring-boot:run

```

  Después que inicie la app del backend puede consultar `localhost:8080`.

  O puede consultar la documentacion del api rest en `http://localhost:8080/swagger-ui/index.html`.

## Further readings

  

* [Maven docs](https://maven.apache.org/guides/index.html)

* [Spring Boot reference](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)

* [Spring Data JPA reference](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
