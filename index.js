// La sintaxis de Common JS: Esta sintaxis no es nativa de JS pero Node y Express la adoptaron porque es la forma en que se lograba modularizar el código antes.
// const express = require('express');

// Con la sintaxis de imports. Para que funcione en el package debemos informar que queremos utilizar los módulos colocando "type": "module"
import express from 'express';
// Importar el router
import router from './routes/index.js';
// Importar la conexión a la BDD
import db from './config/db.js';
// Importar las variables de entorno
import dotenv from 'dotenv/config';

const app = express();

// Conectar la BDD
db.authenticate()
  .then(() => console.log('Base de Datos Conectada'))
  .catch(error => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Ejemplos
// Aqui vemos un ejemplo de routing, pero no es lo mas recomendable, la mejor práctica consiste en que estas tengan su propio archivo
// app.get('/', (req, res) => { // req (request): lo que enviamos, la petición que hacemos - res (response): lo que express nos responde

// 	// .send() se utiliza para mostrar contenido estático en la pantalla.
// 	// .json() se utiliza para enviar un json
// 	// .render() es el mas utilizado, se usa para mostrar vistas

// 	//  res.send('Hola Mundo');
// 	 res.send('Inicio');
// });

// app.get('/nosotros', (req, res) => {
// 	 res.send('Nosotros');
// });
// app.get('/contacto', (req, res) => {
// 	 res.send('Contacto');
// });

// Habilitar PUG
// Aqui le decimos a Express que estaremos usando a PUG como motor de vistas
app.set('view engine', 'pug');


// Crear un middleware propio
// Obtener el año actual. Next permite ir de un middleware al otro para que no se paralice la cadena de ejecución.
// Request: Lo que se envía al servidor
// Response: Lo que se recibe desde el servidor
// Next: Se terminó la ejecución, pasemos a la siguiente línea de código. Esto es importante porque permite que la ejecución del código no se paralice. Importante: como no sabemso si express tiene otros middleware ejecutando, next nos asegura que se seguirán en la pila de ejecución. A veces next se queda pegado, para forzarlo podemos usar return
app.use((req, res, next) => {
  // console.log(res);
  // Locals son como variables internas de express que nos permiten pasar información de un archivo a otro en Express
  // res.locals.unaVariable = 'Una Nueva Variable';
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = 'Agencia de Viajes';
  // return next();
  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));


// Definir la carpeta Pública
app.use(express.static('public'));

// Agregar el router
// Usamos use ya que engloba todos los verbos de http
// Lo que digo con la siguiente instruccion es que a partir de la diagonal agregue todas las rutas que tengo establecidas en el archivo y con use me aseguro que soporte todos los verbos http
app.use('/', router); // Importante, cuando hice la prueba con pasar variables entre documentos de express encontré en el foro del curso que el router debe estar por debajo de los app.use

app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});