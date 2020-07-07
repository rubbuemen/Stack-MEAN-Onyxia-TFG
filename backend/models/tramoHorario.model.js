const mongoose = require('mongoose');

const tramoHorarioSchema = new mongoose.Schema({
  horaInicio: {
    type: String,
    required: [true, 'Inserte una hora de inicio'],
    match: [/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'La hora de inicio no mantiene el formato hh:mm'],
  },
  horaFin: {
    type: String,
    required: [true, 'Inserte una hora de fin'],
    match: [/^([01][0-9]|2[0-3]):[0-5][0-9]$/, 'La hora de fin no mantiene el formato hh:mm'],
  },
  asociacionesActividadMiembroTramo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActividadMiembroTramo',
    },
  ],
});

const tramoHorario = mongoose.model('TramoHorario', tramoHorarioSchema);

module.exports.TramoHorario = tramoHorario;
