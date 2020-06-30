const mongoose = require('mongoose');

const actividadMiembroTramoSchema = new mongoose.Schema({
  actividad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Actividad',
    required: [true, 'Es obligatorio asignar una actividad a la asociación de actividad-miembro-tramo horario'],
  },
  miembro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro a la asociación de actividad-miembro-tramo horario'],
  },
  tramoHorario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TramoHorario',
    required: [true, 'Es obligatorio asignar un tramo horario a la asociación de actividad-miembro-tramo horario'],
  },
});

const actividadMiembroTramo = mongoose.model('ActividadMiembroTramo', actividadMiembroTramoSchema);

module.exports.ActividadMiembroTramo = actividadMiembroTramo;
