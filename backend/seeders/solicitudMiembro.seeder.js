const { Seeder } = require('mongoose-data-seed');
const { SolicitudMiembro } = require('../models/solicitudMiembro.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '5f1843287241a0ab4a7b57a6',
    tieneCochePropio: true,
    intereses: ['BAILE', 'DIBUJO', 'SOFTCOMBAT', 'TALLERESMANUALIDADES', 'VIDEOJUEGOS', 'COSPLAY'],
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
    miembrosConocidos: [],
    comoHaConocidoAsociacion: 'Fundador',
    habilidades: 'Hacer de todo',
    ideas: 'Fundador de ideas',
  },
  {
    _id: '617d7b1648838a3cd89c40ab',
    tieneCochePropio: true,
    intereses: ['TALLERESMANUALIDADES', 'VIDEOJUEGOS'],
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
    miembrosConocidos: ['6176fb9fbb184b72d44bd108'],
    comoHaConocidoAsociacion: 'Soy amigo del presidente',
    habilidades: 'Se me da muy bien liderar los eventos',
    ideas: 'Organizar grupos para aumentar el rendimiento de la asociación',
  },
  {
    _id: '617d85ff116642291cadbba3',
    tieneCochePropio: false,
    intereses: ['BAILE', 'TALLERESMANUALIDADES'],
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
    miembrosConocidos: ['6176fb9fbb184b72d44bd108', '617d7a5848838a3cd89c4001'],
    comoHaConocidoAsociacion: 'Por mis amigos',
    habilidades: 'Presentar actividades',
    ideas: 'Muchas ideas a transmitir',
  },
  {
    _id: '617d88a8116642291cadbce4',
    tieneCochePropio: true,
    intereses: ['COSPLAY'],
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
    miembrosConocidos: ['6176fb9fbb184b72d44bd108'],
    comoHaConocidoAsociacion: 'Por gente en común',
    habilidades: 'Realizar buenos cosplays y maquillaje',
    ideas: 'Montar talleres de cosplay',
  },
  {
    _id: '617d8928116642291cadbd18',
    tieneCochePropio: true,
    intereses: ['SOFTCOMBAT', 'TALLERESMANUALIDADES', 'VIDEOJUEGOS', 'COSPLAY'],
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
    miembrosConocidos: ['6176fb9fbb184b72d44bd108'],
    comoHaConocidoAsociacion: 'Por twitter',
    habilidades: 'Polivalente, sé hacer un poco de todo',
    ideas: 'Montar muchos talleres',
  },
  {
    _id: '617d8b50116642291cadbf30',
    tieneCochePropio: false,
    intereses: ['BAILE', 'VIDEOJUEGOS'],
    estadoSolicitud: 'ACEPTADO',
    estaPagado: true,
    miembrosConocidos: ['6176fb9fbb184b72d44bd108', '617d7a5848838a3cd89c4001'],
    comoHaConocidoAsociacion: 'Por twitter',
    habilidades: 'Estar al cargo de responsabilidades importantes',
    ideas: 'Organizar mejor muchas tareas',
  },
  {
    _id: '617d8c67116642291cadc01e',
    tieneCochePropio: false,
    intereses: ['BAILE', 'TALLERESMANUALIDADES', 'COSPLAY'],
    estadoSolicitud: 'PENDIENTE',
    estaPagado: false,
    miembrosConocidos: [],
    comoHaConocidoAsociacion: 'Por instagram',
    habilidades: 'Baile',
    ideas: 'Ninguna',
  },
  {
    _id: '617d8cce116642291cadc04c',
    tieneCochePropio: false,
    intereses: ['DIBUJO', 'TALLERESMANUALIDADES'],
    estadoSolicitud: 'PENDIENTE',
    estaPagado: false,
    miembrosConocidos: ['6176fb9fbb184b72d44bd108'],
    comoHaConocidoAsociacion: 'En un evento',
    habilidades: 'Se me dan bien las manualidades',
    ideas: 'Tengo ideas de talleres',
  },
];

class SolicitudesMiembrosSeeder extends Seeder {
  async shouldRun() {
    return SolicitudMiembro.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return SolicitudMiembro.create(data);
  }
}

module.exports.SolicitudesMiembros = SolicitudesMiembrosSeeder;
