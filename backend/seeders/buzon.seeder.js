const { Seeder } = require('mongoose-data-seed');
const { Buzon } = require('../models/buzon.model');

const data = [
  {
    _id: '5f1843ed6dcb57a61ef4f7d4',
    nombre: 'Buzón de entrada',
    esPorDefecto: true,
  },
  {
    _id: '5f18442749489cf33164546a',
    nombre: 'Buzón de salida',
    esPorDefecto: true,
  },
  {
    _id: '5f18443545a65f09bd6a0e19',
    nombre: 'Buzón de eliminados',
    esPorDefecto: true,
  },
];

class BuzonesSeeder extends Seeder {
  async shouldRun() {
    return Buzon.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Buzon.create(data);
  }
}

module.exports.Buzones = BuzonesSeeder;
