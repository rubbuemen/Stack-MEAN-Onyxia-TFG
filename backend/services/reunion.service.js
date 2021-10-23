const { errorLanzado } = require('../util/error.util');
const { Reunion } = require('../models/reunion.model');
const { Miembro } = require('../models/miembro.model');
const { AsistenciaMiembroReunion } = require('../models/asistenciaMiembroReunion.model');
const { asyncForEach, esHoy, esPasado } = require('../util/funciones.util');
const cron = require('cron');
const { enviarNotificacionAutomatica } = require('./notificacion.service');

exports.getReuniones = async () => {
  const reuniones = await Reunion.find();
  return reuniones;
};

exports.getReunion = async reunionId => {
  const reunion = await Reunion.findById(reunionId);
  if (!reunion) throw errorLanzado(404, 'La reunion no existe');
  return reunion;
};

exports.getReunionesPendientes = async () => {
  const reuniones = await Reunion.find({ estadoReunion: 'PENDIENTE' });
  return reuniones;
};

exports.getReunionesRealizadas = async () => {
  const reuniones = await Reunion.find({ estadoReunion: 'REALIZADO' });
  return reuniones;
};

exports.crearReunion = async (parametros, usuarioLogeado) => {
  let reunion;
  let miembros;
  try {
    if (parametros.tipoReunion === 'ASOCIACION') {
      miembros = await Miembro.find({ estaDeAlta: true });
    } else {
      miembros = await Miembro.find({ rol: { $ne: 'ESTANDAR' }, estaDeAlta: true });
    }

    reunion = new Reunion(parametros);
    reunion = await reunion.save();
    await asyncForEach(miembros, async miembro => {
      let asistencia = new AsistenciaMiembroReunion();
      asistencia.miembro = miembro;
      asistencia.reunion = reunion;
      asistencia = await asistencia.save();
      await Miembro.findOneAndUpdate(
        { _id: miembro._id },
        {
          $push: { asistenciasMiembroReunion: asistencia._id },
        },
        { new: true }
      );
      await Reunion.findOneAndUpdate(
        { _id: reunion._id },
        {
          $push: { asistenciasMiembroReunion: asistencia._id },
        },
        { new: true }
      );
    });
    const receptores = miembros;
    const mensajeDia = 'día ' + reunion.fecha.getDate() + '/' + (reunion.fecha.getMonth() + 1) + '/' + reunion.fecha.getFullYear();
    await enviarNotificacionAutomatica({
      asunto: 'Una nueva reunión ha sido publicada para el ' + mensajeDia,
      cuerpo:
        'Se ha publicado una reunión que se celebrará el ' +
        mensajeDia +
        ' aproximadamente de ' +
        reunion.horaInicio +
        ' a ' +
        reunion.horaFin +
        ' en ' +
        reunion.lugar +
        '. Recuerda que es necesario que marques si vas a asistir o no, por defecto estará marcado que no vas a asistir.',
      receptoresMiembros: receptores,
      receptoresVisitantes: [],
    });
    return reunion;
  } catch (error) {
    if (reunion) {
      await asyncForEach(reunion.asistenciasMiembroReunion, async asistencia => {
        const checkAsistenciaInMiembro = await Miembro.findOne({ asistenciasMiembroReunion: { $in: [asistencia._id] } });
        if (checkAsistenciaInMiembro) await Miembro.updateOne({ _id: asistencia.miembro }, { $pull: { asistenciasMiembroReunion: asistencia._id } });
        await AsistenciaMiembroReunion.findByIdAndDelete(asistencia._id);
      });
      await Reunion.findByIdAndDelete(reunion._id);
    }
    throw error;
  }
};

