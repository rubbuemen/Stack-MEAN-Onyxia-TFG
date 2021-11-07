const { Seeder } = require('mongoose-data-seed');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '5f184627db18932ca39337d7',
    estado: true,
    usuario: 'danlok23',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'PRESIDENTE',
    fechaCreacion: new Date('2021/10/25 18:46:55'),
  },
  {
    _id: '617d7a5848838a3cd89c3ff7',
    estado: true,
    usuario: 'ortega123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'VICEPRESIDENTE',
    fechaCreacion: new Date('2021/10/30 17:01:12'),
  },
  {
    _id: '617d85de116642291cadbb8d',
    estado: true,
    usuario: 'josemi123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'SECRETARIO',
    fechaCreacion: new Date('2021/10/30 17:50:22'),
  },
  {
    _id: '617d8871116642291cadbcce',
    estado: true,
    usuario: 'kisaki123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'VOCAL',
    fechaCreacion: new Date('2021/10/30 18:01:21'),
  },
  {
    _id: '617d88f0116642291cadbd02',
    estado: true,
    usuario: 'disa123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'VOCAL',
    fechaCreacion: new Date('2021/10/30 18:03:28'),
  },
  {
    _id: '617d8b10116642291cadbefd',
    estado: true,
    usuario: 'raziel123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'MIEMBRO',
    fechaCreacion: new Date('2021/10/30 18:12:32'),
  },
  {
    _id: '617d8c42116642291cadc00b',
    estado: true,
    usuario: 'lore123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'VISITANTE',
    fechaCreacion: new Date('2021/10/30 18:17:38'),
  },
  {
    _id: '617d8ca1116642291cadc039',
    estado: true,
    usuario: 'edu123',
    contraseña: bcrypt.hashSync('pruebas123', 8),
    autoridad: 'VISITANTE',
    fechaCreacion: new Date('2021/10/30 18:19:13'),
  },
];

class CuentasUsuariosSeeder extends Seeder {
  async shouldRun() {
    return CuentaUsuario.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return CuentaUsuario.create(data);
  }
}

module.exports.CuentasUsuarios = CuentasUsuariosSeeder;
