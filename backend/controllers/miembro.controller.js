const { errorLanzado, controlError } = require('../util/error.util');
const miembroService = require('../services/miembro.service');

exports.penalizarMiembro = async (req, res) => {
  try {
    const miembroId = req.params.miembroId;
    const miembro = await miembroService.penalizarMiembro(miembroId);
    return res.status(200).send({ miembro });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMiembrosVigentes = async (req, res) => {
  try {
    const miembros = await miembroService.getMiembrosVigentes();
    return res.status(200).send({ miembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMiembrosAceptadosByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const miembros = await miembroService.getMiembrosAceptadosByEventoId(eventoId);
    return res.status(200).send({ miembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMiembrosJuntaSuperior = async (req, res) => {
  try {
    const miembros = await miembroService.getMiembrosJuntaSuperior();
    return res.status(200).send({ miembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMiembrosJuntaVocales = async (req, res) => {
  try {
    const miembros = await miembroService.getMiembrosJuntaVocales();
    return res.status(200).send({ miembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getPresidente = async (req, res) => {
  try {
    const miembro = await miembroService.getPresidente();
    return res.status(200).send({ miembro });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.darBajaMiembro = async (req, res) => {
  try {
    const miembroId = req.params.miembroId;
    const miembro = await miembroService.darBajaMiembro(miembroId);
    return res.status(200).send({ miembro });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.darAltaExMiembro = async (req, res) => {
  try {
    const miembroId = req.params.miembroId;
    const miembro = await miembroService.darAltaExMiembro(miembroId);
    return res.status(200).send({ miembro });
  } catch (error) {
    return controlError(error, res);
  }
};
