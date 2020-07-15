const mongoose = require('mongoose');

const asistenciaMiembroReunionSchema = new mongoose.Schema({
  haMarcadoAsistencia: {
    type: Boolean,
    required: [true, 'Especifique si marca asistencia a la reunión'],
    default: false,
  },
  haAsistido: {
    type: Boolean,
  },
  comentarioAdicional: {
    type: String,
  },
  miembro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro a la asistencia de la reunión'],
  },
  reunion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reunion',
    required: [true, 'Es obligatorio asignar una reunión a la que marca asistencia el miembro'],
  },
});

const asistenciaMiembroReunion = mongoose.model('AsistenciaMiembroReunion', asistenciaMiembroReunionSchema);

module.exports.AsistenciaMiembroReunion = asistenciaMiembroReunion;
