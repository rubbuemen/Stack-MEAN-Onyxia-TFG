const { Seeder } = require('mongoose-data-seed');
const { Reunion } = require('../models/reunion.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d8d17116642291cadc0bc',
    estadoReunion: 'REALIZADO',
    asistenciasMiembroReunion: [
      '617d8d17116642291cadc0be',
      '617d8d17116642291cadc0c2',
      '617d8d17116642291cadc0c6',
      '617d8d17116642291cadc0ca',
      '617d8d17116642291cadc0ce',
      '617d8d17116642291cadc0d2',
    ],
    fecha: new Date('2021/10/31'),
    horaInicio: '11:00',
    horaFin: '13:00',
    lugar: 'Sevilla este, sede principal',
    tipoReunion: 'ASOCIACION',
    temasATratar: 'Organización de nuevos miembros',
  },
  {
    _id: '617d8d4c116642291cadc0f9',
    estadoReunion: 'PENDIENTE',
    asistenciasMiembroReunion: [
      '617d8d4c116642291cadc0fb',
      '617d8d4c116642291cadc0ff',
      '617d8d4c116642291cadc103',
      '617d8d4c116642291cadc107',
      '617d8d4c116642291cadc10b',
      '617d8d4c116642291cadc10f',
    ],
    fecha: new Date('2021/10/30'),
    horaInicio: '10:00',
    horaFin: '13:00',
    lugar: 'Sevilla este, en la sede',
    tipoReunion: 'ASOCIACION',
    temasATratar: 'Temas sobre los nuevos eventos',
  },
  {
    _id: '617d8d78116642291cadc136',
    estadoReunion: 'PENDIENTE',
    asistenciasMiembroReunion: [
      '617d8d78116642291cadc138',
      '617d8d78116642291cadc13c',
      '617d8d78116642291cadc140',
      '617d8d78116642291cadc144',
      '617d8d78116642291cadc148',
    ],
    fecha: new Date('2021/01/05'),
    horaInicio: '18:00',
    horaFin: '20:00',
    lugar: 'Casa de Danlok',
    tipoReunion: 'JUNTADIRECTIVA',
    temasATratar: 'Temas internos de la asociación sobre reuniones',
  },
];

class ReunionesSeeder extends Seeder {
  async shouldRun() {
    return Reunion.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Reunion.create(data);
  }
}

module.exports.Reuniones = ReunionesSeeder;
