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
