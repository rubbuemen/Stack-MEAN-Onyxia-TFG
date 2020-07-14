const { errorLanzado, controlError } = require('../util/error.util');
const actividadMiembroTramoService = require('../services/actividadMiembroTramo.service');

exports.getHorariosByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const horarios = await actividadMiembroTramoService.getHorariosByEventoId(eventoId);
    return res.status(200).send({ horarios });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.addHorarioParaEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const { actividad, miembro, diaEvento, tramoHorario } = req.body;
    if (!actividad || !miembro || !diaEvento || !tramoHorario) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const horario = await actividadMiembroTramoService.addHorarioParaEventoId(req.body, eventoId);
    return res.status(200).send({ horario });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.deleteHorario = async (req, res) => {
  try {
    const horarioId = req.params.id;
    const horario = await actividadMiembroTramoService.deleteHorario(horarioId);
    return res.status(200).send({ horario });
  } catch (error) {
    return controlError(error, res);
  }
};
