const { errorLanzado } = require('../util/error.util');
const { SolicitudMiembro } = require('../models/solicitudMiembro.model');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');
const { RedSocial } = require('../models/redSocial.model');
const cron = require('cron');
const { enviarNotificacionAutomatica } = require('./notificacion.service');

STRIPE_KEY = 'sk_test_51Jht9TEgnefEKnSHvDoHoJPqotLmW3FvAO5FedoH2PTfGOt4VLxD0ccGSu6Ylx9lRWKhzNO1GS3h2QIyxdU9oCRj00bMyozEqa';

const stripe = require('stripe')(STRIPE_KEY);

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

exports.getMiSolicitudMiembro = async usuarioLogeado => {
  const actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
    path: 'solicitudMiembro',
    populate: {
      path: 'miembrosConocidos',
    },
  });
  return actorConectado.solicitudMiembro;
};

exports.getSolicitudMiembroById = async id => {
  const solicitud = await SolicitudMiembro.findById(id).populate({ path: 'miembrosConocidos' });
  if (!solicitud) throw errorLanzado(404, 'No existe ninguna solicitud de miembro con la id indicada');
  return solicitud;
};

exports.getSolicitudMiembroByActorId = async actorId => {
  const actor = await Visitante.findById(actorId).populate({
    path: 'solicitudMiembro',
    populate: {
      path: 'miembrosConocidos',
    },
  });
  return actor.solicitudMiembro;
};

exports.getSolicitudesMiembros = async () => {
  const solicitudesMiembros = await SolicitudMiembro.aggregate([
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
  const solicitudesMiembros = await SolicitudMiembro.aggregate([
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
  const solicitudesMiembros = await SolicitudMiembro.aggregate([
    { $match: { estadoSolicitud: 'ACEPTADO', estaPagado: false } },
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
  const solicitudesMiembros = await SolicitudMiembro.aggregate([
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
  const solicitudesMiembros = await SolicitudMiembro.aggregate([
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
  const solicitudesMiembros = await SolicitudMiembro.aggregate([
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

exports.aceptarSolicitudMiembro = async (solicitudMiembroId, usuarioLogeado) => {
  const checkExistencia = await SolicitudMiembro.findById(solicitudMiembroId);
  if (!checkExistencia) throw errorLanzado(404, 'La solicitud de miembro que intenta aceptar no existe');
  if (checkExistencia.estadoSolicitud === 'ACEPTADO') throw errorLanzado(403, 'La solicitud de miembro que intenta aceptar ya lo está');
  if (checkExistencia.estadoSolicitud === 'RECHAZADO') throw errorLanzado(403, 'La solicitud de miembro que intenta aceptar ha sido ya rechazada');
  solicitudMiembro = await SolicitudMiembro.findOneAndUpdate(
    { _id: solicitudMiembroId },
    {
      estadoSolicitud: 'ACEPTADO',
    },
    { new: true }
  );
  const receptores = await Visitante.find({ solicitudMiembro: { _id: solicitudMiembro._id } });
  await enviarNotificacionAutomatica({
    asunto: 'Solicitud para ser miembro aceptada',
    cuerpo:
      '!Felicidades! Tu solicitud para ser miembro ha sido aceptada, a continuación procede a realizar el pago para formalizar la inscripción y pasar a ser miembro',
    receptoresVisitantes: receptores,
    receptoresMiembros: [],
  });
  return solicitudMiembro;
};

exports.rechazarSolicitudMiembro = async (solicitudMiembroId, usuarioLogeado) => {
  const checkExistencia = await SolicitudMiembro.findById(solicitudMiembroId);
  if (!checkExistencia) throw errorLanzado(404, 'La solicitud de miembro que intenta rechazar no existe');
  if (checkExistencia.estadoSolicitud === 'RECHAZADO') throw errorLanzado(403, 'La solicitud de miembro que intenta rechazar ya lo está');
  if (checkExistencia.estadoSolicitud === 'ACEPTADO') throw errorLanzado(403, 'La solicitud de miembro que intenta rechazar ha sido ya aceptada');
  solicitudMiembro = await SolicitudMiembro.findOneAndUpdate(
    { _id: solicitudMiembroId },
    {
      estadoSolicitud: 'RECHAZADO',
    },
    { new: true }
  );
  const receptores = await Visitante.find({ solicitudMiembro: { _id: solicitudMiembro._id } });
  await enviarNotificacionAutomatica({
    asunto: 'Solicitud para ser miembro rechazada',
    cuerpo: 'Lo sentimos, tu solicitud para ser miembro ha sido rechazada. Si quieres, puedes volver a intentar solicitar ser miembro una vez pase un mes.',
    receptoresVisitantes: receptores,
    receptoresMiembros: [],
  });
  return solicitudMiembro;
};

exports.establecerPagadoSolicitudMiembro = async solicitudMiembroId => {
  const checkExistencia = await SolicitudMiembro.findById(solicitudMiembroId);
  if (!checkExistencia) throw errorLanzado(404, 'La solicitud de miembro a la que intenta establecer como pagado manualmente no existe');
  if (checkExistencia.estadoSolicitud !== 'ACEPTADO')
    throw errorLanzado(403, 'La solicitud de miembro no se puede establacer como pagado manualmente porque no está aceptada');
  if (checkExistencia.estaPagado) throw errorLanzado(403, 'La solicitud de miembro a la que intenta establacer como pagado manualmente ya lo está');
  solicitudMiembro = await SolicitudMiembro.findOneAndUpdate(
    { _id: solicitudMiembroId },
    {
      estaPagado: true,
    },
    { new: true }
  );
  return solicitudMiembro;
};

exports.pagarAutomaticoSolicitudMiembro = async (parametros, solicitudMiembroId) => {
  const checkExistencia = await SolicitudMiembro.findById(solicitudMiembroId);
  if (!checkExistencia) throw errorLanzado(404, 'La solicitud de miembro a la que intenta establecer como pagado no existe');
  if (checkExistencia.estadoSolicitud !== 'ACEPTADO')
    throw errorLanzado(403, 'La solicitud de miembro no se puede establacer como pagado porque no está aceptada');
  if (checkExistencia.estaPagado) throw errorLanzado(403, 'La solicitud de miembro a la que intenta establacer como pagado manualmente ya lo está');
  try {
    const pago = await stripe.charges.create({
      amount: parametros.cantidad * 100,
      currency: 'EUR',
      description: parametros.nombre,
      source: parametros.token,
    });
    if (pago.status === 'succeeded') {
      solicitudMiembro = await SolicitudMiembro.findOneAndUpdate(
        { _id: solicitudMiembroId },
        {
          estaPagado: true,
        },
        { new: true }
      );
    }
  } catch (error) {
    throw errorLanzado(500, error.raw.message);
  }
  return solicitudMiembro;
};

exports.eliminarSolicitudesMiembroRechazadas = async () => {
  const rebuildPeriod = '0 0 1 * *'; // Se comprueba cada 1 mes
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Eliminando solicitudes de miembro rechazadas...');
      const solicitudesMiembro = await SolicitudMiembro.aggregate([
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
      ]);
      solicitudesMiembro.forEach(async solicitudMiembro => {
        await Visitante.findByIdAndUpdate(
          { _id: solicitudMiembro.visitante._id },
          {
            $unset: { solicitudMiembro },
          },
          { new: true }
        );
      });
      await SolicitudMiembro.deleteMany({ estadoSolicitud: 'RECHAZADO' });
    },
    null,
    true,
    'Europe/Madrid'
  );
  job.start();
};
