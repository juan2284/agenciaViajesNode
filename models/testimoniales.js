import Sequelize from 'sequelize';
import db from '../config/db.js';

// Definir nuestor primer modelo
export const Testimonial = db.define('testimoniales', {
  // Al hacer la consulta a la base de datos se traerá solo las columnas que estoy especificando aqui
  nombre: {
    type: Sequelize.STRING
  },
  correo: {
    type: Sequelize.STRING
  },
  mensaje: {
    type: Sequelize.STRING
  }
});