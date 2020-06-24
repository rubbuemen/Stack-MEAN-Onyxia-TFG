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
