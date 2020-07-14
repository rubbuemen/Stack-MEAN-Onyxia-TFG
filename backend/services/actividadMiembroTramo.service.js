const { errorLanzado } = require('../util/error.util');
const { ActividadMiembroTramo } = require('../models/actividadMiembroTramo.model');
const { Evento } = require('../models/evento.model');
const { Actividad } = require('../models/actividad.model');
const { DiaEvento } = require('../models/diaEvento.model');
const { Miembro } = require('../models/miembro.model');
const { TramoHorario } = require('../models/tramoHorario.model');

exports.getHorariosByEventoId = async (eventoId) => {
  const horarios = await Evento.findById(eventoId)
    .select('diasEvento -_id')
    .populate({
      path: 'diasEvento',
      select: 'fecha -_id',
      populate: {
        path: 'tramosHorarios',
        select: 'horaInicio horaFin asociacionesActividadMiembroTramo -_id',
        populate: {
          path: 'asociacionesActividadMiembroTramo',
          select: '-_id',
          populate: { path: 'actividad miembro', select: 'actividad.nombre nombre apellidos alias -_id' },
        },
      },
    });
  if (!horarios) throw errorLanzado(404, 'La ID del evento indicado no existe');
  return horarios;
};

exports.addHorarioParaEventoId = async (parametros, eventoId) => {
  let horario;
  let actividadId;
  let miembroId;
  let diaEventoId;
  let tramoHorarioId;
  try {
    const checkExistenciaEvento = await Evento.findById(eventoId);
    if (!checkExistenciaEvento) throw errorLanzado(404, 'La ID del evento indicado no existe');
    actividadId = parametros.actividad;
    miembroId = parametros.miembro;
    diaEventoId = parametros.diaEvento;
    tramoHorarioId = parametros.tramoHorario;

    //Se comprueba si existen los parametros para el evento
    const checkActividad = await Evento.findOne({ _id: eventoId, actividadesEvento: { $in: [actividadId] } });
    if (!checkActividad) throw errorLanzado(403, 'La actividad seleccionada no está asociada con el evento ' + checkExistenciaEvento.nombre);

    const checkMiembro = await Evento.findById(eventoId).populate({
      path: 'inscripcionesEvento',
      match: { estadoInscripcion: 'ACEPTADO', miembro: miembroId },
    });
    if (checkMiembro.inscripcionesEvento.length === 0)
      throw errorLanzado(403, 'El miembro seleccionado no tiene una inscripción aceptada para el evento ' + checkExistenciaEvento.nombre);

    const checkDiaEvento = await Evento.findOne({ _id: eventoId, diasEvento: { $in: [diaEventoId] } });
    if (!checkDiaEvento) throw errorLanzado(403, 'La fecha seleccionada no está asociada al evento ' + checkExistenciaEvento.nombre);
    const dia = await DiaEvento.findById(diaEventoId);

    const checkTramoHorario = await Evento.findById(eventoId).populate({
      path: 'diasEvento',
      match: { _id: diaEventoId, tramosHorarios: { $in: [tramoHorarioId] } },
    });
    if (checkTramoHorario.diasEvento.length === 0)
      throw errorLanzado(403, 'El tramo horario seleccionado no existe para el evento ' + checkExistenciaEvento.nombre + ' del día ' + dia.fecha);

    //Se comprueba que el miembro no está ya asociado a una actividad para el mismo tramo horario del día
    const miembroOcupado = await Evento.findById(eventoId).populate({
      path: 'diasEvento',
      match: { _id: diaEventoId },
      populate: {
        path: 'tramosHorarios',
        match: { _id: tramoHorarioId },
        populate: { path: 'asociacionesActividadMiembroTramo', match: { miembro: miembroId } },
      },
    });

    const horarioOcupado = miembroOcupado.diasEvento[0].tramosHorarios[0].asociacionesActividadMiembroTramo;
    if (horarioOcupado.length !== 0) {
      const actividadAsociada = await Actividad.findById(horarioOcupado[0].actividad);
      const tramoHorarioAsociado = await TramoHorario.findById(tramoHorarioId);
      const diaAsociado = await DiaEvento.findById(diaEventoId);
      throw errorLanzado(
        403,
        'El miembro seleccionado ya está asociado a la actividad ' +
          actividadAsociada.nombre +
          ' para el tramo horario ' +
          tramoHorarioAsociado.horaInicio +
          '-' +
          tramoHorarioAsociado.horaFin +
          ' del día ' +
          diaAsociado.fecha.getDate() +
          '/' +
          (diaAsociado.fecha.getMonth() + 1) +
          '/' +
          diaAsociado.fecha.getFullYear()
      );
    }

    horario = new ActividadMiembroTramo(parametros);
    horario = await horario.save();
    //Cojo las ids de los parametros y hago un findOne de cada uno, entonces les hago un push de ActividadMiembroTramo creada
    await Actividad.findOneAndUpdate(
      { _id: actividadId },
      {
        $push: { asociacionesActividadMiembroTramo: horario._id },
      },
      { new: true }
    );
    await Miembro.findOneAndUpdate(
      { _id: miembroId },
      {
        $push: { asociacionesActividadMiembroTramo: horario._id },
      },
      { new: true }
    );
    await TramoHorario.findOneAndUpdate(
      { _id: tramoHorarioId },
      {
        $push: { asociacionesActividadMiembroTramo: horario._id },
      },
      { new: true }
    );
    return horario;
  } catch (error) {
    if (horario) {
      const checkHorarioInActividad = await Actividad.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
      if (checkHorarioInActividad) await Actividad.updateOne({ _id: actividadId }, { $pull: { asociacionesActividadMiembroTramo: horario._id } });
      const checkHorarioInMiembro = await Miembro.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
      if (checkHorarioInMiembro) await Miembro.updateOne({ _id: miembroId }, { $pull: { asociacionesActividadMiembroTramo: horario._id } });
      const checkHorarioInTramoHorario = await TramoHorario.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
      if (checkHorarioInTramoHorario) await TramoHorario.updateOne({ _id: tramoHorarioId }, { $pull: { asociacionesActividadMiembroTramo: horario._id } });
      await ActividadMiembroTramo.findByIdAndDelete(horario._id);
    }
    throw error;
  }
};

