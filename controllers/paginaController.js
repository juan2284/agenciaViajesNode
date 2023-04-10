
import {Viaje} from '../models/Viaje.js';
import { Testimonial } from '../models/testimoniales.js';

const paginaInicio = async (req, res) => {

  // Consultar 3 viajes del modelo Viaje

  // Importante y que es pregunta de entrevista: en este caso debía hacer dos consultas a la BDD, como estoy utilizando async await, no puedo crear dos await porque van a detenr la ejecución del código y afectará el performance de la página. En este caso, colocamos las dos consultas en un arreglo, y luego las ejecutamos con un Promise.all
  const promiseDB = [];

  promiseDB.push(Viaje.findAll({limit: 3}));
  promiseDB.push(Testimonial.findAll({limit: 3}));

  try {
    const resultado = await Promise.all(promiseDB);

    res.render('inicio', {
      pagina: 'Inicio',
      clase: 'home',
      viajes: resultado[0],
      testimoniales: resultado[1]
    });    
  } catch (error) {
    console.log(error);
  }

}

const paginaNosotros = (req, res) => {
	res.render('nosotros', {
    pagina: 'Nosotros'
  });
}

const paginaViajes = async (req, res) => {
  // Consultar la BDD
  const viajes = await Viaje.findAll();

  res.render('viajes', {
    pagina: 'Próximos Viajes',
    viajes
  });
}

const paginaTestimoniales = async (req, res) => {

  try {

    const testimoniales = await Testimonial.findAll();

    res.render('testimoniales', {
      pagina: 'Testimoniales',
      testimoniales
    });
  } catch (error) {
    console.log(error);
  }
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  const {slug} = req.params;

  try {
    const viaje = await Viaje.findOne({where: {slug}});

    res.render('viaje', {
      pagina: 'Información Viaje',
      viaje
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje
}