const { Seeder } = require('mongoose-data-seed');
const { Visitante } = require('../models/visitante.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d8c42116642291cadc013',
    redSocials: [],
    buzones: ['617d8c42116642291cadc00d', '617d8c42116642291cadc00f', '617d8c42116642291cadc011'],
    nombre: 'Lorenzo',
    apellidos: 'Torrecillas Redondo',
    fechaNacimiento: new Date('1992/06/30'),
    correoElectronico: 'lore@gmail.com',
    alias: '',
    numeroTelefono: '665442902',
    cuentaUsuario: '617d8c42116642291cadc00b',
    solicitudMiembro: '617d8c67116642291cadc01e',
  },
  {
    _id: '617d8ca1116642291cadc041',
    redSocials: [],
    buzones: ['617d8ca1116642291cadc03b', '617d8ca1116642291cadc03d', '617d8ca1116642291cadc03f'],
    nombre: 'Eduardo',
    apellidos: 'Alegria Piquer',
    fechaNacimiento: new Date('1998/09/29'),
    correoElectronico: 'edue@gmail.com',
    alias: 'edue',
    numeroTelefono: '693630286',
    cuentaUsuario: '617d8ca1116642291cadc039',
    solicitudMiembro: '617d8cce116642291cadc04c',
  },
];

class VisitantesSeeder extends Seeder {
  async shouldRun() {
    return Visitante.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Visitante.create(data);
  }
}

module.exports.Visitantes = VisitantesSeeder;
