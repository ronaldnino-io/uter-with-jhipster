## UTER

La empresa Uster desea realizar una aplicación que gestione la reserva de vehículos por parte de los clientes

Para ello, durante la fase de análisis se plantea el siguiente diagrama E-R para la aplicación:

![Diagrama de ER](./USTER.png)

Habrá que modela una aplicación que responda a la siguiente funcionalidad:

- CRUD de `vehículos`
- CRUD de `conductores`
- Listado de `viajes` realizados
- Gestión de un nuevo viaje. Para ello, habrá que tener en cuenta:
    - Debe ser un proceso en 3 fase: selección de fecha, selección de vehículo, selección de conductor.
    - En la fase de selección de vehículo, sólo se podrán reservar aquellos que **no tengan ya un viaje programado ese día**
    - En la fase de selección de conductor, sólo se podrá seleccionar un conductor que **no tenga un viaje programado ese día Y que tenga la misma licencia que el vehículo seleccionado**.
    

## API REST DE UTER 

Esta implementación de **UTER API REST** tiene como fin la exposición de los recursos elementales que serán consumidos por los clientes de la plataforma UTER.


### Pre-requisitos 📋
```
1.- JDk 1.8 o superior
2.- Maven 3
3.- Spring Boot 2.1.9
4.- Springfox-swagger2 2.9.2
5.- Springfox-swagger-ui 2.9.2
6.- H2 1.4.199
7.- IDE - Eclipse or Spring Tool Suite 4 (STS)
```
## Despliegue del api rest 📦

Puedes ver la documentación de la api y puedes probarla en línea accediendo al siguiente link ->
[API REST UTER](http://ec2-34-207-66-81.compute-1.amazonaws.com:8080/swagger-ui.html#)

![Swagger de la aplicación](./swagger.png)

## FRONTEND DE UTER  

### Pre-requisitos 📋

```
1.- Node v12.13.0
2.- NPM 6.12.0
3.- @material-ui/core  ^4.5.2
4.- @material-ui/icon ^4.5.1
5.- @material-ui/styles ^4.5.2
6.- axios ^0.19.0
7.- react ^16.11.0
8.- react-dom ^16.11.0
9.- react-router-dom ^5.1.2
10.- react-scripts 3.2.0
12.- Visual Studio Code
```

## Despliegue del frontend de uter 📦

Puedes acceder al fontend de uter en el siguente link -> [Frontend de UTER](http://ec2-34-207-66-81.compute-1.amazonaws.com)

![Frontend de uter](./front-end.png)

## Autores ✒️

* **Óliver Hierro** - *Documentación* - [ohierro](https://github.com/ohierro)
* **Ronald Niño** - *Java Developer* - [ronaldnino-io](https://github.com/ronaldnino-io)

## Expresiones de Gratitud 🎁

* Gracias a Óliver Hierro y Eliana Solis por ser posible esta prueba técnica 📢
* Agradezco publicamente por la oportunidad que me esta ofreciendo Hiberus 🤓.
