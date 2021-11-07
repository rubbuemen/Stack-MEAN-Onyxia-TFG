const { Seeder } = require('mongoose-data-seed');
const { Banner } = require('../models/banner.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d759948838a3cd89c3f1f',
    texto:
      '<h3>Asociación Onyxia</h3>\n<p>Una de las ventajas principales de estar en nuestra asociación es la de conocer gente nueva y pasarlo genial, y no solo en eventos o salones: en Onyxia todos los componentes nos conocemos entre nosotros</p>',
    orden: 1,
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/banner1.jpg')),
      mimetype: 'image/jpeg',
      size: '11707603',
    },
  },
  {
    _id: '617d75da48838a3cd89c3f28',
    orden: 2,
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/banner2.jpg')),
      mimetype: 'image/jpeg',
      size: '185901',
    },
  },
  {
    _id: '617d75e948838a3cd89c3f2e',
    orden: 3,
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/banner3.jpg')),
      mimetype: 'image/jpeg',
      size: '793887',
    },
  },
  {
    _id: '617d75ed48838a3cd89c3f34',
    orden: 4,
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/banner4.jpg')),
      mimetype: 'image/jpeg',
      size: '744781',
    },
  },
  {
    _id: '617d762b48838a3cd89c3f40',
    orden: 5,
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/banner5.jpg')),
      mimetype: 'image/jpeg',
      size: '13371272',
    },
  },
];

class BannersSeeder extends Seeder {
  async shouldRun() {
    return Banner.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Banner.create(data);
  }
}

module.exports.Banners = BannersSeeder;
