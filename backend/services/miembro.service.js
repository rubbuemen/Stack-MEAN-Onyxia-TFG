const { errorLanzado } = require('../util/error.util');
const { Miembro } = require('../models/miembro.model');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const cron = require('cron');
const d3 = require('d3-time');

exports.comprobarFechaPenalizacion = async () => {
  const rebuildPeriod = '*/30 * * * *'; // Se comprueba cada media hora
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Comprobando penalizaciones...');
      const miembros = await Miembro.find();
      miembros.forEach(async (miembro) => {
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

exports.penalizarMiembro = async (miembroId) => {
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

exports.darBajaMiembro = async (miembroId) => {
  const checkExistencia = await Miembro.findById(miembroId).populate({ path: 'cuentaUsuario' });
  if (!checkExistencia) throw errorLanzado(404, 'El miembro que intenta dar de baja no existe');
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
