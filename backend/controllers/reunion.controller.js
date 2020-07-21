const { errorLanzado, controlError } = require('../util/error.util');
const reunionService = require('../services/reunion.service');

exports.getReuniones = async (req, res) => {
  try {
    const reuniones = await reunionService.getReuniones();
    return res.status(200).send({ reuniones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getReunionesPendientes = async (req, res) => {
  try {
    const reuniones = await reunionService.getReunionesPendientes();
    return res.status(200).send({ reuniones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getReunionesRealizadas = async (req, res) => {
  try {
    const reuniones = await reunionService.getReunionesRealizadas();
    return res.status(200).send({ reuniones });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearReunion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { fecha, horaInicio, horaFin, lugar, tipoReunion } = req.body;
    if (!fecha || !horaInicio || !horaFin || !lugar || !tipoReunion) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    req.body.fecha = new Date(fecha);
    if (req.body.fecha <= new Date()) throw errorLanzado(400, 'La fecha de la reunion insertada no es futuro');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) throw errorLanzado(400, 'La hora de inicio de la reunión no mantiene el formato hh:mm');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaFin)) throw errorLanzado(400, 'La hora de fin de la reunión no mantiene el formato hh:mm');
    if (horaInicio >= horaFin) throw errorLanzado(400, 'La hora de inicio debe ser anterior a la hora de fin de la reunión');
    tipos = ['ASOCIACION', 'JUNTADIRECTIVA'];
    if (!tipos.includes(tipoReunion)) throw errorLanzado(400, 'El tipo de reunión no está definido');
    const reunion = await reunionService.crearReunion(req.body, usuarioLogeado);
    return res.status(200).send({ reunion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarReunion = async (req, res) => {
  try {
    const reunionId = req.params.id;
    const { fecha, horaInicio, horaFin, lugar, tipoReunion } = req.body;
    if (!fecha || !horaInicio || !horaFin || !lugar || !tipoReunion) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    req.body.fecha = new Date(fecha);
    if (req.body.fecha <= new Date()) throw errorLanzado(400, 'La fecha de la reunion insertada no es futuro');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) throw errorLanzado(400, 'La hora de inicio de la reunión no mantiene el formato hh:mm');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaFin)) throw errorLanzado(400, 'La hora de fin de la reunión no mantiene el formato hh:mm');
    if (horaInicio >= horaFin) throw errorLanzado(400, 'La hora de inicio debe ser anterior a la hora de fin de la reunión');
    tipos = ['ASOCIACION', 'JUNTADIRECTIVA'];
    if (!tipos.includes(tipoReunion)) throw errorLanzado(400, 'El tipo de reunión no está definido');
    const reunion = await reunionService.editarReunion(req.body, reunionId);
    return res.status(200).send({ reunion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.añadirInformacionReunionRealizada = async (req, res) => {
  try {
    const reunionId = req.params.id;
    const { decisionesTomadas, actaReunion } = req.body;
    if (!decisionesTomadas || !actaReunion) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const reunion = await reunionService.añadirInformacionReunionRealizada(req.body, reunionId);
    return res.status(200).send({ reunion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarReunion = async (req, res) => {
  try {
    const reunionId = req.params.id;
    const reunion = await reunionService.eliminarReunion(reunionId);
    return res.status(200).send({ reunion });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.cancelarReunion = async (req, res) => {
  try {
    const reunionId = req.params.id;
    const reunion = await reunionService.cancelarReunion(reunionId);
    return res.status(200).send({ reunion });
  } catch (error) {
    return controlError(error, res);
  }
};
