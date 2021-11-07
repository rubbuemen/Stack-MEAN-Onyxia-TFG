const { Seeder } = require('mongoose-data-seed');
const { AlbumFotografia } = require('../models/albumFotografia.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '61855ecbecd25d613084f566',
    fotografias: ['61855ecbecd25d613084f564', '61855edaecd25d613084f58c'],
    nombre: 'Album de fotos de Onyxia zone cotubre 2021',
    evento: '617d92c4116642291cadc591',
  },
];

class AlbumFotografiasSeeder extends Seeder {
  async shouldRun() {
    return AlbumFotografia.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return AlbumFotografia.create(data);
  }
}

module.exports.AlbumFotografias = AlbumFotografiasSeeder;
