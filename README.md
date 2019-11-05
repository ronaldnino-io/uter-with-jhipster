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
    

## UTER PLATFORM 

UTER PLATFORM fue implementado con una herramienta open source llamada  [JHipster](https://www.jhipster.tech/) que ayuda en la generación de código robusto y respetando las buenas practicas. Genera código java usando spring boot para el lado del backend y Angular o React para el lado del cliente.






## Autores ✒️

* **Óliver Hierro** - *Documentación* - [ohierro](https://github.com/ohierro)
* **Ronald Niño** - *Java Developer* - [ronaldnino-io](https://github.com/ronaldnino-io)

## Expresiones de Gratitud 🎁

* Gracias a Óliver Hierro y Eliana Solis por ser posible esta prueba técnica 📢
* Agradezco publicamente por la oportunidad que me esta ofreciendo Hiberus 🤓.
