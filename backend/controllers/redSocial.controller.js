const errorLanzado = require('../util/error.util');
const redSocialService = require('../services/redSocial.service');
const colores = require('colors');

exports.crearRedSocial = async (req, res) => {
  try {
    usuarioLogeado = req.cuentaUsuario;
    const { nombre, enlace, usuario } = req.body;
    if (!nombre || !enlace || !usuario) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (enlace && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(enlace))
      throw errorLanzado(400, 'El enlace debe tener formato de URL');
    const redSocial = await redSocialService.crearRedSocial(req.body, usuarioLogeado);
    return res.status(200).send({ redSocial });
  } catch (error) {
    if (error.status && error.message) {
      console.error(colores.red('[Error ' + error.status + ']'));
      console.error(colores.red(error.stack));
      return res.status(error.status).send({ error: error.message });
    } else {
      console.error(colores.red(error));
      return res.status(500).send({ error });
    }
  }
};

exports.editarRedSocial = async (req, res) => {
  try {
    usuarioLogeado = req.cuentaUsuario;
    const { nombre, enlace, usuario } = req.body;
    const idRedSocial = req.params.id;
    if (!nombre || !enlace || !usuario) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (enlace && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(enlace))
      throw errorLanzado(400, 'El enlace debe tener formato de URL');
    const redSocial = await redSocialService.editarRedSocial(req.body, usuarioLogeado, idRedSocial);
    return res.status(200).send({ redSocial });
  } catch (error) {
    if (error.status && error.message) {
      console.error(colores.red('[Error ' + error.status + ']'));
      console.error(colores.red(error.stack));
      return res.status(error.status).send({ error: error.message });
    } else {
      console.error(colores.red(error));
      return res.status(500).send({ error });
    }
  }
};

exports.eliminarRedSocial = async (req, res) => {
  try {
    usuarioLogeado = req.cuentaUsuario;
    const idRedSocial = req.params.id;
    const redSocial = await redSocialService.eliminarRedSocial(usuarioLogeado, idRedSocial);
    return res.status(200).send({ redSocial });
  } catch (error) {
    if (error.status && error.message) {
      console.error(colores.red('[Error ' + error.status + ']'));
      console.error(colores.red(error.stack));
      return res.status(error.status).send({ error: error.message });
    } else {
      console.error(colores.red(error));
      return res.status(500).send({ error });
    }
  }
};
