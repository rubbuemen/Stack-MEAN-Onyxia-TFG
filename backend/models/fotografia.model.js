const mongoose = require('mongoose');

const fotografiaSchema = new mongoose.Schema({
  imagen: {
    type: {
      data: Buffer,
      mimetype: String,
      size: Number,
    },
    required: [true, 'Inserte una imagen para la fotografia'],
  },
});

const fotografia = mongoose.model('Fotografia', fotografiaSchema);

module.exports.Fotografia = fotografia;
