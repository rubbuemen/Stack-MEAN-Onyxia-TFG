const { controlError } = require('../util/error.util');
const configuracionService = require('../services/configuracion.service');

exports.getConfiguracion = async (req, res) => {
  try {
    const configuracion = await configuracionService.getConfiguracion();
    return res.status(200).send({ configuracion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.activarModoMantenimiento = async (req, res) => {
  try {
    const configuracion = await configuracionService.activarModoMantenimiento();
    return res.status(200).send({ configuracion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.desactivarModoMantenimiento = async (req, res) => {
  try {
    const configuracion = await configuracionService.desactivarModoMantenimiento();
    return res.status(200).send({ configuracion });
  } catch (error) {
    return controlError(error, res);
  }
};
exports.mostrarBanners = async (req, res) => {
  try {
    const configuracion = await configuracionService.mostrarBanners();
    return res.status(200).send({ configuracion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.ocultarBanners = async (req, res) => {
  try {
    const configuracion = await configuracionService.ocultarBanners();
    return res.status(200).send({ configuracion });
  } catch (error) {
    return controlError(error, res);
  }
};
