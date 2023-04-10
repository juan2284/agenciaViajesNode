import {Testimonial} from '../models/testimoniales.js'

const guardarTestimonial = async (req, res) => {

  // Validar
  const {nombre, correo, mensaje} = req.body;

  const errores = [];

  if (nombre.trim() === '') {
    errores.push({mensaje: 'El Nombre está vacío'});
  }
  if (correo.trim() === '') {
    errores.push({mensaje: 'El Correo está vacío'});
  }
  if (mensaje.trim() === '') {
    errores.push({mensaje: 'El Mensaje está vacío'});
  }

  if (errores.length > 0) {
    // Consultar Testimoniales existenetes
    const testimoniales = await Testimonial.findAll();

    // Mostrar la vista con errores
    res.render('testimoniales', {
      pagina: 'Testimoniales',
      errores,
      nombre,
      correo,
      mensaje,
      testimoniales
    });
  }else{
    // Almacenar en la BDD
    try {
      await Testimonial.create({
        nombre,
        correo,
        mensaje
      });

      res.redirect('/testimoniales');
    } catch (error) {
      console.log(error);
    }
  }
}

export {
  guardarTestimonial
}