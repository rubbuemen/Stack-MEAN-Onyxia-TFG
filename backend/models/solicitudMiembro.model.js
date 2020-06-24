const mongoose = require('mongoose');

const solicitudMiembroSchema = new mongoose.Schema({
  tieneCochePropio: {
    type: Boolean,
    required: [true, 'Especifique si tiene coche propio'],
    default: false,
  },
  comoHaConocidoAsociacion: {
    type: String,
    required: [true, 'Inserte cómo ha conocido la asociación'],
  },
  intereses: [
    {
      type: String,
      required: [true, 'Seleccione los intereses'],
      enum: ['BAILE', 'DIBUJO', 'SOFTCOMBAT', 'TALLERESMANUALIDADES', 'VIDEOJUEGOS', 'COSPLAY'],
    },
  ],
  habilidades: {
    type: String,
    required: [true, 'Inserte algunas habilidades'],
  },
  ideas: {
    type: String,
    required: [true, 'Inserte algunas ideas'],
  },
  estadoSolicitud: {
    type: String,
    required: [true, 'Especifique un estado de la solicitud'],
    enum: ['PENDIENTE', 'ACEPTADO', 'RECHAZADO'],
    default: 'PENDIENTE',
  },
  estaPagado: {
    type: Boolean,
    required: [true, 'Especifique si la solicitud está pagada'],
    default: false,
  },
  miembrosConocidos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Miembro',
    },
  ],
});

const solicitudMiembro = mongoose.model('SolicitudMiembro', solicitudMiembroSchema);

module.exports.SolicitudMiembro = solicitudMiembro;