exports.editarReunion = async (parametros, reunionId) => {
  const checkExistencia = await Reunion.findById(reunionId);
  if (!checkExistencia) throw errorLanzado(404, 'La reunion que intenta editar no existe');
  if (checkExistencia.estadoReunion !== 'PENDIENTE')
    throw errorLanzado(403, 'El reunion que intenta editar no puede editarse porque está en un estado diferente a pendiente');
  const reunion = await Reunion.findOneAndUpdate(
    { _id: reunionId },
    {
      fecha: parametros.fecha,
      horaInicio: parametros.horaInicio,
      horaFin: parametros.horaFin,
      lugar: parametros.lugar,
      tipoReunion: parametros.tipoReunion,
      temasATratar: parametros.temasATratar,
    },
    { new: true }
  );
  return reunion;
};

exports.añadirInformacionReunionRealizada = async (parametros, reunionId) => {
  const checkExistencia = await Reunion.findById(reunionId);
  if (!checkExistencia) throw errorLanzado(404, 'La reunion que intenta editar no existe');
  if (checkExistencia.estadoReunion !== 'REALIZADO')
    throw errorLanzado(403, 'El reunion a la que intenta añadir información no puede realizarse porque aún no se ha realizado');
  const reunion = await Reunion.findOneAndUpdate(
    { _id: reunionId },
    {
      decisionesTomadas: parametros.decisionesTomadas,
      actaReunion: parametros.actaReunion,
    },
    { new: true }
  );
  return reunion;
};

exports.eliminarReunion = async reunionId => {
  let reunion = await Reunion.findById(reunionId).populate({ path: 'asistenciasMiembroReunion' });
  if (!reunion) throw errorLanzado(404, 'La reunion que intenta eliminar no existe');
  if (reunion.estadoReunion !== 'PENDIENTE') throw errorLanzado(403, 'El reunion no puede eliminarse porque ya no está pendiente de realizarse');
  await asyncForEach(reunion.asistenciasMiembroReunion, async asistencia => {
    const miembro = await Miembro.findById(asistencia.miembro);
    await Miembro.findOneAndUpdate(
      { _id: miembro._id },
      {
        $pull: { asistenciasMiembroReunion: asistencia._id },
      },
      { new: true }
    );
    await AsistenciaMiembroReunion.findByIdAndDelete(asistencia._id);
  });
  reunion = await Reunion.findByIdAndDelete(reunionId);
  return reunion;
};

exports.cancelarReunion = async reunionId => {
  let reunion = await Reunion.findById(reunionId);
  if (!reunion) throw errorLanzado(404, 'La reunión que intenta cancelar no existe');
  if (reunion.estadoReunion !== 'PENDIENTE') throw errorLanzado(403, 'El reunion que intenta cancelar debe estar en un estado de pendiente de realizarse');
  reunion = await Reunion.findOneAndUpdate(
    { _id: reunionId },
    {
      estadoReunion: 'CANCELADO',
    },
    { new: true }
  );
  return reunion;
};

exports.cambiarReunionesAEnProgreso = async () => {
  const rebuildPeriod = '0 9 * * *'; // Se comprueba cada día a las 9:00
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Verificando reuniones pendientes...');
      const reuniones = await Reunion.find({ estadoReunion: 'PENDIENTE' });
      reuniones.forEach(async reunion => {
        if (esHoy(reunion.fecha)) {
          await Reunion.findByIdAndUpdate(
            { _id: reunion._id },
            {
              estadoReunion: 'ENPROGRESO',
            },
            { new: true }
          );
        }
      });
    },
    null,
    true,
    'Europe/Madrid'
  );
  job.start();
};

exports.cambiarReunionesARealizado = async () => {
  const rebuildPeriod = '0 0 * * *'; // Se comprueba cada día
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Verificando reuniones realizadas...');
      const reuniones = await Reunion.find({ $or: [{ estadoReunion: 'PENDIENTE' }, { estadoReunion: 'ENPROGRESO' }] });
      reuniones.forEach(async reunion => {
        if (esPasado(reunion.fecha)) {
          await Reunion.findByIdAndUpdate(
            { _id: reunion._id },
            {
              estadoReunion: 'REALIZADO',
            },
            { new: true }
          );
        }
      });
    },
    null,
    true,
    'Europe/Madrid'
  );
  job.start();
};
