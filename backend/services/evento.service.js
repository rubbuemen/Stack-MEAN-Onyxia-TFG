const { errorLanzado } = require('../util/error.util');
const { Evento } = require('../models/evento.model');
const { InscripcionEvento } = require('../models/inscripcionEvento.model');
const { Miembro } = require('../models/miembro.model');
const { TramoHorario } = require('../models/tramoHorario.model');
const { DiaEvento } = require('../models/diaEvento.model');
const { Actividad } = require('../models/actividad.model');
const { Material } = require('../models/material.model');
const { Inventario } = require('../models/inventario.model');
const { asyncForEach, esHoy } = require('../util/funciones.util');
const cron = require('cron');
const { enviarNotificacionAutomatica } = require('./notificacion.service');

exports.getEventosPublicos = async () => {
  const eventos = await Evento.find({ estaPublicado: true }).populate({ path: 'miembroCreador' });
  return eventos;
};

exports.getEvento = async eventoId => {
  const evento = await Evento.findById(eventoId).populate({ path: 'miembroCreador' }).populate({ path: 'actividadesEvento' });
  if (!evento) throw errorLanzado(404, 'El evento no existe');
  return evento;
};

exports.getEventos = async () => {
  const eventos = await Evento.find().populate({ path: 'miembroCreador' });
  return eventos;
};

exports.crearEvento = async (parametros, img, usuarioLogeado) => {
  let tramoHorario;
  let diaEvento;
  let evento;
  try {
    await asyncForEach(parametros.actividadesEvento, async actividadId => {
      const actividad = await Actividad.findById(actividadId);
      if (!actividad.estaPublicado || !actividad.enVigor)
        throw errorLanzado(403, 'La actividad ' + actividad.nombre + ' no puede ser asignada al evento porque no está publicada o en vigor');
    });
    //Por cada actividad, comprobar si para cada material hay cantidad disponible
    let mapMaterialCantidadNecesaria = {};
    await asyncForEach(parametros.actividadesEvento, async actividad => {
      const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
      if (act.materiales.length === 0) throw errorLanzado(403, 'No hay materiales asignados a la actividad ' + act.nombre);
      act.materiales.forEach(material => {
        mapMaterialCantidadNecesaria[material.id] = mapMaterialCantidadNecesaria[material.id] || 0;
        mapMaterialCantidadNecesaria[material.id] = mapMaterialCantidadNecesaria[material.id] + 1;
      });
      await asyncForEach(act.materiales, async material => {
        if (material.cantidadDisponible < mapMaterialCantidadNecesaria[material.id])
          throw errorLanzado(403, 'El material ' + material.nombre + ' de la actividad ' + act.nombre + ' no tiene cantidad disponible para su uso en esta');
      });
    });

    const miembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    tramoHorario = new TramoHorario(parametros);
    tramoHorario = await tramoHorario.save();
    diaEvento = new DiaEvento(parametros);
    diaEvento.tramosHorarios.push(tramoHorario);
    diaEvento = await diaEvento.save();
    evento = new Evento(parametros);
    if (img) {
      evento.imagen = {
        data: img.data,
        mimetype: img.mimetype,
        size: img.size,
      };
    }
    evento.diasEvento.push(diaEvento);
    evento.miembroCreador = miembro;
    evento = await evento.save();

    //Tras asignar las actividades al evento, recorrer cada material, sumarle cantidadEnUso y restarle cantidadDisponible.
    await asyncForEach(evento.actividadesEvento, async actividad => {
      const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
      await asyncForEach(act.materiales, async material => {
        await Material.findOneAndUpdate(
          { _id: material._id },
          {
            cantidadDisponible: material.cantidadDisponible - 1,
            cantidadEnUso: material.cantidadEnUso + 1,
          },
          { new: true }
        );
        //Para cada material, buscar solo un inventario que tenga estadoMaterial operativo (si no hay ninguno, entonces deteriorado), poner el enUso en true y meterlos en evento
        let mat = await Material.findById(material._id).populate({ path: 'inventarios', match: { estadoMaterial: 'OPERATIVO', enUso: false } });
        if (mat.inventarios.length === 0) {
          mat = await Material.findById(material._id).populate({ path: 'inventarios', match: { estadoMaterial: 'DETERIORADO', enUso: false } });
        }
        const inventario = mat.inventarios[0];
        await Inventario.findByIdAndUpdate(
          { _id: inventario._id },
          {
            enUso: true,
          },
          { new: true }
        );
        evento.inventarios.push(inventario._id);
        evento = await evento.save();
      });
    });
    return evento;
  } catch (error) {
    if (tramoHorario) {
      const checkTramoInDia = await DiaEvento.findOne({ tramosHorarios: { $in: [tramoHorario._id] } });
      if (checkTramoInDia) await DiaEvento.updateOne({ _id: diaEvento._id }, { $pull: { tramosHorarios: tramoHorario._id } });
      await TramoHorario.findByIdAndDelete(tramoHorario._id);
    }
    if (diaEvento) {
      const checkDiaEventoInEvento = await Evento.findOne({ diasEvento: { $in: [diaEvento._id] } });
      if (checkDiaEventoInEvento) await Evento.updateOne({ _id: evento._id }, { $pull: { diasEvento: diaEvento._id } });
      await DiaEvento.findByIdAndDelete(diaEvento._id);
    }
    throw error;
  }
};

