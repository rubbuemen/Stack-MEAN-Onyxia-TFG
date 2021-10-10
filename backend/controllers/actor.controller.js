const { errorLanzado, controlError } = require('../util/error.util');
const { convertirImagenABase64 } = require('../util/funciones.util');
const actorService = require('../services/actor.service');
const cuentaUsuarioService = require('../services/cuentaUsuario.service');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getMisDatos = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const misDatos = await actorService.getMisDatos(usuarioLogeado);
    return res.status(200).send({ misDatos });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarMisDatos = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const {
      nombre,
      apellidos,
      usuario,
      contraseñaActual,
      contraseñaNueva,
      fechaNacimiento,
      correoElectronico,
      alias,
      numeroTelefono,
      direccion,
      dni,
      aficiones,
      tieneCochePropio,
    } = req.body;
    const fotografia = req.file;
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
        !alias ||
        !numeroTelefono ||
        !direccion ||
        !dni ||
        !aficiones ||
        tieneCochePropio === undefined
      )
        throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');
    }
    if (contraseñaActual) {
      const cuentaUsuario = await cuentaUsuarioService.getUsuarioLogeado(usuarioLogeado.usuario);
      const contraseñaCorrecta = bcrypt.compareSync(contraseñaActual, cuentaUsuario.contraseña);
      if (!contraseñaCorrecta) throw errorLanzado(401, 'La contraseña actual introducida no coincide');
    }
    if (contraseñaActual && !contraseñaNueva) throw errorLanzado(400, 'Indique una nueva contraseña');
    if (!contraseñaActual && contraseñaNueva) throw errorLanzado(400, 'Indique su actual contraseña');
    req.body.fechaNacimiento = new Date(fechaNacimiento);
    if (req.body.fechaNacimiento >= new Date()) throw errorLanzado(400, 'La fecha de nacimiento insertada no está en pasado');
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correoElectronico))
      throw errorLanzado(400, 'El correo electrónico insertado no mantiene el formato x@y.z');
    if (numeroTelefono && !/\d{9,10}/.test(numeroTelefono)) throw errorLanzado(400, 'El teléfono insertado debe tener 9 o 10 dígitos');
    if (usuario.length < 5 || usuario.length > 32) throw errorLanzado(400, 'El usuario insertado debe contener entre 5 y 32 caracteres');
    if (contraseñaNueva && (contraseñaNueva.length < 5 || contraseñaNueva.length > 32))
      throw errorLanzado(400, 'La contraseña insertada debe contener entre 5 y 32 caracteres');
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
    if (fotografia) {
      req.file.data = convertirImagenABase64(fotografia);
    } else {
      req.file = undefined; // Para el caso que se ha editado pero no se ha cambiado la imagen
    }

    const { actor, cuentaUsuario } = await actorService.editarMisDatos(req.body, req.file, usuarioLogeado);
    const jwtToken = jwt.sign({ _id: cuentaUsuario._id, usuario: cuentaUsuario.usuario, autoridad: cuentaUsuario.autoridad }, process.env.SECRET_KEY, {
      expiresIn: '1d',
    });
    return res.status(200).send({ jwtToken, actor });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getVisitantes = async (req, res) => {
  try {
    const visitantes = await actorService.getVisitantes();
    return res.status(200).send({ visitantes });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMiembros = async (req, res) => {
  try {
    const miembros = await actorService.getMiembros();
    return res.status(200).send({ miembros });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getDatosByActorId = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const datosActor = await actorService.getDatosByActorId(actorId);
    return res.status(200).send({ datosActor });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarDatosActorId = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const {
      nombre,
      apellidos,
      usuario,
      contraseñaNueva,
      fechaNacimiento,
      correoElectronico,
      numeroSocio,
      alias,
      numeroTelefono,
      direccion,
      dni,
      aficiones,
      tieneCochePropio,
      rol,
      estaDeAlta,
      cantidadPenalizaciones,
    } = req.body;
    const fotografia = req.file;
    let actor = await actorService.getDatosByActorId(actorId);
    if (actor.cuentaUsuario.autoridad === 'VISITANTE') {
      if (!nombre || !apellidos || !usuario || !fechaNacimiento || !correoElectronico)
        throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');
    } else {
      if (
        !nombre ||
        !apellidos ||
        !usuario ||
        !fechaNacimiento ||
        !correoElectronico ||
        !numeroSocio ||
        !alias ||
        !numeroTelefono ||
        !direccion ||
        !dni ||
        !aficiones ||
        tieneCochePropio === undefined ||
        !rol ||
        estaDeAlta === undefined ||
        !cantidadPenalizaciones
      )
        throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');
    }
    req.body.fechaNacimiento = new Date(fechaNacimiento);
    if (req.body.fechaNacimiento >= new Date()) throw errorLanzado(400, 'La fecha de nacimiento insertada no está en pasado');
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correoElectronico))
      throw errorLanzado(400, 'El correo electrónico insertado no mantiene el formato x@y.z');
    if (numeroSocio && numeroSocio <= 0) throw errorLanzado(400, 'El número de socio no puede ser menor a 1');
    const ultimoNumeroSocio = await actorService.getUltimoNumeroSocio();
    if (numeroSocio && numeroSocio < ultimoNumeroSocio)
      throw errorLanzado(400, 'El número de socio no puede ser menor que el número del último socio: ' + ultimoNumeroSocio);
    if (numeroTelefono && !/\d{9,10}/.test(numeroTelefono)) throw errorLanzado(400, 'El teléfono insertado debe tener 9 o 10 dígitos');
    if (usuario.length < 5 || usuario.length > 32) throw errorLanzado(400, 'El usuario insertado debe contener entre 5 y 32 caracteres');
    if (contraseñaNueva && (contraseñaNueva.length < 5 || contraseñaNueva.length > 32))
      throw errorLanzado(400, 'La contraseña insertada debe contener entre 5 y 32 caracteres');
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
    roles = ['ESTANDAR', 'VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE'];
    if (rol && !roles.includes(rol)) throw errorLanzado(400, 'El rol del miembro no está definido');
    if (cantidadPenalizaciones && cantidadPenalizaciones < 0) throw errorLanzado(400, 'La cantidad de penalizaciones no puede ser menor a 0');
    if (fotografia) {
      req.file.data = convertirImagenABase64(fotografia);
    } else {
      req.file = undefined; // Para el caso que se ha editado pero no se ha cambiado la imagen
    }
    actor = await actorService.editarDatosActorId(req.body, req.file, actorId);
    return res.status(200).send({ actor });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.hacerMiembroActorId = async (req, res) => {
  try {
    const actorId = req.params.actorId;
    const { nombre, apellidos, fechaNacimiento, correoElectronico, alias, numeroTelefono, direccion, dni, aficiones, tieneCochePropio } = req.body;
    const fotografia = req.file;
    let actor = await actorService.getDatosByActorId(actorId);
    if (
      !nombre ||
      !apellidos ||
      !fechaNacimiento ||
      !correoElectronico ||
      !fotografia ||
      !alias ||
      !numeroTelefono ||
      !direccion ||
      !dni ||
      !aficiones ||
      tieneCochePropio === undefined
    )
      throw errorLanzado(400, 'Hay campos obligatorios del formulario que no se han enviado');

    req.body.fechaNacimiento = new Date(fechaNacimiento);
    const ultimoNumeroSocio = await actorService.getUltimoNumeroSocio();
    req.body.numeroSocio = ultimoNumeroSocio + 1;
    req.body.rol = 'ESTANDAR';
    req.body.estaDeAlta = true;
    req.body.fechaAlta = new Date();
    req.body.cantidadPenalizaciones = 0;
    req.file.data = convertirImagenABase64(fotografia);

    if (req.body.fechaNacimiento >= new Date()) throw errorLanzado(400, 'La fecha de nacimiento insertada no está en pasado');
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correoElectronico))
      throw errorLanzado(400, 'El correo electrónico insertado no mantiene el formato x@y.z');
    if (numeroTelefono && !/\d{9,10}/.test(numeroTelefono)) throw errorLanzado(400, 'El teléfono insertado debe tener 9 o 10 dígitos');
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
    actor = await actorService.hacerMiembroActorId(req.body, req.file, actorId);
    return res.status(200).send({ actor });
  } catch (error) {
    return controlError(error, res);
  }
};
