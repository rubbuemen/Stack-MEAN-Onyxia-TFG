const { errorLanzado, controlError } = require('../util/error.util');
const redSocialService = require('../services/redSocial.service');

exports.crearRedSocial = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, enlace, usuario } = req.body;
    if (!nombre || !enlace || !usuario) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (enlace && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(enlace))
      throw errorLanzado(400, 'El enlace debe tener formato de URL');
    const redSocial = await redSocialService.crearRedSocial(req.body, usuarioLogeado);
    return res.status(200).send({ redSocial });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarRedSocial = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, enlace, usuario } = req.body;
    const redSocialId = req.params.id;
    if (!nombre || !enlace || !usuario) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (enlace && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(enlace))
      throw errorLanzado(400, 'El enlace debe tener formato de URL');
    const redSocial = await redSocialService.editarRedSocial(req.body, usuarioLogeado, redSocialId);
    return res.status(200).send({ redSocial });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarRedSocial = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const redSocialId = req.params.id;
    const redSocial = await redSocialService.eliminarRedSocial(usuarioLogeado, redSocialId);
    return res.status(200).send({ redSocial });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMisRedesSociales = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const redesSociales = await redSocialService.getMisRedesSociales(usuarioLogeado);
    return res.status(200).send({ redesSociales });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getRedesSocialesByActorId = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const redesSociales = await redSocialService.getRedesSocialesByActorId(actorId);
    return res.status(200).send({ redesSociales });
  } catch (error) {
    return controlError(error, res);
  }
};
