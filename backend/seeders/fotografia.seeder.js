const { Seeder } = require('mongoose-data-seed');
const { Fotografia } = require('../models/fotografia.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '61855ecbecd25d613084f564',
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/foto1.jpg')),
      mimetype: 'image/jpeg',
      size: '137366',
    },
  },
  {
    _id: '61855edaecd25d613084f58c',
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/foto2.jpg')),
      mimetype: 'image/jpeg',
      size: '155258',
    },
  },
];

class FotografiasSeeder extends Seeder {
  async shouldRun() {
    return Fotografia.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Fotografia.create(data);
  }
}

module.exports.Fotografias = FotografiasSeeder;
