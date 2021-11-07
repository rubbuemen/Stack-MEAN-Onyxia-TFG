const mongoose = require('mongoose');

const reunionSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: [true, 'Inserte la fecha del día de la reunión'],
  },
  horaInicio: {
    type: String,
    required: [true, 'Inserte una hora de inicio para la reunión'],
    match: [/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'La hora de inicio no mantiene el formato hh:mm'],
  },
  horaFin: {
    type: String,
    required: [true, 'Inserte una hora de fin para la reunión'],
    match: [/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'La hora de fin no mantiene el formato hh:mm'],
  },
  lugar: {
    type: String,
    required: [true, 'Inserte un lugar para la reunión'],
  },
  estadoReunion: {
    type: String,
    required: [true, 'Especifique el estado de la reunión'],
    default: 'PENDIENTE',
    enum: ['PENDIENTE', 'ENPROGRESO', 'REALIZADO', 'CANCELADO'],
  },
  tipoReunion: {
    type: String,
    required: [true, 'Especifique el tipo de reunión'],
    enum: ['ASOCIACION', 'JUNTADIRECTIVA'],
  },
  temasATratar: {
    type: String,
  },
  decisionesTomadas: {
    type: String,
  },
  actaReunion: {
    type: String,
  },
  asistenciasMiembroReunion: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AsistenciaMiembroReunion',
    },
  ],
});

const reunion = mongoose.model('Reunion', reunionSchema);

module.exports.Reunion = reunion;
