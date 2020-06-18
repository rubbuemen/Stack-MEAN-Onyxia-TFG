const errorLanzado = require('../util/error.util');
const { RedSocial } = require('../models/redSocial.model');
const { Visitante } = require('../models/visitante.model');

exports.crearRedSocial = async (parametros, usuarioLogeado) => {
  let actorConectado;
  let redSocial;
  try {
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    } else {
      actorConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    }
    redSocial = new RedSocial(parametros);
    redSocial = await redSocial.save();
    actorConectado.redSocials.push(redSocial);
    actorConectado = await actorConectado.save();
    return redSocial;
  } catch (error) {
    if (redSocial) {
      if (usuarioLogeado.autoridad === 'VISITANTE') {
        const checkRedSocialInActor = await Visitante.findOne({ redSocials: { $in: [redSocial._id] } });
        if (checkRedSocialInActor) await Visitante.updateOne({ _id: actorConectado._id }, { $pull: { redSocials: redSocial._id } });
      } else {
        const checkRedSocialInActor = await Miembro.findOne({ redSocials: { $in: [redSocial._id] } });
        if (checkRedSocialInActor) await Miembro.updateOne({ _id: actorConectado._id }, { $pull: { redSocials: redSocial._id } });
      }
      await RedSocial.findByIdAndDelete(redSocial._id);
    }
    throw error;
  }
};

exports.editarRedSocial = async (parametros, usuarioLogeado, idRedSocial) => {
  let actorConectado;
  let propietarioEntidad;
  const checkExistencia = await RedSocial.findById(idRedSocial);
  if (!checkExistencia) throw errorLanzado(404, 'La red social que intenta editar no existe');
  if (usuarioLogeado.autoridad === 'VISITANTE') {
    actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    propietarioEntidad = await Visitante.findOne({ redSocials: { $in: [idRedSocial] } });
  } else {
    actorConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    propietarioEntidad = await Miembro.findOne({ redSocials: { $in: [parametros._id] } });
  }
  if (actorConectado._id.toString() !== propietarioEntidad._id.toString()) throw errorLanzado(403, 'Acceso prohibido. No eres el autor de esta red social');
  const redSocial = await RedSocial.findOneAndUpdate(
    { _id: idRedSocial },
    {
      nombre: parametros.nombre,
      enlace: parametros.enlace,
      usuario: parametros.usuario,
    },
    { new: true }
  );
  return redSocial;
};

exports.eliminarRedSocial = async (usuarioLogeado, idRedSocial) => {
  let actorConectado;
  let propietarioEntidad;
  let redSocial;
  try {
    redSocial = await RedSocial.findById(idRedSocial);
    if (!redSocial) throw errorLanzado(404, 'La red social que intenta eliminar no existe');
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
      propietarioEntidad = await Visitante.findOne({ redSocials: { $in: [idRedSocial] } });
    } else {
      actorConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
      propietarioEntidad = await Miembro.findOne({ redSocials: { $in: [parametros._id] } });
    }
    if (actorConectado._id.toString() !== propietarioEntidad._id.toString()) throw errorLanzado(403, 'Acceso prohibido. No eres el autor de esta red social');
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      await Visitante.updateOne({ _id: actorConectado._id }, { $pull: { redSocials: redSocial._id } });
    } else {
      await Miembro.updateOne({ _id: actorConectado._id }, { $pull: { redSocials: redSocial._id } });
    }
    redSocial = await RedSocial.findOneAndDelete(idRedSocial);
    return redSocial;
  } catch (error) {
    if (redSocial) {
      if (usuarioLogeado.autoridad === 'VISITANTE') {
        const checkRedSocialInActor = await Visitante.findOne({ redSocials: { $in: [redSocial._id] } });
        if (!checkRedSocialInActor) await Visitante.updateOne({ _id: actorConectado._id }, { $push: { redSocials: redSocial._id } });
      } else {
        const checkRedSocialInActor = await Miembro.findOne({ redSocials: { $in: [redSocial._id] } });
        if (!checkRedSocialInActor) await Miembro.updateOne({ _id: actorConectado._id }, { $push: { redSocials: redSocial._id } });
      }
    }
    throw error;
  }
};
