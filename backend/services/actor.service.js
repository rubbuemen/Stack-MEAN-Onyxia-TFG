const { errorLanzado } = require('../util/error.util');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const bcrypt = require('bcryptjs');

exports.getMisDatos = async (usuarioLogeado) => {
  const misDatos =
    (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })
      .populate({ path: 'redSocials' })
      .populate({ path: 'cuentaUsuario' })) ||
    (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })
      .populate({ path: 'redSocials' })
      .populate({ path: 'cuentaUsuario' }));
  return misDatos;
};

exports.editarMisDatos = async (parametros, imagen, usuarioLogeado) => {
  const cuentaUsuarioActual = await CuentaUsuario.findOne({ _id: usuarioLogeado._id });
  try {
    let actor;
    const actorConectado =
      (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })) || (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }));
    const checkUsuario = await CuentaUsuario.findOne({ usuario: parametros.usuario });
    if (checkUsuario && checkUsuario.usuario !== usuarioLogeado.usuario) throw errorLanzado(403, 'El usuario introducido ya existe');
    const checkEmail =
      (await Visitante.findOne({ correoElectronico: parametros.correoElectronico })) ||
      (await Miembro.findOne({ correoElectronico: parametros.correoElectronico }));
    if (checkEmail && checkEmail.correoElectronico !== actorConectado.correoElectronico) throw errorLanzado(403, 'El correo electrónico introducido ya existe');
    if (parametros.numeroTelefono) {
      const checkTelefono =
        (await Visitante.findOne({ numeroTelefono: parametros.numeroTelefono })) || (await Miembro.findOne({ numeroTelefono: parametros.numeroTelefono }));
      if (checkTelefono && checkTelefono.numeroTelefono !== actorConectado.numeroTelefono)
        throw errorLanzado(403, 'El número de teléfono introducido ya existe');
    }
    if (parametros.alias && usuarioLogeado.autoridad !== 'VISITANTE') {
      const checkAlias = await Miembro.findOne({ alias: parametros.alias });
      if (checkAlias && checkAlias.alias !== actorConectado.alias) throw errorLanzado(403, 'El alias introducido ya existe');
    }
    if (parametros.dni) {
      const checkDni = await Miembro.findOne({ dni: parametros.dni });
      if (checkDni && checkDni.dni !== actorConectado.dni) throw errorLanzado(403, 'El DNI introducido ya existe');
    }
    actor =
      (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })) || (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }));

    const cuentaUsuario = await CuentaUsuario.findOneAndUpdate(
      { _id: usuarioLogeado._id },
      {
        usuario: parametros.usuario,
        contraseña: parametros.contraseñaNueva ? bcrypt.hashSync(parametros.contraseñaNueva, 8) : cuentaUsuarioActual.contraseña,
      },
      { new: true }
    );
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      actor = await Visitante.findOneAndUpdate(
        { _id: actor._id },
        {
          nombre: parametros.nombre,
          apellidos: parametros.apellidos,
          fechaNacimiento: parametros.fechaNacimiento,
          correoElectronico: parametros.correoElectronico,
          alias: parametros.alias,
          numeroTelefono: parametros.numeroTelefono,
          cuentaUsuario: cuentaUsuario,
        },
        { new: true }
      );
    } else {
      actor = await Miembro.findOneAndUpdate(
        { _id: actor._id },
        {
          nombre: parametros.nombre,
          apellidos: parametros.apellidos,
          fechaNacimiento: parametros.fechaNacimiento,
          correoElectronico: parametros.correoElectronico,
          fotografia: {
            data: imagen.data,
            mimetype: imagen.mimetype,
            size: imagen.size,
          },
          alias: parametros.alias,
          numeroTelefono: parametros.numeroTelefono,
          direccion: parametros.direccion,
          dni: parametros.dni,
          aficiones: parametros.aficiones,
          tieneCochePropio: parametros.tieneCochePropio,
          cuentaUsuario: cuentaUsuario,
        },
        { new: true }
      );
    }
    return { actor, cuentaUsuario };
  } catch (error) {
    await CuentaUsuario.findOneAndUpdate(
      { _id: usuarioLogeado._id },
      {
        usuario: usuarioLogeado.usuario,
        contraseña: cuentaUsuarioActual.contraseña,
      },
      { new: true }
    );
    throw error;
  }
};

exports.getVisitantes = async () => {
  const visitantes = await Visitante.find().populate({ path: 'cuentaUsuario' });
  return visitantes;
};

exports.getMiembros = async () => {
  const miembros = await Miembro.find().populate({ path: 'cuentaUsuario' });
  return miembros;
};

exports.getDatosByActorId = async (actorId) => {
  const datosActor =
    (await Visitante.findOne({ _id: actorId }).populate({ path: 'redSocials' }).populate({ path: 'cuentaUsuario' })) ||
    (await Miembro.findOne({ _id: actorId }).populate({ path: 'redSocials' }).populate({ path: 'cuentaUsuario' }));
  if (!datosActor) throw errorLanzado(404, 'La ID del actor indicado no existe');
  return datosActor;
};

exports.getUltimoNumeroSocio = async () => {
  let ultimoNumeroSocio;
  const miembro = await Miembro.findOne().sort({ numeroSocio: -1 }).limit(1);
  if (!miembro) ultimoNumeroSocio = 0;
  else ultimoNumeroSocio = miembro.numeroSocio;
  return ultimoNumeroSocio;
};

