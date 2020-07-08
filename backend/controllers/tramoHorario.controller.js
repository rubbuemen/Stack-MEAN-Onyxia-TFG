const { errorLanzado, controlError } = require('../util/error.util');
const tramoHorarioService = require('../services/tramoHorario.service');

exports.getTramosHorariosByDiaId = async (req, res) => {
  try {
    const diaEventoId = req.params.diaEventoId;
    const tramosHorarios = await tramoHorarioService.getTramosHorariosByDiaId(diaEventoId);
    return res.status(200).send({ tramosHorarios });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.addTramoHorarioParaDiaId = async (req, res) => {
  try {
    const diaEventoId = req.params.diaEventoId;
    // Si ya tiene un tramo horario de antes, la horaInicio debería corresponder a la horaFin del anterior
    const { horaInicio, horaFin } = req.body;
    if (!horaInicio || !horaFin) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) throw errorLanzado(400, 'La hora de inicio del tramo horario no mantiene el formato hh:mm');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaFin)) throw errorLanzado(400, 'La hora de fin del tramo horario no mantiene el formato hh:mm');
    if (horaInicio >= horaFin) throw errorLanzado(400, 'La hora de inicio debe ser anterior a la hora de fin del tramo horario');
    const tramoHorario = await tramoHorarioService.addTramoHorarioParaDiaId(req.body, diaEventoId);
    return res.status(200).send({ tramoHorario });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarTramoHorario = async (req, res) => {
  try {
    const tramoHorarioId = req.params.id;
    const { horaInicio, horaFin } = req.body;
    if (!horaInicio || !horaFin) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) throw errorLanzado(400, 'La hora de inicio del tramo horario no mantiene el formato hh:mm');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaFin)) throw errorLanzado(400, 'La hora de fin del tramo horario no mantiene el formato hh:mm');
    if (horaInicio >= horaFin) throw errorLanzado(400, 'La hora de inicio debe ser anterior a la hora de fin del tramo horario');
    const tramoHorario = await tramoHorarioService.editarTramoHorario(req.body, tramoHorarioId);
    return res.status(200).send({ tramoHorario });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.deleteTramoHorario = async (req, res) => {
  try {
    const tramoHorarioId = req.params.id;
    const tramoHorario = await tramoHorarioService.deleteTramoHorario(tramoHorarioId);
    return res.status(200).send({ tramoHorario });
  } catch (error) {
    return controlError(error, res);
  }
};
