const { errorLanzado } = require('../util/error.util');
const { Actividad } = require('../models/actividad.model');
const { Miembro } = require('../models/miembro.model');
const { Material } = require('../models/material.model');
const { Evento } = require('../models/evento.model');
const { ActividadMiembroTramo } = require('../models/actividadMiembroTramo.model');

exports.getActividadesPublicas = async () => {
  const actividades = await Actividad.find({ estaPublicado: true }).populate({ path: 'miembroCreador' });
  return actividades;
};

exports.getActividades = async () => {
  const actividades = await Actividad.find().populate({ path: 'miembroCreador' });
  return actividades;
};

exports.crearActividad = async (parametros, imagen, usuarioLogeado) => {
  // Si vienen materiales en los parámetros, se añadirán
  const miembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
  let actividad = new Actividad(parametros);
  actividad.fotografia = {
    data: imagen.data,
    mimetype: imagen.mimetype,
    size: imagen.size,
  };
  actividad.miembroCreador = miembro;
  actividad = await actividad.save();
  return actividad;
};

exports.editarActividad = async (parametros, imagen, actividadId) => {
  // Si vienen materiales en los parámetros, se añadirán
  const checkExistencia = await Actividad.findById(actividadId);
  if (!checkExistencia) throw errorLanzado(404, 'La actividad que intenta editar no existe');
  let materiales = checkExistencia.materiales;
  if (parametros.materiales) {
    materiales = parametros.materiales;
  }
  const actividad = await Actividad.findOneAndUpdate(
    { _id: actividadId },
    {
      nombre: parametros.nombre,
      descripcion: parametros.descripcion,
      reglas: parametros.reglas,
      enVigor: parametros.enVigor,
      materiales: materiales,
      fotografia: {
        data: imagen.data,
        mimetype: imagen.mimetype,
        size: imagen.size,
      },
    },
    { new: true }
  );
  return actividad;
};

exports.eliminarActividad = async (actividadId) => {
  const checkExistencia = await Actividad.findById(actividadId);
  if (!checkExistencia) throw errorLanzado(404, 'La actividad que intenta eliminar no existe');
  const estaEnEvento = await Evento.findOne({ actividades: { $in: [checkExistencia._id] } });
  if (estaEnEvento) throw errorLanzado(403, 'No se puede eliminar la actividad porque está asociada al evento ' + estaEnEvento.nombre);
  const estaEnAsociacionActividadMiembroTramo = await ActividadMiembroTramo.findOne({ actividades: { $in: [checkExistencia._id] } });
  if (estaEnAsociacionActividadMiembroTramo) throw errorLanzado(403, 'No se puede eliminar la actividad porque está asociada al horario de un evento');
  const actividad = await Actividad.findOneAndDelete(actividadId);
  return actividad;
};

exports.publicarActividad = async (actividadId) => {
  const checkExistencia = await Actividad.findById(actividadId);
  if (!checkExistencia) throw errorLanzado(404, 'La actividad que intenta publicar no existe');
  if (checkExistencia.estaPublicado) throw errorLanzado(403, 'La actividad que intenta publicar ya lo está');
  const actividad = await Actividad.findOneAndUpdate(
    { _id: actividadId },
    {
      estaPublicado: true,
    },
    { new: true }
  );
  return actividad;
};

exports.ocultarActividad = async (actividadId) => {
  const checkExistencia = await Actividad.findById(actividadId);
  if (!checkExistencia) throw errorLanzado(404, 'La actividad que intenta ocultar no existe');
  if (!checkExistencia.estaPublicado) throw errorLanzado(403, 'La actividad que intenta ocultar ya lo está');
  const estaEnEvento = await Evento.findOne({ actividades: { $in: [checkExistencia._id] } });
  if (estaEnEvento) throw errorLanzado(403, 'No se puede ocultar la actividad porque está asociada al evento ' + estaEnEvento.nombre);
  const estaEnAsociacionActividadMiembroTramo = await ActividadMiembroTramo.findOne({ actividades: { $in: [checkExistencia._id] } });
  if (estaEnAsociacionActividadMiembroTramo) throw errorLanzado(403, 'No se puede ocultar la actividad porque está asociada al horario de un evento');
  const actividad = await Actividad.findOneAndUpdate(
    { _id: actividadId },
    {
      estaPublicado: false,
    },
    { new: true }
  );
  return actividad;
};

exports.descatalogarActividad = async (actividadId) => {
  const checkExistencia = await Actividad.findById(actividadId);
  if (!checkExistencia) throw errorLanzado(404, 'La actividad que intenta descatalogar no existe');
  if (!checkExistencia.enVigor) throw errorLanzado(403, 'La actividad que intenta descatalogar ya lo está');
  const actividad = await Actividad.findOneAndUpdate(
    { _id: actividadId },
    {
      enVigor: false,
    },
    { new: true }
  );
  return actividad;
};

exports.catalogarActividad = async (actividadId) => {
  const checkExistencia = await Actividad.findById(actividadId);
  if (!checkExistencia) throw errorLanzado(404, 'La actividad que intenta catalogar no existe');
  if (checkExistencia.enVigor) throw errorLanzado(403, 'La actividad que intenta catalogar ya lo está');
  const actividad = await Actividad.findOneAndUpdate(
    { _id: actividadId },
    {
      enVigor: true,
    },
    { new: true }
  );
  return actividad;
};