exports.cambiarEventosAEnProgreso = async () => {
  const rebuildPeriod = '0 9 * * *'; // Se comprueba cada día a las 9:00
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Verificando eventos pendientes...');
      const eventos = await Evento.find({ estadoEvento: 'PENDIENTE' }).populate({ path: 'diasEvento' });
      eventos.forEach(async evento => {
        evento.diasEvento.forEach(async diaEvento => {
          if (esHoy(diaEvento.fecha)) {
            await Evento.findByIdAndUpdate(
              { _id: evento._id },
              {
                estadoEvento: 'ENPROGRESO',
              },
              { new: true }
            );
          }
        });
      });
    },
    null,
    true,
    'Europe/Madrid'
  );
  job.start();
};

exports.cambiarEventosARealizados = async () => {
  const rebuildPeriod = '0 0 * * *'; // Se comprueba cada 1 día
  const job = new cron.CronJob(
    rebuildPeriod,
    async () => {
      console.log('Verificando eventos acabados...');
      const eventos = await Evento.find({ estadoEvento: 'ENPROGRESO' }).populate({ path: 'diasEvento' });
      eventos.forEach(async evento => {
        todasFechasDiferentes = true;
        evento.diasEvento.forEach(async diaEvento => {
          if (esHoy(diaEvento.fecha)) {
            todasFechasDiferentes = false;
          }
        });
        if (todasFechasDiferentes) {
          await asyncForEach(evento.actividadesEvento, async actividad => {
            const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
            await asyncForEach(act.materiales, async material => {
              await Material.findOneAndUpdate(
                { _id: material._id },
                {
                  cantidadDisponible: material.cantidadDisponible + 1,
                  cantidadEnUso: material.cantidadEnUso - 1,
                },
                { new: true }
              );
            });
          });
          await asyncForEach(evento.inventarios, async inventario => {
            await Inventario.findOneAndUpdate(
              { _id: inventario },
              {
                enUso: false,
              },
              { new: true }
            );
          });
          await Evento.findByIdAndUpdate(
            { _id: evento._id },
            {
              estadoEvento: 'REALIZADO',
              $unset: { inventarios: 1 },
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

exports.editarEvento = async (parametros, img, eventoId) => {
  let evento = await Evento.findById(eventoId)
    .populate({ path: 'inscripcionesEvento', match: { estadoInscripcion: 'ACEPTADO' } })
    .populate({ path: 'diasEvento' });
  if (!evento) throw errorLanzado(404, 'El evento que intenta editar no existe');
  if (evento.estadoEvento !== 'PENDIENTE')
    throw errorLanzado(403, 'El evento que intenta editar no puede editarse porque está en un estado diferente a pendiente');

  const cupoNuevo = Number(parametros.cupoInscripciones);
  if (evento.cupoInscripciones === 0 && cupoNuevo > 0) {
    const eventoInscripcionesRechazadas = await Evento.findById(eventoId).populate({
      path: 'inscripcionesEvento',
      match: { estadoInscripcion: 'RECHAZADO' },
    });
    await asyncForEach(eventoInscripcionesRechazadas.inscripcionesEvento, async inscripcion => {
      await InscripcionEvento.findOneAndUpdate(
        { _id: inscripcion._id },
        {
          estadoInscripcion: 'PENDIENTE',
        },
        { new: true }
      );
    });
  }
  let actividadesEnBD = evento.actividadesEvento.map(x => x.toString());
  let actividadesSeleccionadas = parametros.actividadesEvento.map(x => x.toString());
  let actividadesNuevas = actividadesSeleccionadas.filter(x => !actividadesEnBD.includes(x));
  await asyncForEach(actividadesNuevas, async actividadId => {
    const actividad = await Actividad.findById(actividadId);
    if (!actividad.estaPublicado || !actividad.enVigor)
      throw errorLanzado(403, 'La actividad ' + actividad.nombre + ' no puede ser asignada al evento porque no está publicada o en vigor');
  });
  let mapMaterialCantidadNecesaria = {};
  await asyncForEach(actividadesNuevas, async actividad => {
    const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
    if (act.materiales.length === 0) throw errorLanzado(403, 'No hay materiales asignados a la actividad ' + act.nombre);
    act.materiales.forEach(material => {
      mapMaterialCantidadNecesaria[material.id] = mapMaterialCantidadNecesaria[material.id] || 0;
      mapMaterialCantidadNecesaria[material.id] = mapMaterialCantidadNecesaria[material.id] + 1;
    });
    await asyncForEach(act.materiales, async material => {
      if (material.cantidadDisponible < mapMaterialCantidadNecesaria[material.id])
        throw errorLanzado(403, 'El material ' + material.nombre + ' de la actividad ' + act.nombre + ' no tiene cantidad disponible para su uso en esta');
    });
  });

  ///Eliminamos todas las actividades del evento
  await asyncForEach(evento.actividadesEvento, async actividad => {
    const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
    await asyncForEach(act.materiales, async material => {
      await Material.findOneAndUpdate(
        { _id: material._id },
        {
          cantidadDisponible: material.cantidadDisponible + 1,
          cantidadEnUso: material.cantidadEnUso - 1,
        },
        { new: true }
      );
    });
  });
  await asyncForEach(evento.inventarios, async inventario => {
    await Inventario.findOneAndUpdate(
      { _id: inventario },
      {
        enUso: false,
      },
      { new: true }
    );
  });

  //Asignamos todos los seleccionados de nuevo

  if (!img && parametros.hayImagen === 'true') {
    img = evento.imagen; // Para el caso que se ha editado pero no se ha cambiado la imagen
  }
  if (img) {
    evento = await Evento.findOneAndUpdate(
      { _id: eventoId },
      {
        nombre: parametros.nombre,
        descripcion: parametros.descripcion,
        lugar: parametros.lugar,
        estaPublicado: parametros.estaPublicado,
        esFueraSevilla: parametros.esFueraSevilla,
        cupoInscripciones: parametros.cupoInscripciones,
        actividadesEvento: parametros.actividadesEvento,
        inventarios: [],
        imagen: {
          data: img.data,
          mimetype: img.mimetype,
          size: img.size,
        },
      },
      { new: true }
    );
  } else {
    evento = await Evento.findOneAndUpdate(
      { _id: eventoId },
      {
        nombre: parametros.nombre,
        descripcion: parametros.descripcion,
        lugar: parametros.lugar,
        estaPublicado: parametros.estaPublicado,
        esFueraSevilla: parametros.esFueraSevilla,
        cupoInscripciones: parametros.cupoInscripciones,
        actividadesEvento: parametros.actividadesEvento,
        inventarios: [],
      },
      { new: true }
    );
    evento = await Evento.findOneAndUpdate(
      { _id: evento._id },
      {
        $unset: { imagen: 1 },
      },
      { new: true }
    );
  }

  //Comiteamos todo lo seleccionado de nuevo
  await asyncForEach(evento.actividadesEvento, async actividad => {
    const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
    await asyncForEach(act.materiales, async material => {
      await Material.findOneAndUpdate(
        { _id: material._id },
        {
          cantidadDisponible: material.cantidadDisponible - 1,
          cantidadEnUso: material.cantidadEnUso + 1,
        },
        { new: true }
      );
      //Para cada material, buscar solo un inventario que tenga estadoMaterial operativo (si no hay ninguno, entonces deteriorado), poner el enUso en true y meterlos en evento
      let mat = await Material.findById(material._id).populate({ path: 'inventarios', match: { estadoMaterial: 'OPERATIVO', enUso: false } });
      if (mat.inventarios.length === 0) {
        mat = await Material.findById(material._id).populate({ path: 'inventarios', match: { estadoMaterial: 'DETERIORADO', enUso: false } });
      }
      const inventario = mat.inventarios[0];
      await Inventario.findByIdAndUpdate(
        { _id: inventario._id },
        {
          enUso: true,
        },
        { new: true }
      );
      evento.inventarios.push(inventario._id);
      evento = await evento.save();
    });
  });

  if (!evento.estaPublicado && parametros.estaPublicado === 'true') {
    const receptores = await Miembro.find({ estaDeAlta: true });
    const primerDia = evento.diasEvento[0].fecha;
    const ultimoDia = evento.diasEvento[evento.diasEvento.length - 1].fecha;
    let mensajeDia;
    if (primerDia == ultimoDia) {
      mensajeDia = 'el día ' + primerDia.getDate() + '/' + (primerDia.getMonth() + 1) + '/' + primerDia.getFullYear();
    } else {
      mensajeDia =
        'los días ' +
        primerDia.getDate() +
        '/' +
        (primerDia.getMonth() + 1) +
        '/' +
        primerDia.getFullYear() +
        ' - ' +
        ultimoDia.getDate() +
        '/' +
        (ultimoDia.getMonth() + 1) +
        '/' +
        ultimoDia.getFullYear();
    }
    await enviarNotificacionAutomatica({
      asunto: 'Un nuevo evento ha sido publicado: ' + evento.nombre,
      cuerpo:
        'El evento ' +
        evento.nombre +
        ' ha sido publicado. Dicho evento se celebrará en ' +
        evento.lugar +
        ' durante ' +
        mensajeDia +
        '. El cupo inicial para poder inscribirse es de ' +
        evento.cupoInscripciones +
        ' miembros.',
      receptoresMiembros: receptores,
      receptoresVisitantes: [],
    });
  }
  return evento;
};

exports.eliminarEvento = async eventoId => {
  let evento = await Evento.findById(eventoId).populate({ path: 'inscripcionesEvento' });
  if (!evento) throw errorLanzado(404, 'El evento que intenta eliminar no existe');
  const cantidadInscripciones = evento.inscripcionesEvento.length;
  if (cantidadInscripciones !== 0) throw errorLanzado(403, 'El evento no se puede eliminar porque ya se han realizado inscripciones a este');
  await asyncForEach(evento.actividadesEvento, async actividad => {
    const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
    await asyncForEach(act.materiales, async material => {
      await Material.findOneAndUpdate(
        { _id: material._id },
        {
          cantidadDisponible: material.cantidadDisponible + 1,
          cantidadEnUso: material.cantidadEnUso - 1,
        },
        { new: true }
      );
    });
  });
  await asyncForEach(evento.inventarios, async inventario => {
    await Inventario.findOneAndUpdate(
      { _id: inventario },
      {
        enUso: false,
      },
      { new: true }
    );
  });
  await asyncForEach(evento.diasEvento, async dia => {
    const d = await DiaEvento.findById(dia);
    await asyncForEach(d.tramosHorarios, async tramo => {
      await TramoHorario.findByIdAndDelete(tramo);
    });
    await DiaEvento.findByIdAndDelete(dia);
  });
  evento = await Evento.findByIdAndDelete(eventoId);
  return evento;
};

exports.publicarEvento = async (eventoId, usuarioLogeado) => {
  const checkExistencia = await Evento.findById(eventoId).populate({ path: 'diasEvento' });
  if (checkExistencia.estadoEvento !== 'PENDIENTE')
    throw errorLanzado(403, 'El evento que intenta publicar no puede publicarse porque está en un estado diferente a pendiente');
  if (!checkExistencia) throw errorLanzado(404, 'El evento que intenta publicar no existe');
  if (checkExistencia.estaPublicado) throw errorLanzado(403, 'El evento que intenta publicar ya lo está');
  const evento = await Evento.findOneAndUpdate(
    { _id: eventoId },
    {
      estaPublicado: true,
    },
    { new: true }
  );
  const receptores = await Miembro.find({ estaDeAlta: true });
  const primerDia = checkExistencia.diasEvento[0].fecha;
  const ultimoDia = checkExistencia.diasEvento[checkExistencia.diasEvento.length - 1].fecha;
  let mensajeDia;
  if (primerDia == ultimoDia) {
    mensajeDia = 'el día ' + primerDia.getDate() + '/' + (primerDia.getMonth() + 1) + '/' + primerDia.getFullYear();
  } else {
    mensajeDia =
      'los días ' +
      primerDia.getDate() +
      '/' +
      (primerDia.getMonth() + 1) +
      '/' +
      primerDia.getFullYear() +
      ' - ' +
      ultimoDia.getDate() +
      '/' +
      (ultimoDia.getMonth() + 1) +
      '/' +
      ultimoDia.getFullYear();
  }
  await enviarNotificacionAutomatica({
    asunto: 'Un nuevo evento ha sido publicado: ' + evento.nombre,
    cuerpo:
      'El evento ' +
      evento.nombre +
      ' ha sido publicado. Dicho evento se celebrará en ' +
      evento.lugar +
      ' durante ' +
      mensajeDia +
      '. El cupo inicial para poder inscribirse es de ' +
      evento.cupoInscripciones +
      ' miembros.',
    receptoresMiembros: receptores,
    receptoresVisitantes: [],
  });
  return evento;
};

exports.ocultarEvento = async eventoId => {
  const checkExistencia = await Evento.findById(eventoId);
  if (!checkExistencia) throw errorLanzado(404, 'El evento que intenta ocultar no existe');
  if (checkExistencia.estadoEvento !== 'PENDIENTE')
    throw errorLanzado(403, 'El evento que intenta ocultar no puede ocultarse porque está en un estado diferente a pendiente');
  if (!checkExistencia.estaPublicado) throw errorLanzado(403, 'El evento que intenta ocultar ya lo está');
  const cantidadInscripciones = checkExistencia.inscripcionesEvento.length;
  if (cantidadInscripciones !== 0) throw errorLanzado(403, 'El evento no se puede ocultar porque ya se han realizado inscripciones a este');
  const evento = await Evento.findOneAndUpdate(
    { _id: eventoId },
    {
      estaPublicado: false,
    },
    { new: true }
  );
  return evento;
};

exports.cancelarEvento = async eventoId => {
  let evento = await Evento.findById(eventoId);
  if (!evento) throw errorLanzado(404, 'El evento que intenta cancelar no existe');
  if (evento.estadoEvento !== 'PENDIENTE') throw errorLanzado(403, 'El evento que intenta cancelar debe estar en un estado de pendiente de realizarse');
  await asyncForEach(evento.inscripcionesEvento, async inscripcion => {
    await InscripcionEvento.findOneAndUpdate(
      { _id: inscripcion },
      {
        estadoInscripcion: 'RECHAZADO',
      },
      { new: true }
    );
  });
  await asyncForEach(evento.actividadesEvento, async actividad => {
    const act = await Actividad.findById(actividad).populate({ path: 'materiales' });
    await asyncForEach(act.materiales, async material => {
      await Material.findOneAndUpdate(
        { _id: material._id },
        {
          cantidadDisponible: material.cantidadDisponible + 1,
          cantidadEnUso: material.cantidadEnUso - 1,
        },
        { new: true }
      );
    });
  });
  await asyncForEach(evento.inventarios, async inventario => {
    await Inventario.findOneAndUpdate(
      { _id: inventario },
      {
        enUso: false,
      },
      { new: true }
    );
  });
  evento = await Evento.findOneAndUpdate(
    { _id: eventoId },
    {
      estadoEvento: 'CANCELADO',
      $unset: { inventarios: 1 },
    },
    { new: true }
  );
  return evento;
};