exports.editarDatosActorId = async (parametros, imagen, actorId) => {
  let actor =
    (await Visitante.findOne({ _id: actorId }).populate({ path: 'cuentaUsuario' })) ||
    (await Miembro.findOne({ _id: actorId }).populate({ path: 'cuentaUsuario' }));
  const cuentaUsuarioActual = actor.cuentaUsuario;
  try {
    const checkUsuario = await CuentaUsuario.findOne({ usuario: parametros.usuario });
    if (checkUsuario && checkUsuario.usuario !== cuentaUsuarioActual.usuario) throw errorLanzado(403, 'El usuario introducido ya existe');
    const checkEmail =
      (await Visitante.findOne({ correoElectronico: parametros.correoElectronico })) ||
      (await Miembro.findOne({ correoElectronico: parametros.correoElectronico }));
    if (checkEmail && checkEmail.correoElectronico !== actor.correoElectronico) throw errorLanzado(403, 'El correo electrónico introducido ya existe');
    if (parametros.numeroTelefono) {
      const checkTelefono =
        (await Visitante.findOne({ numeroTelefono: parametros.numeroTelefono })) || (await Miembro.findOne({ numeroTelefono: parametros.numeroTelefono }));
      if (checkTelefono && checkTelefono.numeroTelefono !== actor.numeroTelefono) throw errorLanzado(403, 'El número de teléfono introducido ya existe');
    }
    if (parametros.alias && cuentaUsuarioActual.autoridad !== 'VISITANTE') {
      const checkAlias = await Miembro.findOne({ alias: parametros.alias });
      if (checkAlias && checkAlias.alias !== actor.alias) throw errorLanzado(403, 'El alias introducido ya existe');
    }
    if (parametros.dni) {
      const checkDni = await Miembro.findOne({ dni: parametros.dni });
      if (checkDni && checkDni.dni !== actor.dni) throw errorLanzado(403, 'El DNI introducido ya existe');
    }
    if (parametros.numeroSocio) {
      const checkNumeroSocio = await Miembro.findOne({ numeroSocio: parametros.numeroSocio });
      if (checkNumeroSocio && checkNumeroSocio.numeroSocio !== actor.numeroSocio) throw errorLanzado(403, 'El número de socio instroducido ya existe');
    }
    let autoridad;
    if (cuentaUsuarioActual.autoridad === 'VISITANTE') {
      autoridad = 'VISITANTE';
    } else {
      if (parametros.rol === 'ESTANDAR') {
        autoridad = 'MIEMBRO';
      } else {
        autoridad = parametros.rol;
      }
    }
    let estado;
    if (parametros.estaDeAlta) {
      estado = parametros.estaDeAlta == 'true' ? true : false;
    }
    let fechaUltimaPenalizacion;
    if (parametros.cantidadPenalizaciones) {
      if (parametros.cantidadPenalizaciones > actor.cantidadPenalizaciones) {
        fechaUltimaPenalizacion = new Date();
      } else {
        fechaUltimaPenalizacion = actor.fechaUltimaPenalizacion;
      }
    }

    const cuentaUsuario = await CuentaUsuario.findOneAndUpdate(
      { _id: cuentaUsuarioActual._id },
      {
        usuario: parametros.usuario,
        contraseña: parametros.contraseñaNueva ? bcrypt.hashSync(parametros.contraseñaNueva, 8) : cuentaUsuarioActual.contraseña,
        autoridad: autoridad,
        estado: estado !== undefined ? estado : cuentaUsuarioActual.estado,
      },
      { new: true }
    );
    if (cuentaUsuarioActual.autoridad === 'VISITANTE') {
      actor = await Visitante.findOneAndUpdate(
        { _id: actor._id },
        {
          nombre: parametros.nombre,
          apellidos: parametros.apellidos,
          fechaNacimiento: parametros.fechaNacimiento,
          correoElectronico: parametros.correoElectronico,
          alias: parametros.alias,
          numeroTelefono: parametros.numeroTelefono,
          cuentaUsuario: cuentaUsuario,
        },
        { new: true }
      );
    } else {
      actor = await Miembro.findOneAndUpdate(
        { _id: actor._id },
        {
          nombre: parametros.nombre,
          apellidos: parametros.apellidos,
          fechaNacimiento: parametros.fechaNacimiento,
          correoElectronico: parametros.correoElectronico,
          numeroSocio: parametros.numeroSocio,
          fotografia: {
            data: imagen.data,
            mimetype: imagen.mimetype,
            size: imagen.size,
          },
          alias: parametros.alias,
          numeroTelefono: parametros.numeroTelefono,
          direccion: parametros.direccion,
          dni: parametros.dni,
          aficiones: parametros.aficiones,
          tieneCochePropio: parametros.tieneCochePropio,
          rol: parametros.rol,
          estaDeAlta: parametros.estaDeAlta,
          cantidadPenalizaciones: parametros.cantidadPenalizaciones,
          fechaUltimaPenalizacion: fechaUltimaPenalizacion,
          cuentaUsuario: cuentaUsuario,
        },
        { new: true }
      );
    }
    return actor;
  } catch (error) {
    await CuentaUsuario.findOneAndUpdate(
      { _id: cuentaUsuarioActual._id },
      {
        usuario: cuentaUsuarioActual.usuario,
        contraseña: cuentaUsuarioActual.contraseña,
        autoridad: cuentaUsuarioActual.autoridad,
        estado: cuentaUsuarioActual.estado,
      },
      { new: true }
    );
    throw error;
  }
};
