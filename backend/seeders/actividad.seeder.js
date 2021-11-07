const { Seeder } = require('mongoose-data-seed');
const { Actividad } = require('../models/actividad.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d91b7116642291cadc55a',
    estaPublicado: true,
    enVigor: true,
    asociacionesActividadMiembroTramo: ['617d942a116642291cadcca0'],
    materiales: ['617d9053116642291cadc450', '617d9084116642291cadc45c'],
    nombre: 'Videojuego - Mario Kart',
    descripcion: 'Juego de carreras de mario',
    reglas: '1. Eliges un personaje\n2. Intentas ganar los circuitos',
    fechaPublicacion: new Date('2021/10/30 18:40:55'),
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/mario-kart.jpg')),
      mimetype: 'image/jpeg',
      size: '257672',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
  {
    _id: '617d9223116642291cadc565',
    estaPublicado: true,
    enVigor: true,
    asociacionesActividadMiembroTramo: ['617d9435116642291cadccca', '617d9440116642291cadccf5'],
    materiales: ['617d90bb116642291cadc468'],
    nombre: 'Concurso de K-Pop',
    descripcion: 'Concurso de K-pop donde se baila individualmente o en grupo',
    reglas: 'Bailar tu coreografía',
    fechaPublicacion: new Date('2021/10/30 18:42:43'),
    fotografia: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/kpop.jpg')),
      mimetype: 'image/jpeg',
      size: '7691',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
];

class ActividadesSeeder extends Seeder {
  async shouldRun() {
    return Actividad.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Actividad.create(data);
  }
}

module.exports.Actividades = ActividadesSeeder;
