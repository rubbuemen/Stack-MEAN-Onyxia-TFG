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

exports.moverNotificaciones = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { buzon, notificaciones } = req.body;
    if (!notificaciones) throw errorLanzado(400, 'No ha seleccionado ninguna notificación');
    if (!buzon) throw errorLanzado(400, 'No ha seleccionado ningún buzón de destino');
    const notificacionesTratadas = await notificacionService.moverNotificaciones(req.body, usuarioLogeado);
    return res.status(200).send({ notificacionesTratadas });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarNotificaciones = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { notificaciones } = req.body;
    console.log(req.body);
    console.log(notificaciones);
    if (!notificaciones) throw errorLanzado(400, 'No ha seleccionado ninguna notificación');
    const notificacionesTratadas = await notificacionService.eliminarNotificaciones(req.body, usuarioLogeado);
    return res.status(200).send({ notificacionesTratadas });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getNotificacion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const notificacionId = req.params.id;
    const notificacion = await notificacionService.getNotificacion(usuarioLogeado, notificacionId);
    return res.status(200).send({ notificacion });
  } catch (error) {
    return controlError(error, res);
  }
};
