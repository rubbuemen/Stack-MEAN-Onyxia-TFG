const { errorLanzado, controlError } = require('../util/error.util');
const actividadService = require('../services/actividad.service');
const convertirImagenABase64 = require('../util/funciones.util');

exports.getActividadesPublicas = async (req, res) => {
  try {
    const actividades = await actividadService.getActividadesPublicas();
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividades = async (req, res) => {
  try {
    const actividades = await actividadService.getActividades();
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearActividad = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, descripcion, reglas, enVigor } = req.body;
    const fotografia = req.file;
    if (!nombre || !descripcion || !reglas || !enVigor || !fotografia) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    req.file.data = convertirImagenABase64(fotografia);
    const actividad = await actividadService.crearActividad(req.body, req.file, usuarioLogeado);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};
