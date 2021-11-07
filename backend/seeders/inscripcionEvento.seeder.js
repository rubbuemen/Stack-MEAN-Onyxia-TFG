const { Seeder } = require('mongoose-data-seed');
const { InscripcionEvento } = require('../models/inscripcionEvento.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d934b116642291cadc83d',
    estadoInscripcion: 'ACEPTADO',
    tieneCocheDisponible: false,
    actividadesInteres: ['617d91b7116642291cadc55a'],
    problemaAlimenticio: 'Ninguno',
    comentarioAdicional: 'Poned una silla para sentarse por favor',
    miembro: '617d8b10116642291cadbf05',
    evento: '617d92c4116642291cadc591',
  },
  {
    _id: '617d9378116642291cadc8c9',
    estadoInscripcion: 'ACEPTADO',
    tieneCocheDisponible: true,
    actividadesInteres: ['617d91b7116642291cadc55a'],
    problemaAlimenticio: 'Ninguno',
    comentarioAdicional: '',
    miembro: '617d88f0116642291cadbd0c',
    evento: '617d92c4116642291cadc591',
  },
  {
    _id: '617d9395116642291cadc957',
    estadoInscripcion: 'ACEPTADO',
    tieneCocheDisponible: false,
    actividadesInteres: ['617d9223116642291cadc565'],
    problemaAlimenticio: 'No puedo comer almendras',
    comentarioAdicional: '',
    miembro: '6176fb9fbb184b72d44bd108',
    evento: '617d92c4116642291cadc591',
  },
  {
    _id: '617d951c116642291cadce43',
    estadoInscripcion: 'PENDIENTE',
    tieneCocheDisponible: true,
    actividadesInteres: ['617d9223116642291cadc565'],
    problemaAlimenticio: 'Nada de almendras',
    comentarioAdicional: '',
    miembro: '6176fb9fbb184b72d44bd108',
    evento: '617d94dd116642291cadcd37',
  },
  {
    _id: '617d95af116642291cadcf4c',
    estadoInscripcion: 'PENDIENTE',
    tieneCocheDisponible: true,
    actividadesInteres: ['617d9223116642291cadc565'],
    problemaAlimenticio: '',
    comentarioAdicional: '',
    miembro: '617d8b10116642291cadbf05',
    evento: '617d94dd116642291cadcd37',
  },
];

class InscripcionesEventoSeeder extends Seeder {
  async shouldRun() {
    return InscripcionEvento.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return InscripcionEvento.create(data);
  }
}

module.exports.InscripcionesEvento = InscripcionesEventoSeeder;
