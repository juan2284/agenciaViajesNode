// Importante que cuando el proyecto se empiece a llenar de rutas, es recomendable llevarlas a su propio documento
// Importante, en el archivo index.js de la raiz tengo instanciado express como app. Al venir a otro archivo, no puedo instanciar de nuevo express, solo debo tener una instancia. Por lo que aqui solo importaremos express y definiremos el router

import express from 'express';
import {paginaInicio, 
        paginaNosotros, 
        paginaViajes, 
        paginaTestimoniales, 
        paginaDetalleViaje} from '../controllers/paginaController.js';
import { guardarTestimonial } from '../controllers/testimonialController.js';

// Aqui definimos el router, utilizando la instancia de express ya realizada en el documento de la raiz y utilizando su router
const router = express.Router();


// Se puede crear una respuesta personalizada. Con send enviamos una respuesta estática, pero con res.json() estaríamos enviando un json y funcionaría de la misma forma. Esto es como cuando creabamos las respuesta en Laravel, que eran tambien unos jsons. El mas utilizada es res.render() que se utiliza para mostrar una vista.

router.get('/', paginaInicio);

// router.get('/nosotros', (req, res) => {
  // const viajes = 'Cambiando el texto';
  // Las variables las pasamos como objetos en la instrucción de .render
	// res.render('nosotros', {
  //   viajes
  // });
	// res.render('nosotros', {
  //   pagina: 'Nosotros'
  // });
// });

router.get('/nosotros', paginaNosotros);

router.get('/viajes', paginaViajes);
router.get('/viajes/:slug', paginaDetalleViaje);

router.get('/testimoniales', paginaTestimoniales);
router.post('/testimoniales', guardarTestimonial);

export default router;