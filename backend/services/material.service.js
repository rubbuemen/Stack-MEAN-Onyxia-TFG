const { errorLanzado } = require('../util/error.util');
const { Material } = require('../models/material.model');
const { Miembro } = require('../models/miembro.model');
const { Actividad } = require('../models/actividad.model');
const { Inventario } = require('../models/inventario.model');
const { Evento } = require('../models/evento.model');

exports.getMaterialesByActividadId = async (actividadId) => {
  const actividad = await Actividad.findById(actividadId).populate({ path: 'materiales' });
  if (!actividad) throw errorLanzado(404, 'La ID de la actividad indicada no existe');
  return actividad.materiales;
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
  if (!checkExistencia) throw errorLanzado(404, 'La material que intenta editar no existe');
  const checkNombre = await Material.findOne({ nombre: parametros.nombre });
  if (checkNombre && checkNombre.nombre !== checkExistencia.nombre) throw errorLanzado(403, 'El nombre introducido ya existe');
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

// exports.eliminarMaterial = async (materialId) => {
//   const checkExistencia = await Material.findById(materialId);
//   if (!checkExistencia) throw errorLanzado(404, 'La material que intenta eliminar no existe');
//   const estaEnEvento = await Evento.findOne({ materiales: { $in: [checkExistencia._id] } });
//   if (estaEnEvento) throw errorLanzado(403, 'No se puede eliminar la material porque está asociada al evento ' + estaEnEvento.nombre);
//   const estaEnAsociacionMaterialMiembroTramo = await MaterialMiembroTramo.findOne({ materiales: { $in: [checkExistencia._id] } });
//   if (estaEnAsociacionMaterialMiembroTramo) throw errorLanzado(403, 'No se puede eliminar la material porque está asociada al horario de un evento');
//   const material = await Material.findOneAndDelete(materialId);
//   return material;
// };
