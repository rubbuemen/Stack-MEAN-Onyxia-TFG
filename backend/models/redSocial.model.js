const mongoose = require('mongoose');

const redSocialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Inserte un nombre de la red social'],
  },
  enlace: {
    type: String,
    required: [true, 'Inserte un enlace de la red social'],
    match: [/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/, 'El enlace debe tener formato de URL'],
  },
  usuario: {
    type: String,
    required: [true, 'Inserte un usuario de la red social'],
  },
});

const redSocial = mongoose.model('RedSocial', redSocialSchema);

module.exports.RedSocial = redSocial;
