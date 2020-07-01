const { errorLanzado, controlError } = require('../util/error.util');
const inventarioService = require('../services/inventario.service');

exports.getInventarioByMaterialId = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const inventarios = await inventarioService.getInventarioByMaterialId(materialId);
    return res.status(200).send({ inventarios });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.addInventarioParaMaterialId = async (req, res) => {
  try {
    const materialId = req.params.materialId;
    const { estadoMaterial, esPropio } = req.body;
    if (!estadoMaterial || !esPropio) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    estados = ['OPERATIVO', 'DETERIORADO'];
    if (!estados.includes(estadoMaterial)) throw errorLanzado(400, 'El estado del material no está definido');
    const inventario = await inventarioService.addInventarioParaMaterialId(req.body, materialId);
    return res.status(200).send({ inventario });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.descatalogarInventario = async (req, res) => {
  try {
    const inventarioId = req.params.id;
    const inventario = await inventarioService.descatalogarInventario(inventarioId);
    return res.status(200).send({ inventario });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.deteriorarInventario = async (req, res) => {
  try {
    const inventarioId = req.params.id;
    const inventario = await inventarioService.deteriorarInventario(inventarioId);
    return res.status(200).send({ inventario });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.arreglarInventario = async (req, res) => {
  try {
    const inventarioId = req.params.id;
    const inventario = await inventarioService.arreglarInventario(inventarioId);
    return res.status(200).send({ inventario });
  } catch (error) {
    return controlError(error, res);
  }
};
