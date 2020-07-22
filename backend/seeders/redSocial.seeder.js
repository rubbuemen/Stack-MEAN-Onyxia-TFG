const { Seeder } = require('mongoose-data-seed');
const { RedSocial } = require('../models/redSocial.model');

const data = [
  {
    _id: '5f184111ba5f21f2db1f97ee',
    nombre: 'Facebook',
    enlace: 'https://www.facebook.com/daniel.palacios.395017',
    usuario: 'daniel.palacios.395017',
  },
];

class RedesSocialesSeeder extends Seeder {
  async shouldRun() {
    return RedSocial.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return RedSocial.create(data);
  }
}

module.exports.RedesSociales = RedesSocialesSeeder;
