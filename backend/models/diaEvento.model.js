const mongoose = require('mongoose');

const diaEventoSchema = new mongoose.Schema({
  fecha: {
    type: Date,
    required: [true, 'Inserte la fecha del día del evento'],
  },
  tramosHorarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TramoHorario',
      required: [true, 'Es obligatorio asignar al menos un tramo horario al día del evento'],
    },
  ],
});

const diaEvento = mongoose.model('DiaEvento', diaEventoSchema);

module.exports.DiaEvento = diaEvento;
