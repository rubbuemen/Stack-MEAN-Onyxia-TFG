const mongoose = require('mongoose');

const actividadSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Inserte un nombre'],
  },
  descripcion: {
    type: String,
    required: [true, 'Inserte una descripción'],
  },
  fotografia: {
    type: {
      data: Buffer,
      mimetype: String,
      size: Number,
    },
    required: [true, 'Inserte una fotografía'],
  },
  reglas: {
    type: String,
    required: [true, 'Inserte unas reglas'],
  },
  estaPublicado: {
    type: Boolean,
    required: [true, 'Especifique si el actividad está publicada'],
    default: false,
  },
  fechaPublicacion: {
    type: Date,
    required: [true, 'No se ha asignado ninguna fecha de publicación de la actividad'],
    default: Date.now,
  },
  enVigor: {
    type: Boolean,
    required: [true, 'Especifique si la actividad se encuentra en vigor'],
    default: true,
  },
  miembroCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro que publica la actividad'],
  },
  asociacionesActividadMiembroTramo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActividadMiembroTramo',
    },
  ],
  materiales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Material',
    },
  ],
});

const actividad = mongoose.model('Actividad', actividadSchema);

module.exports.Actividad = actividad;
