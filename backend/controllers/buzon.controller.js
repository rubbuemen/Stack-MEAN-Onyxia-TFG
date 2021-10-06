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

exports.getBuzonesCreados = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzones = await buzonService.getBuzonesCreados(usuarioLogeado);
    return res.status(200).send({ buzones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getBuzonEntrada = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzon = await buzonService.getBuzonEntrada(usuarioLogeado);
    return res.status(200).send({ buzon });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getBuzonSalida = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzon = await buzonService.getBuzonSalida(usuarioLogeado);
    return res.status(200).send({ buzon });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getBuzonPapelera = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzon = await buzonService.getBuzonPapelera(usuarioLogeado);
    return res.status(200).send({ buzon });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getBuzon = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const buzonId = req.params.id;
    const buzon = await buzonService.getBuzon(usuarioLogeado, buzonId);
    return res.status(200).send({ buzon });
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
