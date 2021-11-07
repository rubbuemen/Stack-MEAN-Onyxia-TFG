const { Seeder } = require('mongoose-data-seed');
const { TramoHorario } = require('../models/tramoHorario.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d92c4116642291cadc58c',
    asociacionesActividadMiembroTramo: ['617d942a116642291cadcca0'],
    horaInicio: '10:30',
    horaFin: '11:30',
  },
  {
    _id: '617d9406116642291cadcc19',
    asociacionesActividadMiembroTramo: ['617d9435116642291cadccca'],
    horaInicio: '11:30',
    horaFin: '13:00',
  },
  {
    _id: '617d940d116642291cadcc21',
    asociacionesActividadMiembroTramo: [],
    horaInicio: '13:00',
    horaFin: '14:00',
  },
  {
    _id: '617d9415116642291cadcc29',
    asociacionesActividadMiembroTramo: ['617d9440116642291cadccf5'],
    horaInicio: '14:00',
    horaFin: '17:00',
  },
  {
    _id: '617d941b116642291cadcc31',
    asociacionesActividadMiembroTramo: [],
    horaInicio: '17:00',
    horaFin: '20:00',
  },
  {
    _id: '617d94dd116642291cadcd32',
    asociacionesActividadMiembroTramo: [],
    horaInicio: '10:30',
    horaFin: '11:30',
  },
  {
    _id: '617d9501116642291cadcdda',
    asociacionesActividadMiembroTramo: ['617d942a116642291cadcca0'],
    horaInicio: '11:30',
    horaFin: '20:00',
  },
];

class TramosHorariosSeeder extends Seeder {
  async shouldRun() {
    return TramoHorario.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return TramoHorario.create(data);
  }
}

module.exports.TramosHorarios = TramosHorariosSeeder;
