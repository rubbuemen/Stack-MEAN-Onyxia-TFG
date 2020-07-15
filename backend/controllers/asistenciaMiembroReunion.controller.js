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

exports.verificarAsistenciaMiembroReunion = async (req, res) => {
  try {
    const miembroId = req.params.miembroId;
    const reunionId = req.params.reunionId;
    const asistencia = await asistenciaMiembroReunionService.verificarAsistenciaMiembroReunion(miembroId, reunionId);
    return res.status(200).send({ asistencia });
  } catch (error) {
    return controlError(error, res);
  }
};
