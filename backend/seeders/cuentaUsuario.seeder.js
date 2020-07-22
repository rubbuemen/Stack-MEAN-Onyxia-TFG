const { Seeder } = require('mongoose-data-seed');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const bcrypt = require('bcryptjs');

const data = [
  {
    _id: '5f184627db18932ca39337d7',
    usuario: 'danlok23',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'PRESIDENTE',
  },
];

class CuentasUsuariosSeeder extends Seeder {
  async shouldRun() {
    return CuentaUsuario.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return CuentaUsuario.create(data);
  }
}

module.exports.CuentasUsuarios = CuentasUsuariosSeeder;
