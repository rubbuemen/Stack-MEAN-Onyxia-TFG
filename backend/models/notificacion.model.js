const mongoose = require('mongoose');

const notificacionSchema = new mongoose.Schema({
  asunto: {
    type: String,
    required: [true, 'Inserte un asunto de la notificación'],
  },
  cuerpo: {
    type: String,
    required: [true, 'Inserte un cuerpo de la notificación'],
  },
  fecha: {
    type: Date,
    required: [true, 'No se ha asignado ninguna fecha de la notificación'],
    validate: {
      validator: (fecha) => {
        return fecha < new Date();
      },
      message: 'Inserte una fecha en pasado',
    },
    default: Date.now,
  },
  receptoresVisitantes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visitante',
    },
  ],
  receptoresMiembros: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Miembro',
    },
  ],
  emisorVisitante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Visitante',
  },
  emisorMiembro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
  },
});

const notificacion = mongoose.model('Notificacion', notificacionSchema);

module.exports.Notificacion = notificacion;
