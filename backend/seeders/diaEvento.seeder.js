const { Seeder } = require('mongoose-data-seed');
const { DiaEvento } = require('../models/diaEvento.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d92c4116642291cadc58e',
    tramosHorarios: [
      '617d92c4116642291cadc58c',
      '617d9406116642291cadcc19',
      '617d940d116642291cadcc21',
      '617d9415116642291cadcc29',
      '617d941b116642291cadcc31',
    ],
    fecha: new Date('2021/10/31'),
  },
  {
    _id: '617d94dd116642291cadcd34',
    tramosHorarios: ['617d94dd116642291cadcd32', '617d9501116642291cadcdda'],
    fecha: new Date('2022/01/01'),
  },
];

class DiaEventosSeeder extends Seeder {
  async shouldRun() {
    return DiaEvento.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return DiaEvento.create(data);
  }
}

module.exports.DiaEventos = DiaEventosSeeder;
