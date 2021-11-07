const { Seeder } = require('mongoose-data-seed');
const { AsistenciaMiembroReunion } = require('../models/asistenciaMiembroReunion.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d8d17116642291cadc0be',
    haMarcadoAsistencia: false,
    miembro: '6176fb9fbb184b72d44bd108',
    reunion: '617d8d17116642291cadc0bc',
  },
  {
    _id: '617d8d17116642291cadc0c2',
    haMarcadoAsistencia: true,
    miembro: '617d7a5848838a3cd89c4001',
    reunion: '617d8d17116642291cadc0bc',
    comentarioAdicional: '',
  },
  {
    _id: '617d8d17116642291cadc0c6',
    haMarcadoAsistencia: false,
    miembro: '617d85de116642291cadbb97',
    reunion: '617d8d17116642291cadc0bc',
  },
  {
    _id: '617d8d17116642291cadc0ca',
    haMarcadoAsistencia: true,
    miembro: '617d8871116642291cadbcd8',
    reunion: '617d8d17116642291cadc0bc',
    comentarioAdicional: 'Llegaré un poco tarde',
  },
  {
    _id: '617d8d17116642291cadc0ce',
    haMarcadoAsistencia: false,
    miembro: '617d88f0116642291cadbd0c',
    reunion: '617d8d17116642291cadc0bc',
  },
  {
    _id: '617d8d17116642291cadc0d2',
    haMarcadoAsistencia: false,
    miembro: '617d8b10116642291cadbf05',
    reunion: '617d8d17116642291cadc0bc',
  },
  {
    _id: '617d8d4c116642291cadc0fb',
    haMarcadoAsistencia: false,
    miembro: '6176fb9fbb184b72d44bd108',
    reunion: '617d8d4c116642291cadc0f9',
  },
  {
    _id: '617d8d4c116642291cadc0ff',
    haMarcadoAsistencia: true,
    miembro: '617d7a5848838a3cd89c4001',
    reunion: '617d8d4c116642291cadc0f9',
    comentarioAdicional: '',
  },
  {
    _id: '617d8d4c116642291cadc103',
    haMarcadoAsistencia: false,
    miembro: '617d85de116642291cadbb97',
    reunion: '617d8d4c116642291cadc0f9',
  },
  {
    _id: '617d8d4c116642291cadc107',
    haMarcadoAsistencia: false,
    miembro: '617d8871116642291cadbcd8',
    reunion: '617d8d4c116642291cadc0f9',
  },
  {
    _id: '617d8d4c116642291cadc10b',
    haMarcadoAsistencia: true,
    miembro: '617d88f0116642291cadbd0c',
    reunion: '617d8d4c116642291cadc0f9',
    comentarioAdicional: '',
  },
  {
    _id: '617d8d4c116642291cadc10f',
    haMarcadoAsistencia: false,
    miembro: '617d8b10116642291cadbf05',
    reunion: '617d8d4c116642291cadc0f9',
  },
  {
    _id: '617d8d78116642291cadc138',
    haMarcadoAsistencia: false,
    miembro: '6176fb9fbb184b72d44bd108',
    reunion: '617d8d78116642291cadc136',
  },
  {
    _id: '617d8d78116642291cadc13c',
    haMarcadoAsistencia: false,
    miembro: '617d7a5848838a3cd89c4001',
    reunion: '617d8d78116642291cadc136',
  },
  {
    _id: '617d8d78116642291cadc140',
    haMarcadoAsistencia: true,
    miembro: '617d85de116642291cadbb97',
    reunion: '617d8d78116642291cadc136',
    comentarioAdicional: '',
  },
  {
    _id: '617d8d78116642291cadc144',
    haMarcadoAsistencia: true,
    miembro: '617d8871116642291cadbcd8',
    reunion: '617d8d78116642291cadc136',
    comentarioAdicional: '',
  },
  {
    _id: '617d8d78116642291cadc148',
    haMarcadoAsistencia: false,
    miembro: '617d88f0116642291cadbd0c',
    reunion: '617d8d78116642291cadc136',
  },
];

class AsistenciaMiembroReunionesSeeder extends Seeder {
  async shouldRun() {
    return AsistenciaMiembroReunion.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return AsistenciaMiembroReunion.create(data);
  }
}

module.exports.AsistenciaMiembroReuniones = AsistenciaMiembroReunionesSeeder;
