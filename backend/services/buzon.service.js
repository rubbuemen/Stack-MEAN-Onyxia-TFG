const { errorLanzado } = require('../util/error.util');
const { Buzon } = require('../models/buzon.model');
const { Miembro } = require('../models/miembro.model');
const { Visitante } = require('../models/visitante.model');
const { asyncForEach } = require('../util/funciones.util');

exports.getBuzones = async usuarioLogeado => {
  const actorConectado =
    (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({ path: 'buzones' })) ||
    (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({ path: 'buzones' }));
  return actorConectado.buzones;
};

exports.getBuzonEntrada = async usuarioLogeado => {
  const actorConectado =
    (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({ path: 'buzones', match: { nombre: 'Buzón de entrada' } })) ||
    (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({ path: 'buzones', match: { nombre: 'Buzón de entrada' } }));
  return actorConectado.buzones[0];
};

exports.crearBuzon = async (parametros, usuarioLogeado) => {
  let actorConectado;
  let buzon;
  try {
    actorConectado =
      (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })) || (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }));
    let checkNombreBuzon;

    if (usuarioLogeado.autoridad === 'VISITANTE') {
      checkNombreBuzon = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: parametros.nombre },
      });
    } else {
      checkNombreBuzon = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: parametros.nombre },
      });
    }
    if (checkNombreBuzon.buzones.length !== 0) throw errorLanzado(403, 'El nombre del buzón indicado ya existe en alguno de tus buzones');

    buzon = new Buzon(parametros);
    buzon = await buzon.save();
    actorConectado.buzones.push(buzon);
    actorConectado = await actorConectado.save();
    return buzon;
  } catch (error) {
    if (buzon) {
      if (usuarioLogeado.autoridad === 'VISITANTE') {
        const checkBuzonInActor = await Visitante.findOne({ buzones: { $in: [buzon._id] } });
        if (checkBuzonInActor) await Visitante.updateOne({ _id: actorConectado._id }, { $pull: { buzones: buzon._id } });
      } else {
        const checkBuzonInActor = await Miembro.findOne({ buzones: { $in: [buzon._id] } });
        if (checkBuzonInActor) await Miembro.updateOne({ _id: actorConectado._id }, { $pull: { buzones: buzon._id } });
      }
      await Buzon.findByIdAndDelete(buzon._id);
    }
    throw error;
  }
};

exports.editarBuzon = async (parametros, usuarioLogeado, buzonId) => {
  const checkExistencia = await Buzon.findById(buzonId);
  if (!checkExistencia) throw errorLanzado(404, 'El buzón que intenta editar no existe');
  const actorConectado =
    (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })) || (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }));
  const propietarioEntidad = (await Visitante.findOne({ buzones: { $in: [buzonId] } })) || (await Miembro.findOne({ buzones: { $in: [buzonId] } }));
  if (actorConectado._id.toString() !== propietarioEntidad._id.toString()) throw errorLanzado(403, 'Acceso prohibido. No eres el autor de este buzón');
  if (checkExistencia.esPorDefecto) throw errorLanzado(403, 'No se puede editar un buzón que es por defecto del sistema');
  const buzon = await Buzon.findOneAndUpdate(
    { _id: buzonId },
    {
      nombre: parametros.nombre,
    },
    { new: true }
  );
  return buzon;
};

exports.eliminarBuzon = async (usuarioLogeado, buzonId) => {
  let actorConectado;
  let propietarioEntidad;
  let buzon;
  try {
    buzon = await Buzon.findById(buzonId);
    if (!buzon) throw errorLanzado(404, 'El buzón que intenta eliminar no existe');
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de entrada' },
      });
    } else {
      actorConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de entrada' },
      });
    }
    propietarioEntidad = (await Visitante.findOne({ buzones: { $in: [buzonId] } })) || (await Miembro.findOne({ buzones: { $in: [buzonId] } }));
    if (actorConectado._id.toString() !== propietarioEntidad._id.toString()) throw errorLanzado(403, 'Acceso prohibido. No eres el autor de este buzón');
    if (buzon.esPorDefecto) throw errorLanzado(403, 'No se puede editar un buzón que es por defecto del sistema');
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      await Visitante.updateOne({ _id: actorConectado._id }, { $pull: { buzones: buzon._id } });
    } else {
      await Miembro.updateOne({ _id: actorConectado._id }, { $pull: { buzones: buzon._id } });
    }
    const buzonEntrada = actorConectado.buzones[0];
    await asyncForEach(buzon.notificaciones, async notificacion => {
      await Buzon.findOneAndUpdate(
        { _id: buzonEntrada._id },
        {
          $push: { notificaciones: notificacion._id },
        },
        { new: true }
      );
    });
    buzon = await Buzon.findOneAndDelete(buzonId);
    return buzon;
  } catch (error) {
    if (buzon) {
      if (usuarioLogeado.autoridad === 'VISITANTE') {
        const checkBuzonInActor = await Visitante.findOne({ buzones: { $in: [buzon._id] } });
        if (!checkBuzonInActor) await Visitante.updateOne({ _id: actorConectado._id }, { $push: { buzones: buzon._id } });
      } else {
        const checkBuzonInActor = await Miembro.findOne({ buzones: { $in: [buzon._id] } });
        if (!checkBuzonInActor) await Miembro.updateOne({ _id: actorConectado._id }, { $push: { buzones: buzon._id } });
      }
    }
    throw error;
  }
};
