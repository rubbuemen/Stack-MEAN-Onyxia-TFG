const { Seeder } = require('mongoose-data-seed');
const { Configuracion } = require('../models/configuracion.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    modoMantenimiento: Boolean(),
    ocultarBanners: Boolean(),
    bannersPrincipales: [
      '617d759948838a3cd89c3f1f',
      '617d75da48838a3cd89c3f28',
      '617d75e948838a3cd89c3f2e',
      '617d75ed48838a3cd89c3f34',
      '617d762b48838a3cd89c3f40',
    ],
  },
];

class ConfiguracionSeeder extends Seeder {
  async shouldRun() {
    return Configuracion.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Configuracion.create(data);
  }
}

module.exports.Configuracion = ConfiguracionSeeder;
