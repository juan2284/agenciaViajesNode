import Sequelize from 'sequelize';
import db from '../config/db.js';

// Definir nuestor primer modelo
export const Viaje = db.define('viajes', {
  // Al hacer la consulta a la base de datos se traerá solo las columnas que estoy especificando aqui
  titulo: {
    type: Sequelize.STRING
  },
  precio: {
    type: Sequelize.STRING
  },
  fecha_ida: {
    type: Sequelize.DATE
  },
  fecha_vuelta: {
    type: Sequelize.DATE
  },
  imagen: {
    type: Sequelize.STRING
  },
  descripcion: {
    type: Sequelize.STRING
  },
  disponibles: {
    type: Sequelize.STRING
  },
  slug: {
    type: Sequelize.STRING
  }
});