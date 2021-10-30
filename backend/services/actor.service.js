const { errorLanzado } = require('../util/error.util');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const { Notificacion } = require('../models/notificacion.model');
const { asyncForEach } = require('../util/funciones.util');
const bcrypt = require('bcryptjs');

exports.getMisDatos = async usuarioLogeado => {
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
        },
        { new: true }
      );
    } else {
      if (!imagen) {
        imagen = actorConectado.fotografia; // Para el caso que se ha editado pero no se ha cambiado la imagen
      }
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

exports.getDatosByActorId = async actorId => {
  const datosActor =
    (await Visitante.findOne({ _id: actorId }).populate({ path: 'redSocials' }).populate({ path: 'cuentaUsuario' }).populate({ path: 'solicitudMiembro' })) ||
    (await Miembro.findOne({ _id: actorId }).populate({ path: 'redSocials' }).populate({ path: 'cuentaUsuario' }));
  if (!datosActor) throw errorLanzado(404, 'La ID del actor indicado no existe');
  return datosActor;
};

exports.getUltimoNumeroSocio = async () => {
  let ultimoNumeroSocio;
  const miembro = await Miembro.findOne().sort({ numeroSocio: -1 }).limit(1);
  if (!miembro.numeroSocio) ultimoNumeroSocio = 0;
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

    await CuentaUsuario.findOneAndUpdate(
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
        },
        { new: true }
      );
    } else {
      if (!imagen) {
        imagen = actor.fotografia; // Para el caso que se ha editado pero no se ha cambiado la imagen
      }
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

exports.hacerMiembroActorId = async (parametros, imagen, actorId) => {
  let actor = await Visitante.findOne({ _id: actorId })
    .populate({ path: 'cuentaUsuario' })
    .populate({ path: 'solicitudMiembro' })
    .populate({ path: 'buzones' });
  const cuentaUsuarioActual = actor.cuentaUsuario;
  try {
    const checkSolicitudPagada = actor.solicitudMiembro;
    if (!checkSolicitudPagada || !checkSolicitudPagada.estaPagado)
      throw errorLanzado(403, 'No se puede hacer miembro a un visitante que no tiene su cuota en la solicitud para ser miembro pagada');
    const checkEmail =
      (await Visitante.findOne({ correoElectronico: parametros.correoElectronico })) ||
      (await Miembro.findOne({ correoElectronico: parametros.correoElectronico }));
    if (checkEmail && checkEmail.correoElectronico !== actor.correoElectronico) throw errorLanzado(403, 'El correo electrónico introducido ya existe');
    const checkTelefono =
      (await Visitante.findOne({ numeroTelefono: parametros.numeroTelefono })) || (await Miembro.findOne({ numeroTelefono: parametros.numeroTelefono }));
    if (checkTelefono && checkTelefono.numeroTelefono !== actor.numeroTelefono) throw errorLanzado(403, 'El número de teléfono introducido ya existe');
    const checkAlias = await Miembro.findOne({ alias: parametros.alias });
    if (checkAlias && checkAlias.alias !== actor.alias) throw errorLanzado(403, 'El alias introducido ya existe');
    const checkDni = await Miembro.findOne({ dni: parametros.dni });
    if (checkDni) throw errorLanzado(403, 'El DNI introducido ya existe');

    await Visitante.findByIdAndDelete(actor._id);
    await CuentaUsuario.findOneAndUpdate(
      { _id: cuentaUsuarioActual._id },
      {
        autoridad: 'MIEMBRO',
      },
      { new: true }
    );
    let miembro = new Miembro(parametros);
    miembro.fotografia = {
      data: imagen.data,
      mimetype: imagen.mimetype,
      size: imagen.size,
    };
    let notificaciones = await Notificacion.find({ receptoresVisitantes: { $in: [actor._id] } });
    await asyncForEach(notificaciones, async notificacion => {
      await Notificacion.findOneAndUpdate(
        { _id: notificacion._id },
        {
          $pull: { receptoresVisitantes: actor._id },
          $push: { receptoresMiembros: actor._id },
        },
        { new: true }
      );
    });
    notificaciones = await Notificacion.find({ emisorVisitante: actor._id });
    await asyncForEach(notificaciones, async notificacion => {
      await Notificacion.findOneAndUpdate(
        { _id: notificacion._id },
        {
          $unset: { emisorVisitante: 1 },
          emisorMiembro: actor._id,
        },
        { new: true }
      );
    });
    miembro._id = actor._id;
    miembro.redSocials = actor.redSocials;
    miembro.buzones = actor.buzones;
    miembro.cuentaUsuario = actor.cuentaUsuario;
    miembro.solicitudMiembro = actor.solicitudMiembro;
    miembro = await miembro.save();
    return miembro;
  } catch (error) {
    const checkExistenciaActor = await Visitante.findOne({ _id: actorId });
    if (!checkExistenciaActor) {
      const visitante = new Visitante(actor);
      await visitante.save();
      await CuentaUsuario.findOneAndUpdate(
        { _id: cuentaUsuarioActual._id },
        {
          autoridad: 'VISITANTE',
        },
        { new: true }
      );
    }
    throw error;
  }
};
