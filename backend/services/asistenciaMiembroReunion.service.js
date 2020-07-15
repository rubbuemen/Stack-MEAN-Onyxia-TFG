const { errorLanzado } = require('../util/error.util');
const { Reunion } = require('../models/reunion.model');
const { Miembro } = require('../models/miembro.model');
const { AsistenciaMiembroReunion } = require('../models/asistenciaMiembroReunion.model');
const { asyncForEach, esHoy } = require('../util/funciones.util');

exports.getAsistenciasReunion = async (reunionId) => {
  const asistencias = await AsistenciaMiembroReunion.find({ reunion: reunionId }).populate({ path: 'miembro' });
  return asistencias;
};

exports.marcarAsistenciaReunion = async (parametros, reunionId, usuarioLogeado) => {
  const checkExistencia = await Reunion.findById(reunionId);
  if (!checkExistencia) throw errorLanzado(404, 'La reunión a la que intenta marcar asistencia no existe');
  if (checkExistencia.estadoReunion !== 'PENDIENTE')
    throw errorLanzado(403, 'La reunión a la que intenta marcar asistencia no puede hacerse porque está en un estado diferente a pendiente');
  const miembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
  let asistencia = await AsistenciaMiembroReunion.findOne({ reunion: reunionId, miembro: miembro._id });
  asistencia = await AsistenciaMiembroReunion.findOneAndUpdate(
    { _id: asistencia._id },
    {
      haMarcadoAsistencia: parametros.haMarcadoAsistencia,
      comentarioAdicional: parametros.comentarioAdicional,
    },
    { new: true }
  );
  return asistencia;
};

exports.verificarAsistenciaMiembroReunion = async (miembroId, reunionId) => {
  const checkExistenciaMiembro = await Miembro.findById(miembroId);
  if (!checkExistenciaMiembro) throw errorLanzado(404, 'El miembro al que intentar verificarle la asistencia no existe');
  const checkExistenciaReunion = await Reunion.findById(reunionId);
  if (!checkExistenciaReunion) throw errorLanzado(404, 'La reunión a la que intenta verificar la asistencia no existe');
  if (checkExistenciaReunion.estadoReunion !== 'REALIZADO')
    throw errorLanzado(403, 'La reunión a la que intenta verificar asistencia no puede hacerse porque no se ha realizado');
  let asistencia = await AsistenciaMiembroReunion.findOne({ reunion: reunionId, miembro: miembroId });
  asistencia = await AsistenciaMiembroReunion.findOneAndUpdate(
    { _id: asistencia._id },
    {
      haAsistido: true,
    },
    { new: true }
  );
  return asistencia;
};
