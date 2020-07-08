const mongoose = require('mongoose');

const inscripcionEventoSchema = new mongoose.Schema({
  estadoInscripcion: {
    type: String,
    required: [true, 'Especifique el estado de la inscripción al evento'],
    enum: ['PENDIENTE', 'ACEPTADO', 'RECHAZADO'],
  },
  problemaAlimenticio: {
    type: String,
  },
  tieneCocheDisponible: {
    type: Boolean,
    default: false,
  },
  comentarioAdicional: {
    type: String,
  },
  actividadesInteres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actividad',
    },
  ],
  miembro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro que se inscribe al evento'],
  },
  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: [true, 'Es obligatorio asignar un evento al que se inscribe el miembro'],
  },
});

const inscripcionEvento = mongoose.model('InscripcionEvento', inscripcionEventoSchema);

module.exports.InscripcionEvento = inscripcionEvento;
