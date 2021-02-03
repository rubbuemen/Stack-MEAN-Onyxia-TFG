const { Seeder } = require('mongoose-data-seed');
const { Configuracion } = require('../models/configuracion.model');

const data = [
  {
    modoMantenimiento: Boolean(),
    ocultarBanners: Boolean(),
    bannersPrincipales: [],
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
