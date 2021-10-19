const { errorLanzado } = require('../util/error.util');
const { DiaEvento } = require('../models/diaEvento.model');
const { TramoHorario } = require('../models/tramoHorario.model');

exports.getTramosHorariosByDiaId = async diaEventoId => {
  const diaEvento = await DiaEvento.findById(diaEventoId).populate({ path: 'tramosHorarios', options: { sort: { horaInicio: 1 } } });
  if (!diaEvento) throw errorLanzado(404, 'La ID del día del evento indicado no existe');
  return diaEvento.tramosHorarios;
};

exports.getTramoHorario = async id => {
  const tramoHorario = await TramoHorario.findById(id);
  if (!tramoHorario) throw errorLanzado(404, 'La ID del tramo horario indicado no existe');
  return tramoHorario;
};

exports.addTramoHorarioParaDiaId = async (parametros, diaEventoId) => {
  let tramoHorario;
  try {
    const diaEvento = await DiaEvento.findById(diaEventoId).populate({ path: 'tramosHorarios', options: { sort: { horaFin: -1 } } });
    if (!diaEvento) throw errorLanzado(404, 'El día del evento al que intenta añadir un tramo horario no existe');
    //Si es la primera que se crea, se deja poner hora inicio y hora fin. Si ya existe una, la hora de inicio debe coincidir con la hora fin del anterior
    if (diaEvento.tramosHorarios.length !== 0 && diaEvento.tramosHorarios[0].horaFin !== parametros.horaInicio)
      throw errorLanzado(403, 'La hora de inicio debe coincidir con la hora de fin del último tramo horario: ' + diaEvento.tramosHorarios[0].horaFin);
    tramoHorario = new TramoHorario(parametros);
    tramoHorario = await tramoHorario.save();
    await DiaEvento.findOneAndUpdate(
      { _id: diaEventoId },
      {
        $push: { tramosHorarios: tramoHorario._id },
      },
      { new: true }
    );
    return tramoHorario;
  } catch (error) {
    if (tramoHorario) {
      await TramoHorario.findByIdAndDelete(tramoHorario._id);
    }
    throw error;
  }
};

exports.editarTramoHorario = async (parametros, tramoHorarioId) => {
  let tramoHorario = await TramoHorario.findById(tramoHorarioId);
  if (!tramoHorario) throw errorLanzado(404, 'El tramo horario que intenta editar no existe');
  const diaEvento = await DiaEvento.findOne({ tramosHorarios: { $in: [tramoHorario._id] } }).populate({
    path: 'tramosHorarios',
    options: { sort: { horaInicio: 1 } },
  });
  if (diaEvento.tramosHorarios.length > 1) {
    //Si se está editando la primera, la hora de fin hará que cambiar la hora de inicio del siguiente tramo
    if (tramoHorario.id === diaEvento.tramosHorarios[0].id) {
      const siguienteTramo = diaEvento.tramosHorarios[1];
      if (parametros.horaFin >= siguienteTramo.horaFin)
        throw errorLanzado(403, 'La hora de fin debe ser menor que la hora de fin del siguiente tramo horario: ' + siguienteTramo.horaFin);
      await TramoHorario.findOneAndUpdate(
        { _id: siguienteTramo._id },
        {
          horaInicio: parametros.horaFin,
        },
        { new: true }
      );
      //Si se está editando la última, la hora de inicio hará que cambie la hora de fin del anterior tramo
    } else if (tramoHorario.id === diaEvento.tramosHorarios[diaEvento.tramosHorarios.length - 1].id) {
      const anteriorTramo = diaEvento.tramosHorarios[diaEvento.tramosHorarios.length - 2];
      if (parametros.horaInicio <= anteriorTramo.horaInicio)
        throw errorLanzado(403, 'La hora de inicio debe ser mayor que la hora de inicio del anterior tramo horario: ' + anteriorTramo.horaInicio);
      await TramoHorario.findOneAndUpdate(
        { _id: anteriorTramo._id },
        {
          horaFin: parametros.horaInicio,
        },
        { new: true }
      );
      //Si es una de en medio, la hora de inicio hará que cambie la hora de fin del anterior tramo y la hora de fin hará que cambie la hora de inicio del siguiente tramo
    } else {
      let indiceActual = 0;
      for (const tramo of diaEvento.tramosHorarios) {
        if (tramo.id === tramoHorario.id) break;
        indiceActual++;
      }
      const siguienteTramo = diaEvento.tramosHorarios[indiceActual + 1];
      const anteriorTramo = diaEvento.tramosHorarios[indiceActual - 1];
      if (parametros.horaFin >= siguienteTramo.horaFin)
        throw errorLanzado(403, 'La hora de fin debe ser menor que la hora de fin del siguiente tramo horario: ' + siguienteTramo.horaFin);
      if (parametros.horaInicio <= anteriorTramo.horaInicio)
        throw errorLanzado(403, 'La hora de inicio debe ser mayor que la hora de inicio del anterior tramo horario: ' + anteriorTramo.horaInicio);
      await TramoHorario.findOneAndUpdate(
        { _id: siguienteTramo._id },
        {
          horaInicio: parametros.horaFin,
        },
        { new: true }
      );
      await TramoHorario.findOneAndUpdate(
        { _id: anteriorTramo._id },
        {
          horaFin: parametros.horaInicio,
        },
        { new: true }
      );
    }
  }
  tramoHorario = await TramoHorario.findOneAndUpdate(
    { _id: tramoHorario._id },
    {
      horaInicio: parametros.horaInicio,
      horaFin: parametros.horaFin,
    },
    { new: true }
  );
  return tramoHorario;
};

exports.deleteTramoHorario = async tramoHorarioId => {
  let tramoHorario;
  try {
    tramoHorario = await TramoHorario.findById(tramoHorarioId);
    if (!tramoHorario) throw errorLanzado(404, 'El tramo horario que intenta eliminar no existe');
    const diaEvento = await DiaEvento.findOne({ tramosHorarios: { $in: [tramoHorario._id] } }).populate({
      path: 'tramosHorarios',
      options: { sort: { horaInicio: 1 } },
    });
    await DiaEvento.updateOne({ _id: diaEvento._id }, { $pull: { tramosHorarios: tramoHorario._id } });
    tramoHorario = await TramoHorario.findByIdAndDelete(tramoHorarioId);
    //Si no es el primero o el último, se setea la hora de inicio del siguiente tramo con la hora de fin del tramo anterior
    if (tramoHorario.id !== diaEvento.tramosHorarios[0].id && tramoHorario.id !== diaEvento.tramosHorarios[diaEvento.tramosHorarios.length - 1].id) {
      let indiceActual = 0;
      for (const tramo of diaEvento.tramosHorarios) {
        if (tramo.id === tramoHorario.id) break;
        indiceActual++;
      }
      const siguienteTramo = diaEvento.tramosHorarios[indiceActual + 1];
      const anteriorTramo = diaEvento.tramosHorarios[indiceActual - 1];
      await TramoHorario.findOneAndUpdate(
        { _id: siguienteTramo._id },
        {
          horaInicio: anteriorTramo.horaFin,
        },
        { new: true }
      );
    }
    return tramoHorario;
  } catch (error) {
    if (tramoHorario) {
      const checkTramoHorarioInDia = await DiaEvento.findOne({ tramosHorarios: { $in: [tramoHorario._id] } });
      if (!checkTramoHorarioInDia) await DiaEvento.updateOne({ _id: diaEvento._id }, { $push: { tramosHorarios: tramoHorario._id } });
    }
    throw error;
  }
};