exports.deleteHorario = async (horarioId) => {
  let actividad;
  let miembro;
  let tramoHorario;
  let horario;
  try {
    horario = await ActividadMiembroTramo.findById(horarioId);
    if (!horario) throw errorLanzado(404, 'La asociación del horario que intenta eliminar no existe');
    actividad = await Actividad.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
    await Actividad.findOneAndUpdate(
      { _id: actividad._id },
      {
        $pull: { asociacionesActividadMiembroTramo: horario._id },
      },
      { new: true }
    );
    miembro = await Miembro.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
    await Miembro.findOneAndUpdate(
      { _id: miembro._id },
      {
        $pull: { asociacionesActividadMiembroTramo: horario._id },
      },
      { new: true }
    );
    tramoHorario = await TramoHorario.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
    await TramoHorario.findOneAndUpdate(
      { _id: tramoHorario._id },
      {
        $pull: { asociacionesActividadMiembroTramo: horario._id },
      },
      { new: true }
    );
    horario = await ActividadMiembroTramo.findOneAndDelete(horarioId);
    return horario;
  } catch (error) {
    if (horario) {
      const checkHorarioInActividad = await Actividad.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
      if (!checkHorarioInActividad) await Actividad.updateOne({ _id: actividadId }, { $push: { asociacionesActividadMiembroTramo: horario._id } });
      const checkHorarioInMiembro = await Miembro.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
      if (!checkHorarioInMiembro) await Miembro.updateOne({ _id: miembroId }, { $push: { asociacionesActividadMiembroTramo: horario._id } });
      const checkHorarioInTramoHorario = await TramoHorario.findOne({ asociacionesActividadMiembroTramo: { $in: [horario._id] } });
      if (!checkHorarioInTramoHorario) await TramoHorario.updateOne({ _id: tramoHorarioId }, { $push: { asociacionesActividadMiembroTramo: horario._id } });
    }
    throw error;
  }
};
