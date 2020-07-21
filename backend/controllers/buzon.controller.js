const { errorLanzado, controlError } = require('../util/error.util');
const buzonService = require('../services/buzon.service');

exports.getBuzones = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzones = await buzonService.getBuzones(usuarioLogeado);
    return res.status(200).send({ buzones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearBuzon = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre } = req.body;
    if (!nombre) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const buzon = await buzonService.crearBuzon(req.body, usuarioLogeado);
    return res.status(200).send({ buzon });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarBuzon = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzonId = req.params.id;
    const { nombre } = req.body;
    if (!nombre) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const buzon = await buzonService.editarBuzon(req.body, usuarioLogeado, buzonId);
    return res.status(200).send({ buzon });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarBuzon = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzonId = req.params.id;
    const buzon = await buzonService.eliminarBuzon(usuarioLogeado, buzonId);
    return res.status(200).send({ buzon });
  } catch (error) {
    return controlError(error, res);
  }
};
