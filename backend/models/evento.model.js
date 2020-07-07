const mongoose = require('mongoose');

const eventoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Inserte un nombre'],
  },
  descripcion: {
    type: String,
    required: [true, 'Inserte una descripción'],
  },
  lugar: {
    type: String,
    required: [true, 'Inserte un lugar'],
  },
  cupoInscripciones: {
    type: Number,
    min: 0,
    required: [true, 'Inserte un número de cupo de inscripciones'],
  },
  estadoEvento: {
    type: String,
    required: [true, 'Especifique el estado del evento'],
    enum: ['PENDIENTE', 'ENPROGRESO', 'REALIZADO', 'CANCELADO'],
  },
  estaPublicado: {
    type: Boolean,
    required: [true, 'Especifique si el evento está publicado'],
    default: false,
  },
  esFueraSevilla: {
    type: Boolean,
    required: [true, 'Especifique si el evento es fuera de Sevilla'],
    default: false,
  },
  miembroCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro que publica el evento'],
  },
  diasEvento: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DiaEvento',
      required: [true, 'Es obligatorio asignar al menos un día al evento'],
    },
  ],
  actividadesEvento: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actividad',
      required: [true, 'Es obligatorio asignar al menos una actividad al evento'],
    },
  ],
  inscripcionesEvento: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InscripcionEvento',
    },
  ],
  inventarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventario',
    },
  ],
});

const evento = mongoose.model('Evento', eventoSchema);

module.exports.Evento = evento;
