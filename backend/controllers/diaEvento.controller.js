const { errorLanzado, controlError } = require('../util/error.util');
const diaEventoService = require('../services/diaEvento.service');

exports.getDiasByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const diasEvento = await diaEventoService.getDiasByEventoId(eventoId);
    return res.status(200).send({ diasEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getDiaEvento = async (req, res) => {
  try {
    const id = req.params.id;
    const diaEvento = await diaEventoService.getDiaEvento(id);
    return res.status(200).send({ diaEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getDiaEventoPorTramoHorarioId = async (req, res) => {
  try {
    const tramoHorarioId = req.params.tramoHorarioId;
    const diaEvento = await diaEventoService.getDiaEventoPorTramoHorarioId(tramoHorarioId);
    return res.status(200).send({ diaEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.addDiaParaEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const dia = await diaEventoService.addDiaParaEventoId(eventoId);
    return res.status(200).send({ dia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.deleteDiaParaEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const dia = await diaEventoService.deleteDiaParaEventoId(eventoId);
    return res.status(200).send({ dia });
  } catch (error) {
    return controlError(error, res);
  }
};
