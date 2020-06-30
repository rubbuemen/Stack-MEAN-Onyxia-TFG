const { errorLanzado } = require('../util/error.util');
const { Actividad } = require('../models/actividad.model');
const { Miembro } = require('../models/miembro.model');
const { Material } = require('../models/material.model');

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
