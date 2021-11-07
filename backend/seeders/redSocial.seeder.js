const { Seeder } = require('mongoose-data-seed');
const { RedSocial } = require('../models/redSocial.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '5f184111ba5f21f2db1f97ee',
    nombre: 'Facebook',
    enlace: 'https://www.facebook.com/daniel.palacios.395017',
    usuario: 'daniel.palacios.395017',
  },
  {
    _id: '617d7a5848838a3cd89c3ff9',
    nombre: 'Instagram',
    enlace: 'https://www.instagram.com/alvaroortega20/',
    usuario: 'alvaroortega20',
  },
  {
    _id: '617d7a8048838a3cd89c404b',
    nombre: 'Twitter',
    enlace: 'https://twitter.com/oalvaro97',
    usuario: 'oalvaro97',
  },
  {
    _id: '617d8552116642291cadbb54',
    nombre: 'Twitter',
    enlace: 'https://twitter.com/Danlok23',
    usuario: 'Danlok23',
  },
  {
    _id: '617d8569116642291cadbb5e',
    nombre: 'Instagram',
    enlace: 'https://www.instagram.com/danlok23/',
    usuario: 'danlok23',
  },
  {
    _id: '617d85de116642291cadbb8f',
    nombre: 'Instagram',
    enlace: 'https://www.instagram.com/pepemii/',
    usuario: 'pepemii',
  },
  {
    _id: '617d8871116642291cadbcd0',
    nombre: 'Instagram',
    enlace: 'https://www.instagram.com/kisakilau/',
    usuario: 'kisakilau',
  },
  {
    _id: '617d88f0116642291cadbd04',
    nombre: 'Instagram',
    enlace: 'https://www.instagram.com/saracdiaz/',
    usuario: 'saracdiaz',
  },
];

class RedesSocialesSeeder extends Seeder {
  async shouldRun() {
    return RedSocial.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return RedSocial.create(data);
  }
}

module.exports.RedesSociales = RedesSocialesSeeder;
