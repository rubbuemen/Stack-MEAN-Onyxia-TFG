const { Seeder } = require('mongoose-data-seed');
const { Miembro } = require('../models/miembro.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '6176fb9fbb184b72d44bd108',
    tieneCochePropio: true,
    estaDeAlta: true,
    cantidadPenalizaciones: 0,
    redSocials: ['5f184111ba5f21f2db1f97ee', '617d8552116642291cadbb54', '617d8569116642291cadbb5e'],
    inscripcionesEvento: ['617d9395116642291cadc957', '617d951c116642291cadce43'],
    asociacionesActividadMiembroTramo: ['617d9440116642291cadccf5'],
    asistenciasMiembroReunion: ['617d8d17116642291cadc0be', '617d8d4c116642291cadc0fb', '617d8d78116642291cadc138'],
    buzones: ['5f1843ed6dcb57a61ef4f7d4', '5f18442749489cf33164546a', '5f18443545a65f09bd6a0e19'],
    nombre: 'Daniel',
    apellidos: 'Palacios Carrascosa',
    fechaNacimiento: new Date('1989/12/30'),
    correoElectronico: 'asociaciononyxia@gmail.com',
    numeroSocio: 1,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/presidente.jpg')),
      mimetype: 'image/jpeg',
      size: 118474,
    },
    alias: 'Danlok',
    numeroTelefono: '684331226',
    direccion: 'Sevilla, Pino Montano',
    dni: '39697369J',
    aficiones: 'Organizar eventos',
    rol: 'PRESIDENTE',
    fechaAlta: new Date('2020/06/01'),
    cuentaUsuario: '5f184627db18932ca39337d7',
    solicitudMiembro: '5f1843287241a0ab4a7b57a6',
  },
  {
    _id: '617d7a5848838a3cd89c4001',
    tieneCochePropio: true,
    estaDeAlta: true,
    cantidadPenalizaciones: 0,
    redSocials: ['617d7a5848838a3cd89c3ff9', '617d7a8048838a3cd89c404b'],
    inscripcionesEvento: [],
    asociacionesActividadMiembroTramo: [],
    asistenciasMiembroReunion: ['617d8d17116642291cadc0c2', '617d8d4c116642291cadc0ff', '617d8d78116642291cadc13c'],
    buzones: ['617d7a5848838a3cd89c3ffb', '617d7a5848838a3cd89c3ffd', '617d7a5848838a3cd89c3fff'],
    nombre: 'Álvaro',
    apellidos: 'Ortega Rodero',
    fechaNacimiento: new Date('1998/09/20'),
    correoElectronico: 'ortega@gmail.com',
    numeroSocio: 2,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/vicepresidente.jpg')),
      mimetype: 'image/jpeg',
      size: 113108,
    },
    alias: 'Ortega',
    numeroTelefono: '687584335',
    direccion: 'Sevilla capital',
    dni: '19952728K',
    aficiones: 'Jugar videojuegos',
    rol: 'VICEPRESIDENTE',
    fechaAlta: new Date('2021/10/30'),
    cuentaUsuario: '617d7a5848838a3cd89c3ff7',
    solicitudMiembro: '617d7b1648838a3cd89c40ab',
  },
  {
    _id: '617d85de116642291cadbb97',
    tieneCochePropio: false,
    estaDeAlta: true,
    cantidadPenalizaciones: 0,
    redSocials: ['617d85de116642291cadbb8f'],
    inscripcionesEvento: [],
    asociacionesActividadMiembroTramo: [],
    asistenciasMiembroReunion: ['617d8d17116642291cadc0c6', '617d8d4c116642291cadc103', '617d8d78116642291cadc140'],
    buzones: ['617d85de116642291cadbb91', '617d85de116642291cadbb93', '617d85de116642291cadbb95', '617d92fa116642291cadc6c7'],
    nombre: 'José Miguel',
    apellidos: 'Molina Montoro',
    fechaNacimiento: new Date('1996/02/07'),
    correoElectronico: 'josemi@gmail.com',
    numeroSocio: 3,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/secretario.jpg')),
      mimetype: 'image/jpeg',
      size: 42274,
    },
    alias: 'josemi',
    numeroTelefono: '614262211',
    direccion: 'Pino Montano',
    dni: '81074939P',
    aficiones: 'K-pop',
    rol: 'SECRETARIO',
    fechaAlta: new Date('2021/10/30'),
    cuentaUsuario: '617d85de116642291cadbb8d',
    solicitudMiembro: '617d85ff116642291cadbba3',
  },
  {
    _id: '617d8871116642291cadbcd8',
    tieneCochePropio: true,
    estaDeAlta: true,
    cantidadPenalizaciones: 0,
    redSocials: ['617d8871116642291cadbcd0'],
    inscripcionesEvento: [],
    asociacionesActividadMiembroTramo: [],
    asistenciasMiembroReunion: ['617d8d17116642291cadc0ca', '617d8d4c116642291cadc107', '617d8d78116642291cadc144'],
    buzones: ['617d8871116642291cadbcd2', '617d8871116642291cadbcd4', '617d8871116642291cadbcd6'],
    nombre: 'Laura',
    apellidos: 'Aguayo Armas',
    fechaNacimiento: new Date('1991/04/04'),
    correoElectronico: 'kisaki@gmail.com',
    numeroSocio: 4,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/vocal1.jpg')),
      mimetype: 'image/jpeg',
      size: 160929,
    },
    alias: 'Kisaki',
    numeroTelefono: '606896689',
    direccion: 'Sevilla este',
    dni: '77726028N',
    aficiones: 'Cosplay',
    rol: 'VOCAL',
    fechaAlta: new Date('2021/10/30'),
    cuentaUsuario: '617d8871116642291cadbcce',
    solicitudMiembro: '617d88a8116642291cadbce4',
  },
  {
    _id: '617d88f0116642291cadbd0c',
    tieneCochePropio: true,
    estaDeAlta: true,
    cantidadPenalizaciones: 0,
    redSocials: ['617d88f0116642291cadbd04'],
    inscripcionesEvento: ['617d9378116642291cadc8c9'],
    asociacionesActividadMiembroTramo: ['617d9435116642291cadccca'],
    asistenciasMiembroReunion: ['617d8d17116642291cadc0ce', '617d8d4c116642291cadc10b', '617d8d78116642291cadc148'],
    buzones: ['617d88f0116642291cadbd06', '617d88f0116642291cadbd08', '617d88f0116642291cadbd0a'],
    nombre: 'Sara',
    apellidos: 'Mendez Pinto',
    fechaNacimiento: new Date('1998/09/23'),
    correoElectronico: 'disa@gmail.com',
    numeroSocio: 5,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/vocal2.jpg')),
      mimetype: 'image/jpeg',
      size: 131267,
    },
    alias: 'Disa',
    numeroTelefono: '629660387',
    direccion: 'Sevilla este',
    dni: '18931877W',
    aficiones: 'Informática y videojuegos',
    rol: 'VOCAL',
    fechaAlta: new Date('2021/10/30'),
    cuentaUsuario: '617d88f0116642291cadbd02',
    solicitudMiembro: '617d8928116642291cadbd18',
  },
  {
    _id: '617d8b10116642291cadbf05',
    tieneCochePropio: false,
    estaDeAlta: true,
    cantidadPenalizaciones: 0,
    redSocials: [],
    inscripcionesEvento: ['617d934b116642291cadc83d', '617d95af116642291cadcf4c'],
    asociacionesActividadMiembroTramo: ['617d942a116642291cadcca0'],
    asistenciasMiembroReunion: ['617d8d17116642291cadc0d2', '617d8d4c116642291cadc10f'],
    buzones: ['617d8b10116642291cadbeff', '617d8b10116642291cadbf01', '617d8b10116642291cadbf03'],
    nombre: 'Rubén',
    apellidos: 'Bueno Menéndez',
    fechaNacimiento: new Date('1991/08/25'),
    correoElectronico: 'raziel@gmail.com',
    numeroSocio: 6,
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/ruben.jpg')),
      mimetype: 'image/jpeg',
      size: 20400,
    },
    alias: 'raziel',
    numeroTelefono: '670243491',
    direccion: 'Sevilla',
    dni: '77843402V',
    aficiones: 'Jugar videojuegos e informática',
    rol: 'ESTANDAR',
    fechaAlta: new Date('2021/10/30'),
    cuentaUsuario: '617d8b10116642291cadbefd',
    solicitudMiembro: '617d8b50116642291cadbf30',
  },
];

class MiembrosSeeder extends Seeder {
  async shouldRun() {
    return Miembro.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Miembro.create(data);
  }
}

module.exports.Miembros = MiembrosSeeder;
