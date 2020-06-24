const { errorLanzado } = require('../util/error.util');
const { Miembro } = require('../models/miembro.model');
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
  const cuentaUsuario = await Miembro.findOneAndUpdate(
    { _id: miembroId },
    {
      cantidadPenalizaciones: checkExistencia.cantidadPenalizaciones + 1,
      fechaUltimaPenalizacion: new Date(),
    },
    { new: true }
  );
  return cuentaUsuario;
};
