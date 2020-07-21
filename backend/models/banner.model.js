const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  imagen: {
    type: {
      data: Buffer,
      mimetype: String,
      size: Number,
    },
    required: [true, 'Inserte una imagen para la banner'],
  },
  orden: {
    type: Number,
    min: 1,
    unique: [true, 'El número del orden ya exsite, inserte otro'],
    required: [true, 'Inserte un número del orden'],
  },
  texto: {
    type: String,
  },
});

const banner = mongoose.model('Banner', bannerSchema);

module.exports.Banner = banner;
