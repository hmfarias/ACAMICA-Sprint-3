API TRAVEL
Ejercicio correspondiente al Workshop Integrador del Sprint N潞 3 de la carrera Desarrollador Web Full Stack dictado por ACAMICA 

Comenzando 馃殌
Estas instrucciones te permitir谩n obtener una copia del proyecto en funcionamiento en tu m谩quina local para prop贸sitos de desarrollo y pruebas.

Mira Deployment para conocer como desplegar el proyecto.

Pre-requisitos 馃搵
Editor de C贸digo (Visual Studio Code o similar)
NodeJS
Express
XAMPP
MySQL
Workbench
Postman

Instalaci贸n 馃敡

Paso 1: 
Crea una carpeta local para albergar el repositorio

Paso 2:
Posicionate en la carpeta creada y clona el repositorio:
  git clone https://github.com/hmfarias/API-Travel.git

Con esto, tendras creada la estructura de archivos y el contenido del BackEnd de la aplicaci贸n.  

PAso 3:
Ejecuta XAMPP y activa el Servidor MySQL. Luego ingresa a Workbench
    
Paso 4: 
En Workbench crea un Schena con el nombre "travel"

Paso 5: 
En Workbench ir al menu: FILE > Open SQL Script y en la ventana de selecci贸n de archivo, navega dentro de la carpeta local que creaste, hasta la carpeta "./travel-server / scriptsSQL-postman". 
Dentro de esa carpeta elije el archivo "Create Travel Tables.sql". 
Ejecuta ese script en Workbench. Con esto tendr谩s creadas las tablas necesarias para utilizar en la API (siempre dentro del schema "travel".

Paso 6:
En Workbench ir al menu: FILE > Open SQL Script y en la ventana de selecci贸n de archivo, navega hasta la carpeta "./travel-server / scriptsSQL-postman". 
Dentro de esa carpeta elije el archivo "Inserts in travel tables.sql". 
Ejecuta ese script en Workbench. Con esto tendr谩s datos de prueba en las tablas creadas.

Paso 7:
Ingresa a tu editor de C贸digo (Visual Studio Code o similar).
Abre una ventana de terminal y posicionate en la carpeta local que creaste y dentro de 茅sta en la carpeta "travel-server". 
Escribe npm install. Con eso tendras instaladas todas las Dependencias necesarias

Paso 8:
Ejecuta node server.js o bien nodemon server.js. Esto levantar谩 el servidor y podr谩s verificar en la pantalla de la terminal, que se ha conectado a la Base "travel".

Paso 9: 
Ingresa a Postman y ve al menu y selecciona ARCHIVO / IMPORTAR y da click en el bot贸n "Cargar Archivo:.
Navega dentro de la carpeta local que creaste, e ingresa a la carpeta "./travel-server / scriptsSQL-postman" y selecciona el archivo "API Travel.postman_collection.json""
Esto crear谩 una colecci贸n en Postman con el nombre API Travel, en donde podr谩s encontrar distintos Requests para probar la API.


Ejecutando las pruebas 鈿欙笍

En primer lugar deber谩s ejecutar el Request de LOGIN, ya que deber谩s obtener el JWT en la respuesta, para pegarlo despu茅s en cada request que utilices.

Podr谩s utilizar las distintas Requests creadas en Postman, para:
Hacer LOGIN (necesario para ejecutar el resto)
Traer todos los PAQUETES
Traer todos los USUARIOS
Traer todas las COMPRAS
Traer una COMPRA por ID
Traer un USUARIO por ID
Traer un PAQUETE por ID
Agregar un PAQUETE
Agregar una COMPRA
Agregar un USUARIO
Actualizar un PAQUETE
Actualizar una COMPRA
Eliminar una COMPRA (solo con fines did谩cticos, pues no es recomendable hacer delete en una API en produccu贸n)
Eliminar un PAQUETE (solo con fines did谩cticos, pues no es recomendable hacer delete en una API en produccu贸n)


Construido con 馃洜锔?
JavaScript
NodeJS
Express
Sequelize
MySQL


Autores 鉁掞笍
Marcelo Farias
Santiago Circo

Gracias a nuestro Squad Lead Dany Javier Bautista Monta帽a, por su direcci贸n y colaboraci贸n en el proyecto. 馃巵
