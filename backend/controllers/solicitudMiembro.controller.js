const { errorLanzado, controlError } = require('../util/error.util');
const solicitudMiembroService = require('../services/solicitudMiembro.service');

exports.rellenarSolicitudMiembro = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { tieneCochePropio, comoHaConocidoAsociacion, intereses, habilidades, ideas } = req.body;
    if (!tieneCochePropio || !comoHaConocidoAsociacion || !intereses || !habilidades || !ideas)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const interesesValidos = ['BAILE', 'DIBUJO', 'SOFTCOMBAT', 'TALLERESMANUALIDADES', 'VIDEOJUEGOS', 'COSPLAY'];
    if (!intereses.every((interes) => interesesValidos.includes(interes))) throw errorLanzado(400, 'Los intereses indicados no están definidos');
    const solicitudMiembro = await solicitudMiembroService.rellenarSolicitudMiembro(req.body, usuarioLogeado);
    return res.status(200).send({ solicitudMiembro });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getEstadoSolicitudMiembro = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const solicitudMiembro = await solicitudMiembroService.getEstadoSolicitudMiembro(usuarioLogeado);
    return res.status(200).send({ solicitudMiembro });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getSolicitudesMiembros = async (req, res) => {
  try {
    const solicitudesMiembros = await solicitudMiembroService.getSolicitudesMiembros();
    return res.status(200).send({ solicitudesMiembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getSolicitudesMiembrosPendientes = async (req, res) => {
  try {
    const solicitudesMiembros = await solicitudMiembroService.getSolicitudesMiembrosPendientes();
    return res.status(200).send({ solicitudesMiembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getSolicitudesMiembrosAceptadas = async (req, res) => {
  try {
    const solicitudesMiembros = await solicitudMiembroService.getSolicitudesMiembrosAceptadas();
    return res.status(200).send({ solicitudesMiembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getSolicitudesMiembrosRechazadas = async (req, res) => {
  try {
    const solicitudesMiembros = await solicitudMiembroService.getSolicitudesMiembrosRechazadas();
    return res.status(200).send({ solicitudesMiembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getSolicitudesMiembrosPagadas = async (req, res) => {
  try {
    const solicitudesMiembros = await solicitudMiembroService.getSolicitudesMiembrosPagadas();
    return res.status(200).send({ solicitudesMiembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getSolicitudesMiembrosNoPagadas = async (req, res) => {
  try {
    const solicitudesMiembros = await solicitudMiembroService.getSolicitudesMiembrosNoPagadas();
    return res.status(200).send({ solicitudesMiembros });
  } catch (error) {
    return controlError(error, res);
  }
};
