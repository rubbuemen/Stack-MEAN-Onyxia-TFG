const { Seeder } = require('mongoose-data-seed');
const { Miembro } = require('../models/miembro.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    nombre: 'Daniel',
    apellidos: 'Palacios Carrascosa',
    fechaNacimiento: new Date('1989/12/30'),
    correoElectronico: 'asociaciononyxia@gmail.com',
    numeroSocio: 1,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/chocobo.jpg')),
      mimetype: 'image/jpeg',
      size: 154312,
    },
    alias: 'Danlok',
    numeroTelefono: '684331226',
    direccion: 'Sevilla, Pino Montano',
    dni: '39697369J',
    aficiones: 'Organizar eventos',
    tieneCochePropio: true,
    rol: 'PRESIDENTE',
    estaDeAlta: true,
    fechaAlta: new Date('2020/06/01'),
    cantidadPenalizaciones: 0,
    cuentaUsuario: '5f184627db18932ca39337d7',
    redSocials: ['5f184111ba5f21f2db1f97ee'],
    solicitudMiembro: '5f1843287241a0ab4a7b57a6',
    buzones: ['5f1843ed6dcb57a61ef4f7d4', '5f18442749489cf33164546a', '5f18443545a65f09bd6a0e19'],
  },
];

class MiembrosSeeder extends Seeder {
  async shouldRun() {
    return Miembro.countDocuments()
      .exec()
      .then((count) => count === 0);
  }

  async run() {
    return Miembro.create(data);
  }
}

module.exports.Miembros = MiembrosSeeder;
