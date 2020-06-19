const errorLanzado = require('../util/error.util');
const actorService = require('../services/actor.service');
const cuentaUsuarioService = require('../services/cuentaUsuario.service');
const colores = require('colors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMisDatos = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    await checkUsuarioBaneado(usuarioLogeado);
    const misDatos = await actorService.getMisDatos(usuarioLogeado);
    return res.status(200).send({ misDatos });
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

exports.editarMisDatos = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const {
      nombre,
      apellidos,
      usuario,
      contraseñaAnterior,
      contraseñaNueva,
      fechaNacimiento,
      correoElectronico,
      fotografia,
      alias,
      numeroTelefono,
      direccion,
      dni,
      aficiones,
      tieneCochePropio,
    } = req.body;
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      if (!nombre || !apellidos || !usuario || !fechaNacimiento || !correoElectronico)
        throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');
    } else {
      if (
        !nombre ||
        !apellidos ||
        !usuario ||
        !fechaNacimiento ||
        !correoElectronico ||
        !fotografia ||
        !alias ||
        !numeroTelefono ||
        !direccion ||
        !dni ||
        !aficiones ||
        !tieneCochePropio
      )
        throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');
    }
    if (contraseñaAnterior) {
      const cuentaUsuario = await cuentaUsuarioService.getUsuarioLogeado(usuarioLogeado.usuario);
      const contraseñaCorrecta = bcrypt.compareSync(contraseñaAnterior, cuentaUsuario.contraseña);
      if (!contraseñaCorrecta) throw errorLanzado(401, 'La contraseña anterior introducida no coincide');
    }
    if (contraseñaAnterior && !contraseñaNueva) throw errorLanzado(400, 'Indique una nueva contraseña');
    if (!contraseñaAnterior && contraseñaNueva) throw errorLanzado(400, 'Indique su anterior contraseña');
    req.body.fechaNacimiento = new Date(fechaNacimiento);
    if (req.body.fechaNacimiento >= new Date()) throw errorLanzado(400, 'La fecha de nacimiento insertada no está en pasado');
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correoElectronico))
      throw errorLanzado(400, 'El correo electrónico insertado no mantiene el formato x@y.z');
    if (numeroTelefono && !/\d{9,10}/.test(numeroTelefono)) throw errorLanzado(400, 'El teléfono insertado debe tener 9 o 10 dígitos');
    if (usuario.length < 5 || usuario.length > 32) throw errorLanzado(400, 'El usuario insertado debe contener entre 5 y 32 caracteres');
    if (contraseñaNueva && (contraseñaNueva.length < 5 || contraseñaNueva.length > 32))
      throw errorLanzado(400, 'La contraseña insertada debe contener entre 5 y 32 caracteres');

    //Dni
    if (dni) {
      let checkDni = true;
      const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
      const nifRexp = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
      const nieRexp = /^[XYZ]\d{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
      checkDni = dni.toString().toUpperCase();
      if (!nifRexp.test(checkDni) && !nieRexp.test(checkDni)) checkDni = false;
      if (checkDni) {
        const nie = checkDni.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');
        const letra = checkDni.substr(-1);
        const charIndex = parseInt(nie.substr(0, 8)) % 23;
        if (validChars.charAt(charIndex) !== letra) checkDni = false;
      }
      if (!checkDni)
        throw errorLanzado(400, 'El DNI insertado no mantiene el formato nacional NNNNNNNNL, el formato extrangero LNNNNNNNL o simplemente no es válido');
    }
    const { actor, cuentaUsuario } = await actorService.editarMisDatos(req.body, usuarioLogeado);
    const jwtToken = jwt.sign({ _id: cuentaUsuario._id, usuario: cuentaUsuario.usuario, autoridad: cuentaUsuario.autoridad }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res.status(200).send({ jwtToken, actor });
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
