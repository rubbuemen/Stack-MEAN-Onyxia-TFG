const { errorLanzado } = require('../util/error.util');
const { Inventario } = require('../models/inventario.model');
const { Material } = require('../models/material.model');

exports.getInventarioByMaterialId = async (materialId) => {
  const material = await Material.findById(materialId).populate({ path: 'inventarios' });
  if (!material) throw errorLanzado(404, 'La ID del material indicado no existe');
  return material.inventarios;
};

exports.addInventarioParaMaterialId = async (parametros, materialId) => {
  let inventario;
  try {
    const material = await Material.findById(materialId);
    if (!material) throw errorLanzado(404, 'El material al que intenta añadir inventario no existe');
    inventario = new Inventario(parametros);
    inventario = await inventario.save();
    await Material.findOneAndUpdate(
      { _id: materialId },
      {
        cantidadDisponible: material.cantidadDisponible + 1,
        $push: { inventarios: inventario._id },
      },
      { new: true }
    );
    return inventario;
  } catch (error) {
    if (inventario) {
      await Inventario.findByIdAndDelete(inventario._id);
    }
    throw error;
  }
};

exports.descatalogarInventario = async (inventarioId) => {
  let material;
  let inventario;
  try {
    inventario = await Inventario.findById(inventarioId);
    if (!inventario) throw errorLanzado(404, 'El inventario del material que intenta eliminar no existe');
    if (inventario.enUso) throw errorLanzado(403, 'No se puede descatalogar el inventario del material porque está en uso');
    material = await Material.findOne({ inventarios: { $in: [inventario._id] } });
    await Material.findOneAndUpdate(
      { _id: material._id },
      {
        cantidadDisponible: material.cantidadDisponible - 1,
        $pull: { inventarios: inventario._id },
      },
      { new: true }
    );
    inventario = await Inventario.findOneAndDelete(inventarioId);
    return inventario;
  } catch (error) {
    const checkInvetarioInMaterial = await Material.findOne({ inventarios: { $in: [inventario._id] } });
    if (!checkInvetarioInMaterial)
      await Material.updateOne({ _id: material._id }, { cantidadDisponible: material.cantidadDisponible + 1, $push: { inventarios: inventario._id } });
    throw error;
  }
};

exports.deteriorarInventario = async (inventarioId) => {
  const checkExistencia = await Inventario.findById(inventarioId);
  if (!checkExistencia) throw errorLanzado(404, 'El inventario del material que intenta deteriorar no existe');
  if (checkExistencia.enUso) throw errorLanzado(403, 'No se puede deteriorar el inventario del material porque está en uso');
  if (checkExistencia.estadoMaterial === 'DETERIORADO') throw errorLanzado(403, 'No se puede deteriorar el inventario del material porque ya lo está');
  const inventario = await Inventario.findOneAndUpdate(
    { _id: inventarioId },
    {
      estadoMaterial: 'DETERIORADO',
    },
    { new: true }
  );
  return inventario;
};

exports.arreglarInventario = async (inventarioId) => {
  const checkExistencia = await Inventario.findById(inventarioId);
  if (!checkExistencia) throw errorLanzado(404, 'El inventario del material que intenta arreglar no existe');
  if (checkExistencia.enUso) throw errorLanzado(403, 'No se puede arreglar el inventario del material porque está en uso');
  if (checkExistencia.estadoMaterial === 'OPERATIVO') throw errorLanzado(403, 'No se puede arreglar el inventario del material porque está ya operativo');
  const inventario = await Inventario.findOneAndUpdate(
    { _id: inventarioId },
    {
      estadoMaterial: 'OPERATIVO',
    },
    { new: true }
  );
  return inventario;
};
