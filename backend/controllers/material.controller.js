const { errorLanzado, controlError } = require('../util/error.util');
const materialService = require('../services/material.service');
const { convertirImagenABase64 } = require('../util/funciones.util');

exports.getMaterialesByActividadId = async (req, res) => {
  try {
    const actividadId = req.params.actividadId;
    const materiales = await materialService.getMaterialesByActividadId(actividadId);
    return res.status(200).send({ materiales });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const material = await materialService.getMaterial(materialId);
    return res.status(200).send({ material });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMateriales = async (req, res) => {
  try {
    const materiales = await materialService.getMateriales();
    return res.status(200).send({ materiales });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearMaterial = async (req, res) => {
  // Al crear un material, se asignará una cantidad de 1 disponible con su estado y si es propio
  //Si se quiere añadir más de ese material se creará nuevo inventario, que hará que se incremente en 1 la cantidad disponible
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, descripcion, estadoMaterial, esPropio } = req.body;
    req.body.cantidadDisponible = 1;
    req.body.cantidadEnUso = 0;
    const fotografia = req.file;
    if (!nombre || !descripcion || !estadoMaterial || esPropio === undefined)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    estados = ['OPERATIVO', 'DETERIORADO'];
    if (!estados.includes(estadoMaterial)) throw errorLanzado(400, 'El estado del material no está definido');
    req.file.data = convertirImagenABase64(fotografia);
    const material = await materialService.crearMaterial(req.body, req.file, usuarioLogeado);
    return res.status(200).send({ material });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarMaterial = async (req, res) => {
  // Al editar un material, su inventario no se edita.
  // La suma de la cantidad disponible y en uso se controlará al añadir inventario a un material
  try {
    const materialId = req.params.id;
    const { nombre, descripcion } = req.body;
    const fotografia = req.file;
    if (!nombre || !descripcion) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (fotografia) {
      req.file.data = convertirImagenABase64(fotografia);
    } else {
      req.file = undefined; // Para el caso que se ha editado pero no se ha cambiado la imagen
    }
    const material = await materialService.editarMaterial(req.body, req.file, materialId);
    return res.status(200).send({ material });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const material = await materialService.eliminarMaterial(materialId);
    return res.status(200).send({ material });
  } catch (error) {
    return controlError(error, res);
  }
};
