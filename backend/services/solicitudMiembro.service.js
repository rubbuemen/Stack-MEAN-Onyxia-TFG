const { errorLanzado } = require('../util/error.util');
const { SolicitudMiembro } = require('../models/solicitudMiembro.model');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');
const { RedSocial } = require('../models/redSocial.model');

exports.rellenarSolicitudMiembro = async (parametros, usuarioLogeado) => {
  let actorConectado;
  let solicitudMiembro;
  try {
    actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    if (actorConectado.solicitudMiembro) throw errorLanzado(403, 'No se puede enviar otra solicitud para ser miembro porque ya tienes una realizada');
    solicitudMiembro = new SolicitudMiembro(parametros);
    solicitudMiembro = await solicitudMiembro.save();
    actorConectado.solicitudMiembro = solicitudMiembro;
    actorConectado = await actorConectado.save();
    return solicitudMiembro;
  } catch (error) {
    if (solicitudMiembro) {
      const checkSolicitudMiembroInActor = await Visitante.findOne({ solicitudMiembro: { _id: solicitudMiembro._id } });
      if (checkSolicitudMiembroInActor) await Visitante.updateOne({ _id: actorConectado._id }, { solicitudMiembro: null });
      await SolicitudMiembro.findByIdAndDelete(solicitudMiembro._id);
    }
    throw error;
  }
};

exports.getEstadoSolicitudMiembro = async (usuarioLogeado) => {
  const actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
    path: 'solicitudMiembro',
    select: 'estadoSolicitud estaPagado -_id',
  });
  return actorConectado.solicitudMiembro;
};

exports.getSolicitudesMiembros = async () => {
  const solicitudesMiembros = SolicitudMiembro.aggregate([
    {
      $lookup: {
        from: Visitante.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'visitante',
      },
    },
    {
      $unwind: {
        path: '$visitante',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'miembro',
      },
    },
    {
      $unwind: {
        path: '$miembro',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'visitante.redSocials',
        foreignField: '_id',
        as: 'visitante.redSocials',
      },
    },
    {
      $unwind: {
        path: '$visitante.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'miembro.redSocials',
        foreignField: '_id',
        as: 'miembro.redSocials',
      },
    },
    {
      $unwind: {
        path: '$miembro.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: 'miembrosConocidos',
        foreignField: '_id',
        as: 'miembrosConocidos',
      },
    },
  ]);
  return solicitudesMiembros;
};

exports.getSolicitudesMiembrosPendientes = async () => {
  const solicitudesMiembros = SolicitudMiembro.aggregate([
    { $match: { estadoSolicitud: 'PENDIENTE' } },
    {
      $lookup: {
        from: Visitante.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'visitante',
      },
    },
    {
      $unwind: {
        path: '$visitante',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'miembro',
      },
    },
    {
      $unwind: {
        path: '$miembro',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'visitante.redSocials',
        foreignField: '_id',
        as: 'visitante.redSocials',
      },
    },
    {
      $unwind: {
        path: '$visitante.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'miembro.redSocials',
        foreignField: '_id',
        as: 'miembro.redSocials',
      },
    },
    {
      $unwind: {
        path: '$miembro.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: 'miembrosConocidos',
        foreignField: '_id',
        as: 'miembrosConocidos',
      },
    },
  ]);
  return solicitudesMiembros;
};

exports.getSolicitudesMiembrosAceptadas = async () => {
  const solicitudesMiembros = SolicitudMiembro.aggregate([
    { $match: { estadoSolicitud: 'ACEPTADO' } },
    {
      $lookup: {
        from: Visitante.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'visitante',
      },
    },
    {
      $unwind: {
        path: '$visitante',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'miembro',
      },
    },
    {
      $unwind: {
        path: '$miembro',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'visitante.redSocials',
        foreignField: '_id',
        as: 'visitante.redSocials',
      },
    },
    {
      $unwind: {
        path: '$visitante.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'miembro.redSocials',
        foreignField: '_id',
        as: 'miembro.redSocials',
      },
    },
    {
      $unwind: {
        path: '$miembro.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: 'miembrosConocidos',
        foreignField: '_id',
        as: 'miembrosConocidos',
      },
    },
  ]);
  return solicitudesMiembros;
};

