const { errorLanzado, controlError } = require('../util/error.util');
const notificacionService = require('../services/notificacion.service');

exports.getNotificacionesByBuzonId = async (req, res) => {
  try {
    const buzonId = req.params.buzonId;
    const usuarioLogeado = req.cuentaUsuario;
    const notificaciones = await notificacionService.getNotificacionesByBuzonId(usuarioLogeado, buzonId);
    return res.status(200).send({ notificaciones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getNotificacionesNoLeidasByBuzonId = async (req, res) => {
  try {
    const buzonId = req.params.buzonId;
    const usuarioLogeado = req.cuentaUsuario;
    const notificaciones = await notificacionService.getNotificacionesNoLeidasByBuzonId(usuarioLogeado, buzonId);
    return res.status(200).send({ notificaciones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.enviarNotificacion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { asunto, cuerpo, receptores } = req.body;
    if (!asunto || !cuerpo || !receptores) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const notificacion = await notificacionService.enviarNotificacion(req.body, usuarioLogeado);
    return res.status(200).send({ notificacion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.moverNotificacion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const notificacionId = req.params.id;
    const { buzon } = req.body;
    if (!buzon) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const notificacion = await notificacionService.moverNotificacion(req.body, usuarioLogeado, notificacionId);
    return res.status(200).send({ notificacion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarNotificacion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const notificacionId = req.params.id;
    const notificacion = await notificacionService.eliminarNotificacion(usuarioLogeado, notificacionId);
    return res.status(200).send({ notificacion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.verNotificacion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const notificacionId = req.params.id;
    const notificacion = await notificacionService.verNotificacion(usuarioLogeado, notificacionId);
    return res.status(200).send({ notificacion });
  } catch (error) {
    return controlError(error, res);
  }
};
