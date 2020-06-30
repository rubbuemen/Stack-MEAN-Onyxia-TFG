const { errorLanzado } = require('../util/error.util');
const { Actividad } = require('../models/actividad.model');
const { Miembro } = require('../models/miembro.model');

exports.getActividadesPublicas = async () => {
  const actividades = await Actividad.find({ estaPublicado: true }).populate({ path: 'miembroCreador' });
  return actividades;
};

exports.getActividades = async () => {
  const actividades = await Actividad.find().populate({ path: 'miembroCreador' });
  return actividades;
};

exports.crearActividad = async (parametros, imagen, usuarioLogeado) => {
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
