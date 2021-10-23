const { errorLanzado, controlError } = require('../util/error.util');
const asistenciaMiembroReunionService = require('../services/asistenciaMiembroReunion.service');

exports.getAsistenciasReunion = async (req, res) => {
  try {
    const reunionId = req.params.reunionId;
    const asistencias = await asistenciaMiembroReunionService.getAsistenciasReunion(reunionId);
    return res.status(200).send({ asistencias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.tieneAsistenciaMarcadaReunion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const reunionId = req.params.reunionId;
    const tieneAsistenciaMarcada = await asistenciaMiembroReunionService.tieneAsistenciaMarcadaReunion(reunionId, usuarioLogeado);
    return res.status(200).send({ tieneAsistenciaMarcada });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.marcarAsistenciaReunion = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const reunionId = req.params.reunionId;
    const { haMarcadoAsistencia } = req.body;
    if (haMarcadoAsistencia === undefined) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const asistencia = await asistenciaMiembroReunionService.marcarAsistenciaReunion(req.body, reunionId, usuarioLogeado);
    return res.status(200).send({ asistencia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.verificarAsistenciaMiembrosReunion = async (req, res) => {
  try {
    const reunionId = req.params.reunionId;
    const { asistencias } = req.body;
    if (!asistencias) throw errorLanzado(400, 'No ha seleccionado ninguna asistencia');
    const asistenciasVerificadas = await asistenciaMiembroReunionService.verificarAsistenciaMiembrosReunion(req.body, reunionId);
    return res.status(200).send({ asistenciasVerificadas });
  } catch (error) {
    return controlError(error, res);
  }
};
