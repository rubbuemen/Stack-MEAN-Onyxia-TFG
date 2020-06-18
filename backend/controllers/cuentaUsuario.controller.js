const errorLanzado = require('../util/error.util');
const cuentaUsuarioService = require('../services/cuentaUsuario.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const colores = require('colors');

exports.login = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;
    if (!usuario || !contraseña) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const cuentaUsuario = await cuentaUsuarioService.getUsuarioLogeado(usuario);
    const contraseñaCorrecta = bcrypt.compareSync(contraseña, cuentaUsuario.contraseña);
    if (!contraseñaCorrecta) throw errorLanzado(401, 'La contraseña introducida es incorrecta');
    const jwtToken = jwt.sign({ _id: cuentaUsuario._id, usuario: cuentaUsuario.usuario, autoridad: cuentaUsuario.autoridad }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res.status(200).send({ jwtToken });
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

exports.registrarse = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      usuario,
      contraseña,
      fechaNacimiento,
      correoElectronico,
      numeroTelefono,
      nombreRedSocial,
      enlaceRedSocial,
      usuarioRedSocial,
    } = req.body;
    if (!nombre || !apellidos || !usuario || !contraseña || !fechaNacimiento || !correoElectronico)
      throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');
    if (
      (nombreRedSocial && (!enlaceRedSocial || !usuarioRedSocial)) ||
      (enlaceRedSocial && (!nombreRedSocial || !usuarioRedSocial)) ||
      (usuarioRedSocial && (!nombreRedSocial || !enlaceRedSocial))
    )
      throw errorLanzado(400, 'Debe rellenar todos los campos de la red social si desea añadir una');
    req.body.fechaNacimiento = new Date(fechaNacimiento);
    if (req.body.fechaNacimiento >= new Date()) throw errorLanzado(400, 'La fecha de nacimiento insertada no está en pasado');
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correoElectronico))
      throw errorLanzado(400, 'El correo electrónico insertado no mantiene el formato x@y.z');
    if (numeroTelefono && !/\d{9,10}/.test(numeroTelefono)) throw errorLanzado(400, 'El teléfono insertado debe tener 9 o 10 dígitos');
    if (usuario.length < 5 || usuario.length > 32) throw errorLanzado(400, 'El usuario insertado debe contener entre 5 y 32 caracteres');
    if (contraseña.length < 5 || contraseña.length > 32) throw errorLanzado(400, 'La contraseña insertada debe contener entre 5 y 32 caracteres');
    if (enlaceRedSocial && !/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(enlaceRedSocial))
      throw errorLanzado(400, 'El enlace debe tener formato de URL');
    const visitante = await cuentaUsuarioService.registrarse(req.body);
    return res.status(200).send({ visitante });
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
