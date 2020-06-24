const { errorLanzado, controlError } = require('../util/error.util');
const solicitudMiembroService = require('../services/solicitudMiembro.service');

exports.rellenarSolicitudMiembro = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { tieneCochePropio, comoHaConocidoAsociacion, intereses, habilidades, ideas } = req.body;
    if (!tieneCochePropio || !comoHaConocidoAsociacion || !intereses || !habilidades || !ideas)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const interesesValidos = ['BAILE', 'DIBUJO', 'SOFTCOMBAT', 'TALLERESMANUALIDADES', 'VIDEOJUEGOS', 'COSPLAY'];
    if (!intereses.every((interes) => interesesValidos.includes(interes))) throw errorLanzado(400, 'Los intereses indicados no están definidos');
    const solicitudMiembro = await solicitudMiembroService.rellenarSolicitudMiembro(req.body, usuarioLogeado);
    return res.status(200).send({ solicitudMiembro });
  } catch (error) {
    return controlError(error, res);
  }
};
