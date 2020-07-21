const mongoose = require('mongoose');

const buzonSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Inserte un nombre del buzón'],
  },
  esPorDefecto: {
    type: Boolean,
    required: [true, 'Especifique si es un buzón por defecto del sistema'],
    default: false,
  },
  notificaciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Notificacion',
    },
  ],
});

const buzon = mongoose.model('Buzon', buzonSchema);

module.exports.Buzon = buzon;