exports.getSolicitudesMiembrosRechazadas = async () => {
  const solicitudesMiembros = SolicitudMiembro.aggregate([
    { $match: { estadoSolicitud: 'RECHAZADO' } },
    {
      $lookup: {
        from: Visitante.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'visitante',
      },
    },
    {
      $unwind: {
        path: '$visitante',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'miembro',
      },
    },
    {
      $unwind: {
        path: '$miembro',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'visitante.redSocials',
        foreignField: '_id',
        as: 'visitante.redSocials',
      },
    },
    {
      $unwind: {
        path: '$visitante.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'miembro.redSocials',
        foreignField: '_id',
        as: 'miembro.redSocials',
      },
    },
    {
      $unwind: {
        path: '$miembro.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: 'miembrosConocidos',
        foreignField: '_id',
        as: 'miembrosConocidos',
      },
    },
  ]);
  return solicitudesMiembros;
};

exports.getSolicitudesMiembrosPagadas = async () => {
  const solicitudesMiembros = SolicitudMiembro.aggregate([
    { $match: { estaPagado: true } },
    {
      $lookup: {
        from: Visitante.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'visitante',
      },
    },
    {
      $unwind: {
        path: '$visitante',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'miembro',
      },
    },
    {
      $unwind: {
        path: '$miembro',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'visitante.redSocials',
        foreignField: '_id',
        as: 'visitante.redSocials',
      },
    },
    {
      $unwind: {
        path: '$visitante.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'miembro.redSocials',
        foreignField: '_id',
        as: 'miembro.redSocials',
      },
    },
    {
      $unwind: {
        path: '$miembro.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: 'miembrosConocidos',
        foreignField: '_id',
        as: 'miembrosConocidos',
      },
    },
  ]);
  return solicitudesMiembros;
};

exports.getSolicitudesMiembrosNoPagadas = async () => {
  const solicitudesMiembros = SolicitudMiembro.aggregate([
    { $match: { estaPagado: false } },
    {
      $lookup: {
        from: Visitante.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'visitante',
      },
    },
    {
      $unwind: {
        path: '$visitante',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: '_id',
        foreignField: 'solicitudMiembro',
        as: 'miembro',
      },
    },
    {
      $unwind: {
        path: '$miembro',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'visitante.redSocials',
        foreignField: '_id',
        as: 'visitante.redSocials',
      },
    },
    {
      $unwind: {
        path: '$visitante.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: RedSocial.collection.name,
        localField: 'miembro.redSocials',
        foreignField: '_id',
        as: 'miembro.redSocials',
      },
    },
    {
      $unwind: {
        path: '$miembro.redSocials',
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: Miembro.collection.name,
        localField: 'miembrosConocidos',
        foreignField: '_id',
        as: 'miembrosConocidos',
      },
    },
  ]);
  return solicitudesMiembros;
};

exports.aceptarSolicitudMiembro = async (solicitudMiembroId) => {
  const checkExistencia = await SolicitudMiembro.findById(solicitudMiembroId);
  if (!checkExistencia) throw errorLanzado(404, 'Las solicitud de miembro que intenta aceptar no existe');
  if (checkExistencia.estadoSolicitud === 'ACEPTADO') throw errorLanzado(403, 'La solicitud de miembro que intenta aceptar ya lo está');
  if (checkExistencia.estadoSolicitud === 'RECHAZADO') throw errorLanzado(403, 'La solicitud de miembro que intenta aceptar ha sido ya rechazada');
  solicitudMiembro = await SolicitudMiembro.findOneAndUpdate(
    { _id: solicitudMiembroId },
    {
      estadoSolicitud: 'ACEPTADO',
    },
    { new: true }
  );
  return solicitudMiembro;
};
