# GeeksHubs <img src= "assets/geek-logo.png" width="100"> 

<a>Proyecto Final- BBDD Nankurunaisa.</a>

## Tabla de contenidos

- [Descripción 📝](#Descripción)
- [Tecnologías - Bibliotecas - Herramientas 🛠️](#Tecnologías-y-Bibliotecas-Herramientas)
- [Instalación  🚀](#Instalación)
- [Endpoints ⛏️⚙️](#Endpoints)
- [Contribuciones  🤝](#Contribuciones)
- [Licencia y Copyright📃](#licencia-y-copyright)


## Descripción

Esta API gestiona la información de **Nankurunaisa**. Permite a los usuarios registrarse y acceder a su perfil, así como   programar, modificar, mostrar y eliminar citas  y reservas de viajes. Además, proporciona funciones de autenticación y autorización para garantizar la seguridad de los datos.

## Tecnologías-Bibliotecas-Herramientas

-  **Node.js** <img src= "assets/node-logo.png" width="30">
- **Express.js** <img src= "assets/express-logo.png" width="25" height="25">
- **MongoDB** <img src= "assets/mongodb-logo.jpg" width="30" >
- **Mongoose** <img src= "assets/mongoose-logo.png" width="30">
- **JWT para autenticación** <img src= "assets/jwt-logo.png" width="25">
- **Bcrypt para el hashing de contraseñas** <img src= "assets/bcrypt-logo.jpg" width="30">
- **Postman** <img src="assets/postman-logo.jpg" width="30">
- **Visual Studio Code** <img src="assets/visual-logo.png" width="30">
- **Github** <img src="assets/github-logo.png" width="30">
- **Git** <img src="assets/git-logo.png" width="30">

## Instalación

1. Clona el repositorio: `git clone <url>`
2. Instala las dependencias: `npm install`

## Endpoints

 ### Autenticación

|Verbos HTTP|ROUTE|Función de uso|
|-|:-:|-:|
|**LOGIN** 🎟️|auth/login|Login de Acceso|

- **POST /login**
  - Inicia sesión y devuelve un token **JWT** válido. Este token será necesario para realizar todas las operaciones, puesto que contiene los permisos que el usuario tiene en **NANKURUNAISA**.

### Usuarios

|Verbos HTTP|ROUTE|Función de uso|
|-|:-:|-:|
|**POST** ➕|users|Creación usuario|
|**GET** 🔍|users|Mostrar usuarios|
|**GET** 🔍|users/:_id|Muestra usuario|
|**PUT** ♻️|users/:_id|Modifica usuario|
|**DELETE** 🗑️|users/:_id|Elimina usuario|

- **POST /users**

  - Creación de un usuario.
  - Todos los campos son requeridos. Email y teléfonos son únicos.
  - La contraseña debe cumplir los siguientes parámetros: 8-16 carácteres, 1 mayúscula, 1 dígito y un carácter especial.


- **GET /users**

  - Obtiene todos los usuarios (sólo accesible para administradores). 
  - Parámetros de consulta: **`sort`**, **`search`**, **`role`**.

- **GET /users/:_id**

  - Obtiene el usuario en particular al que corresponde el id de búsqueda.
  - El cliente sólo podrá encontrar su propio perfil, mientras que el admin tendrá acceso a todos los clientes registrados. 

- **PUT /users/:_id**

  - Modifica un usuario existente.
  - Requiere autenticación y permisos adecuados. 

- **DELETE /users/:_id**

  - Elimina un usuario de forma lógica, manteniendo su perfil, pero el campo  **"isDeleted"** pasará a true, permitiendo así tener un registro de todos los usuarios que se han registrado, así como datos del momento de eliminación para posibles consultas.

### Citas 

|Verbos HTTP|ROUTE|Función de uso|
|-|:-:|-:|
|**POST** ➕|appointments|Creación de Citas|
|**GET** 🔍|appointments|Mostrar Citas User|
|**GET** 🔍|appointments/:_id|Mostrar Cita con Id|
|**PUT** ♻️|appointments/:_id|Modifica Cita con Id|
|**DELETE** 🗑️|appointments/:_id|Elimina Cita con Id|

- **GET /appointments**

  - Obtiene todas las citas del usuario autenticado.

- **GET /appointments/:_id**

  - Obtiene una cita específica por ID.
  - Requiere autenticación y permisos adecuados. 
  - Cliente y personal assistant pueden ver su propia cita, el admin cualquiera.

- **POST /appointments**

  - Crea una nueva cita.
  - Si ya existe una cita en ese día y hora, será indicado en el proceso de creación.
  - Requiere autenticación y permisos adecuados, permitiendo que sólo el admin pueda crear una cita para una persona que no sea ella misma. 

- **PUT /appointments/:_id**

  - Modifica una cita existente.
  - Requiere autenticación y permisos adecuados, permitiendo que sólo el admin pueda modificar una cita para una persona que no sea ella misma. 

- **DELETE /appointments/:_id**

  - Elimina una cita existente de forma lógica, igual que el usuario.
  - Requiere autenticación y permisos adecuados.

- **PUT  /appointments/:_id**

  - Recupera una cita que ha sido eliminada.
  - Requiere autenticación y permisos adecuados.

### Destinos

|Verbos HTTP|ROUTE|Función de uso|
|-|:-:|-:|
|**POST** ➕|destinations|Creación de Destinos|
|**GET** 🔍|destinations|Mostrar Destinos
|**GET** 🔍|destinations/:_id|Mostrar Destino con Id|
|**PUT** ♻️|destinations/:_id|Modifica Destino con Id|
|**DELETE** 🗑️|appointments/:_id|Elimina Destino con Id|

- **GET /destinations**

  - Obtiene todas los destinos de Nankurunaisa.

- **GET /destinations/:_id**

  - Obtiene un destino específico por ID.
  - Requiere autenticación y permisos adecuados. 

- **POST /destinations**

  - Crea uno nuevo destino.

- **PUT /destinations/:_id**

  - Modifica un destino existente.

- **DELETE /destinations/:_id**

  - Elimina un destino existente de forma lógica, igual que el usuario o las citas.
  - Requiere autenticación y permisos adecuados.

### Reservas

|Verbos HTTP|ROUTE|Función de uso|
|-|:-:|-:|
|**POST** ➕|bookings|Creación de Reservas|
|**GET** 🔍|bookings|Mostrar Reserva|
|**GET** 🔍|bookings/:_id|Mostrar Reserva con Id|
|**PUT** ♻️|bookings/:_id|Modifica Reserva con Id|
|**DELETE** 🗑️|bookings/:_id|Elimina Reserva con Id|

- **GET /bookings**

  - Obtiene todas las reservas del usuario autenticado.

- **GET /bookings/:_id**

  - Obtiene una reserva específica por ID.
  - Requiere autenticación y permisos adecuados. 
  - Cliente puede ver su reserva y el admin cualquiera.

- **POST /bookings**

  - Crea una nueva reserva.
  - Requiere autenticación y permisos adecuados, permitiendo que sólo el admin pueda crear una reserva para una persona que no sea ella misma. 

- **PUT /bookings/:_id**

  - Modifica una reserva existente.
  - Requiere autenticación y permisos adecuados, permitiendo que sólo el admin pueda modificar una cita para una persona que no sea ella misma. 

- **DELETE /appointments/:_id**

  - Elimina una reserva existente de forma lógica, igual que el usuario.
  - Requiere autenticación y permisos adecuados.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras algún problema o tienes una mejora, ¡no dudes en abrir un problema o enviar un pull request!

### Licencia y Copyright

Este proyecto pertenece a **Ángel Díaz Calleja** y ha sido creado como proyecto del Bootcamp Full Stack Developer de GeeksHubs Academy.

<img src= "assets/geek-logo.png" width="100"> 



