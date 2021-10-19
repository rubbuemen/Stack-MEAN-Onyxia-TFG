const { errorLanzado } = require('../util/error.util');
const { DiaEvento } = require('../models/diaEvento.model');
const { Evento } = require('../models/evento.model');
const { Actividad } = require('../models/actividad.model');
const { Miembro } = require('../models/miembro.model');
const { TramoHorario } = require('../models/tramoHorario.model');
const { ActividadMiembroTramo } = require('../models/actividadMiembroTramo.model');
const { asyncForEach } = require('../util/funciones.util');

exports.getDiasByEventoId = async eventoId => {
  const evento = await Evento.findById(eventoId).populate({ path: 'diasEvento' });
  if (!evento) throw errorLanzado(404, 'La ID del evento indicado no existe');
  return evento.diasEvento;
};

exports.getDiaEvento = async id => {
  const diaEvento = await DiaEvento.findById(id).populate({ path: 'tramosHorarios', options: { sort: { horaInicio: 1 } } });
  if (!diaEvento) throw errorLanzado(404, 'La ID del día del evento indicado no existe');
  return diaEvento;
};

exports.getDiaEventoPorTramoHorarioId = async tramoHorarioId => {
  const diaEvento = await DiaEvento.findOne({ tramosHorarios: { $in: [tramoHorarioId] } });
  if (!diaEvento) throw errorLanzado(404, 'No se encuentra ningún día para el tramo de horario indicado');
  return diaEvento;
};

exports.addDiaParaEventoId = async eventoId => {
  let diaEvento;
  try {
    const evento = await Evento.findById(eventoId).populate({ path: 'diasEvento', options: { sort: { fecha: -1 } } });
    if (!evento) throw errorLanzado(404, 'El evento al que intenta añadir un día no existe');
    if (evento.estadoEvento !== 'PENDIENTE') throw errorLanzado(403, 'El evento al que intenta añadir días debe estar en un estado de pendiente de realizarse');
    const ultimaFecha = evento.diasEvento[0].fecha;
    const fecha = new Date(ultimaFecha.getTime() + 24 * 60 * 60 * 1000);
    diaEvento = new DiaEvento({ fecha });
    diaEvento = await diaEvento.save();
    await Evento.findOneAndUpdate(
      { _id: eventoId },
      {
        $push: { diasEvento: diaEvento._id },
      },
      { new: true }
    );
    return diaEvento;
  } catch (error) {
    if (diaEvento) {
      await DiaEvento.findByIdAndDelete(diaEvento._id);
    }
    throw error;
  }
};

exports.deleteDiaParaEventoId = async eventoId => {
  // Se elimina el último día del evento
  const evento = await Evento.findById(eventoId).populate({ path: 'diasEvento', options: { sort: { fecha: -1 } } });
  if (!evento) throw errorLanzado(404, 'El evento al que intenta eliminar un día no existe');
  if (evento.estadoEvento !== 'PENDIENTE') throw errorLanzado(403, 'El evento al que intenta eliminar días debe estar en un estado de pendiente de realizarse');
  if (evento.diasEvento.length === 1) throw errorLanzado(403, 'No se puede eliminar el día del evento porque es el único día asignado');
  const diaEvento = evento.diasEvento[0];
  await asyncForEach(diaEvento.tramosHorarios, async tramo => {
    const actividadMiembroTramo = await ActividadMiembroTramo.findOne({ tramoHorario: tramo });
    if (actividadMiembroTramo !== null) {
      const actividad = await Actividad.findById(actividadMiembroTramo.actividad);
      const miembro = await Miembro.findById(actividadMiembroTramo.miembro);
      await Actividad.findOneAndUpdate(
        { _id: actividad._id },
        {
          $pull: { asociacionesActividadMiembroTramo: actividadMiembroTramo._id },
        },
        { new: true }
      );
      await Miembro.findOneAndUpdate(
        { _id: miembro._id },
        {
          $pull: { asociacionesActividadMiembroTramo: actividadMiembroTramo._id },
        },
        { new: true }
      );
      await ActividadMiembroTramo.findByIdAndDelete(actividadMiembroTramo._id);
    }
    await TramoHorario.findByIdAndDelete(tramo);
  });
  await Evento.findOneAndUpdate(
    { _id: eventoId },
    {
      $pull: { diasEvento: diaEvento._id },
    },
    { new: true }
  );
  await DiaEvento.findByIdAndDelete(diaEvento._id);
  return diaEvento;
};
