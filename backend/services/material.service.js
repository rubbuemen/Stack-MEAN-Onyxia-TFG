const { errorLanzado } = require('../util/error.util');
const { Material } = require('../models/material.model');
const { Miembro } = require('../models/miembro.model');
const { Actividad } = require('../models/actividad.model');
const { Inventario } = require('../models/inventario.model');
const { asyncForEach } = require('../util/funciones.util');

exports.getMaterialesByActividadId = async actividadId => {
  const actividad = await Actividad.findById(actividadId).populate({ path: 'materiales' });
  if (!actividad) throw errorLanzado(404, 'La ID de la actividad indicada no existe');
  return actividad.materiales;
};

exports.getMaterial = async materialId => {
  const material = await Material.findById(materialId).populate({ path: 'inventarios' }).populate({ path: 'miembroCreador' });
  if (!material) throw errorLanzado(404, 'La ID del material indicado no existe');
  return material;
};

exports.getMateriales = async () => {
  const materiales = await Material.find().populate({ path: 'inventarios' }).populate({ path: 'miembroCreador' });
  return materiales;
};

exports.crearMaterial = async (parametros, imagen, usuarioLogeado) => {
  let inventario;
  let material;
  try {
    const checkNombre = await Material.findOne({ nombre: parametros.nombre });
    if (checkNombre) throw errorLanzado(403, 'El nombre introducido ya existe');
    inventario = new Inventario(parametros);
    inventario = await inventario.save();
    const miembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    material = new Material(parametros);
    material.fotografia = {
      data: imagen.data,
      mimetype: imagen.mimetype,
      size: imagen.size,
    };
    material.miembroCreador = miembro;
    material.inventarios.push(inventario);
    material = await material.save();
    return material;
  } catch (error) {
    if (inventario) {
      await Inventario.findByIdAndDelete(inventario._id);
    }
    throw error;
  }
};

exports.editarMaterial = async (parametros, imagen, materialId) => {
  const checkExistencia = await Material.findById(materialId);
  if (!checkExistencia) throw errorLanzado(404, 'El material que intenta editar no existe');
  const checkNombre = await Material.findOne({ nombre: parametros.nombre });
  if (checkNombre && checkNombre.nombre !== checkExistencia.nombre) throw errorLanzado(403, 'El nombre introducido ya existe');
  if (!imagen) {
    imagen = checkExistencia.fotografia; // Para el caso que se ha editado pero no se ha cambiado la imagen
  }
  const material = await Material.findOneAndUpdate(
    { _id: materialId },
    {
      nombre: parametros.nombre,
      descripcion: parametros.descripcion,
      fotografia: {
        data: imagen.data,
        mimetype: imagen.mimetype,
        size: imagen.size,
      },
    },
    { new: true }
  );
  return material;
};

exports.eliminarMaterial = async materialId => {
  const checkExistencia = await Material.findById(materialId).populate({ path: 'inventarios' });
  if (!checkExistencia) throw errorLanzado(404, 'El material que intenta eliminar no existe');
  const estaEnActividad = await Actividad.findOne({ materiales: { $in: [checkExistencia._id] } });
  if (estaEnActividad) throw errorLanzado(403, 'No se puede eliminar el material porque está asociado a la actividad ' + estaEnActividad.nombre);
  if (checkExistencia.cantidadEnUso !== 0) throw errorLanzado(403, 'No se puede eliminar el material porque hay inventario de este en uso');
  const inventarios = checkExistencia.inventarios;
  await asyncForEach(inventarios, async inventario => {
    await Inventario.findByIdAndDelete(inventario._id);
  });
  const material = await Material.findByIdAndDelete(materialId);
  return material;
};
