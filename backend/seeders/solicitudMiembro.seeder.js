const { Seeder } = require('mongoose-data-seed');
const { SolicitudMiembro } = require('../models/solicitudMiembro.model');

const data = [
  {
    _id: '5f1843287241a0ab4a7b57a6',
    tieneCochePropio: true,
    comoHaConocidoAsociacion: 'Fundador',
    intereses: ['BAILE', 'DIBUJO', 'SOFTCOMBAT', 'TALLERESMANUALIDADES', 'VIDEOJUEGOS', 'COSPLAY'],
    habilidades: 'Hacer de todo',
    ideas: 'Fundador de ideas',
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
  },
];

class SolicitudesMiembrosSeeder extends Seeder {
  async shouldRun() {
    return SolicitudMiembro.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return SolicitudMiembro.create(data);
  }
}

module.exports.SolicitudesMiembros = SolicitudesMiembrosSeeder;
