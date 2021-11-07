const { Seeder } = require('mongoose-data-seed');
const { Material } = require('../models/material.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d9053116642291cadc450',
    inventarios: ['617d9053116642291cadc44d', '617d90e6116642291cadc4da', '617d90ea116642291cadc4e7'],
    nombre: 'Mando nintendo switch',
    descripcion: 'Mando para jugar a la nintendo switch',
    cantidadDisponible: 3,
    cantidadEnUso: 0,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/mando.jpg')),
      mimetype: 'image/jpeg',
      size: '41506',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
  {
    _id: '617d9084116642291cadc45c',
    inventarios: ['617d9084116642291cadc459'],
    nombre: 'Nintendo switch',
    descripcion: 'Nintendo switch de última generación',
    cantidadDisponible: 1,
    cantidadEnUso: 0,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/nintendo.png')),
      mimetype: 'image/png',
      size: '323783',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
  {
    _id: '617d90bb116642291cadc468',
    inventarios: ['617d90bb116642291cadc465', '617d90d9116642291cadc49d'],
    nombre: 'Altavoces',
    descripcion: 'Altavoces SP220 2.0 BLUETOOTH ',
    cantidadDisponible: 1,
    cantidadEnUso: 1,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/altavoces.png')),
      mimetype: 'image/png',
      size: '28570',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
];

class MaterialesSeeder extends Seeder {
  async shouldRun() {
    return Material.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Material.create(data);
  }
}

module.exports.Materiales = MaterialesSeeder;
