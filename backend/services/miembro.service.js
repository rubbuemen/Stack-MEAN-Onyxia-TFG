const { errorLanzado } = require('../util/error.util');
const { Miembro } = require('../models/miembro.model');
const { Evento } = require('../models/evento.model');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const cron = require('cron');
const d3 = require('d3-time');
const { SolicitudMiembro } = require('../models/solicitudMiembro.model');

exports.comprobarFechaPenalizacion = async () => {
  const rebuildPeriod = '*/30 * * * *'; // Se comprueba cada media hora
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Comprobando penalizaciones...');
      const miembros = await Miembro.find();
      miembros.forEach(async miembro => {
        if (miembro.fechaUltimaPenalizacion) {
          const dias = d3.timeDay.count(miembro.fechaUltimaPenalizacion, new Date());
          const pasadoMes = dias >= 30 && miembro.cantidadPenalizaciones !== 0;
          if (pasadoMes) {
            await Miembro.findByIdAndUpdate(
              { _id: miembro._id },
              {
                cantidadPenalizaciones: 0,
              },
              { new: true }
            );
          }
        }
      });
    },
    null,
    true,
    'Europe/Madrid'
  );
  job.start();
};

exports.penalizarMiembro = async miembroId => {
  const checkExistencia = await Miembro.findById(miembroId);
  if (!checkExistencia) throw errorLanzado(404, 'El miembro que intenta penalizar no existe');
  const miembro = await Miembro.findOneAndUpdate(
    { _id: miembroId },
    {
      cantidadPenalizaciones: checkExistencia.cantidadPenalizaciones + 1,
      fechaUltimaPenalizacion: new Date(),
    },
    { new: true }
  );
  return miembro;
};

exports.getMiembrosVigentes = async () => {
  const miembros = await Miembro.find({ estaDeAlta: true }).populate({ path: 'cuentaUsuario' });
  return miembros;
};

exports.getMiembrosAceptadosByEventoId = async eventoId => {
  let miembros = [];
  const evento = await Evento.findById(eventoId).populate({
    path: 'inscripcionesEvento',
    match: { estadoInscripcion: 'ACEPTADO' },
    populate: { path: 'miembro' },
  });
  if (!evento) throw errorLanzado(404, 'El evento indicado no existe');
  evento.inscripcionesEvento.forEach(inscripcion => {
    miembros.push(inscripcion.miembro);
  });
  return miembros;
};

exports.getMiembrosJuntaSuperior = async () => {
  const miembros = await Miembro.find({ $or: [{ rol: 'PRESIDENTE' }, { rol: 'VICEPRESIDENTE' }, { rol: 'SECRETARIO' }] }).populate({ path: 'redSocials' });
  return miembros;
};

exports.getMiembrosJuntaVocales = async () => {
  const miembros = await Miembro.find({ rol: 'VOCAL' }).populate({ path: 'redSocials' });
  return miembros;
};

exports.getPresidente = async () => {
  const miembro = await Miembro.findOne({ rol: 'PRESIDENTE' }).populate({ path: 'redSocials' });
  return miembro;
};

exports.darBajaMiembro = async miembroId => {
  const checkExistencia = await Miembro.findById(miembroId).populate({ path: 'cuentaUsuario' });
  if (!checkExistencia) throw errorLanzado(404, 'El miembro que intenta dar de baja no existe');
  if (!checkExistencia.estaDeAlta) throw errorLanzado(403, 'El miembro que intenta dar de baja ya lo está');
  const cuentaUsuarioActual = checkExistencia.cuentaUsuario;
  const miembro = await Miembro.findOneAndUpdate(
    { _id: miembroId },
    {
      estaDeAlta: false,
    },
    { new: true }
  );
  await CuentaUsuario.findOneAndUpdate(
    { _id: cuentaUsuarioActual._id },
    {
      estado: false,
    },
    { new: true }
  );
  return miembro;
};

exports.darAltaExMiembro = async miembroId => {
  const checkExistencia = await Miembro.findById(miembroId).populate({ path: 'cuentaUsuario' }).populate({ path: 'solicitudMiembro' });
  if (!checkExistencia) throw errorLanzado(404, 'El miembro que intenta dar de alta no existe');
  if (checkExistencia.estaDeAlta) throw errorLanzado(403, 'El miembro que intenta dar de alta ya lo está');
  const cuentaUsuarioActual = checkExistencia.cuentaUsuario;
  const checkSolicitudPagada = checkExistencia.solicitudMiembro;
  if (!checkSolicitudPagada || !checkSolicitudPagada.estaPagado)
    throw errorLanzado(403, 'No se puede hacer miembro a un ex-miembro que no tiene su cuota en la solicitud para ser miembro pagada');
  miembro = await Miembro.findOneAndUpdate(
    { _id: miembroId },
    {
      estaDeAlta: true,
    },
    { new: true }
  );
  await CuentaUsuario.findOneAndUpdate(
    { _id: cuentaUsuarioActual._id },
    {
      estado: true,
    },
    { new: true }
  );
  return miembro;
};

exports.reiniciarCuotaMiembros = async () => {
  const rebuildPeriod = '0 0 1 */6 *'; // Se comprueba cada 6 meses
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Reiniciando cuotas...');
      await SolicitudMiembro.updateMany({ estaPagado: false });
    },
    null,
    true,
    'Europe/Madrid'
  );
  job.start();
};
