const { Seeder } = require('mongoose-data-seed');
const { Inventario } = require('../models/inventario.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d9053116642291cadc44d',
    esPropio: true,
    enUso: false,
    estadoMaterial: 'OPERATIVO',
  },
  {
    _id: '617d9084116642291cadc459',
    esPropio: true,
    enUso: false,
    estadoMaterial: 'OPERATIVO',
  },
  {
    _id: '617d90bb116642291cadc465',
    esPropio: true,
    enUso: true,
    estadoMaterial: 'DETERIORADO',
  },
  {
    _id: '617d90d9116642291cadc49d',
    esPropio: true,
    enUso: false,
    estadoMaterial: 'OPERATIVO',
  },
  {
    _id: '617d90e6116642291cadc4da',
    esPropio: true,
    enUso: false,
    estadoMaterial: 'OPERATIVO',
  },
  {
    _id: '617d90ea116642291cadc4e7',
    esPropio: true,
    enUso: false,
    estadoMaterial: 'DETERIORADO',
  },
];

class InventariosSeeder extends Seeder {
  async shouldRun() {
    return Inventario.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Inventario.create(data);
  }
}

module.exports.Inventarios = InventariosSeeder;
