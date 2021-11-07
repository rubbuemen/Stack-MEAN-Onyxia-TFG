const { Seeder } = require('mongoose-data-seed');
const { ActividadMiembroTramo } = require('../models/actividadMiembroTramo.model');

const data = [
  {
    _id: '617d942a116642291cadcca0',
    actividad: '617d91b7116642291cadc55a',
    miembro: '617d8b10116642291cadbf05',
    tramoHorario: '617d92c4116642291cadc58c',
  },
  {
    _id: '617d9435116642291cadccca',
    actividad: '617d9223116642291cadc565',
    miembro: '617d88f0116642291cadbd0c',
    tramoHorario: '617d9406116642291cadcc19',
  },
  {
    _id: '617d9440116642291cadccf5',
    actividad: '617d9223116642291cadc565',
    miembro: '6176fb9fbb184b72d44bd108',
    tramoHorario: '617d9415116642291cadcc29',
  },
];

class ActividadMiembroTramosSeeder extends Seeder {
  async shouldRun() {
    return ActividadMiembroTramo.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return ActividadMiembroTramo.create(data);
  }
}

module.exports.ActividadesMiembroTramo = ActividadMiembroTramosSeeder;
