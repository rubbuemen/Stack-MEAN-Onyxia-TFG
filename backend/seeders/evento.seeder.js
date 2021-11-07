const { Seeder } = require('mongoose-data-seed');
const { Evento } = require('../models/evento.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d92c4116642291cadc591',
    estaPublicado: true,
    esFueraSevilla: false,
    diasEvento: ['617d92c4116642291cadc58e'],
    actividadesEvento: ['617d91b7116642291cadc55a', '617d9223116642291cadc565'],
    inscripcionesEvento: ['617d934b116642291cadc83d', '617d9378116642291cadc8c9', '617d9395116642291cadc957'],
    nombre: 'Onyxia Zone Octubre 2021',
    descripcion: 'Evento onyxia zone',
    lugar: 'Sevilla Este',
    cupoInscripciones: 17,
    estadoEvento: 'REALIZADO',
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/evento1.jpg')),
      mimetype: 'image/jpeg',
      size: '579747',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
  {
    _id: '617d94dd116642291cadcd37',
    estaPublicado: true,
    esFueraSevilla: false,
    diasEvento: ['617d94dd116642291cadcd34'],
    actividadesEvento: ['617d9223116642291cadc565'],
    inscripcionesEvento: ['617d951c116642291cadce43', '617d95af116642291cadcf4c'],
    inventarios: ['617d90bb116642291cadc465'],
    nombre: 'Evento de año nuevo',
    descripcion: 'Evento organizado con intención de celebrar el año nuevo, sólo habrá k-pop',
    lugar: 'Sevilla',
    cupoInscripciones: 10,
    estadoEvento: 'PENDIENTE',
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/evento2.jpg')),
      mimetype: 'image/jpeg',
      size: '57895',
    },
    miembroCreador: '6176fb9fbb184b72d44bd108',
  },
];

class EventosSeeder extends Seeder {
  async shouldRun() {
    return Evento.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Evento.create(data);
  }
}

module.exports.Eventos = EventosSeeder;
