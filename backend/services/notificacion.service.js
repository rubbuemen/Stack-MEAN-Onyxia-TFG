const { errorLanzado } = require('../util/error.util');
const { Notificacion } = require('../models/notificacion.model');
const { Buzon } = require('../models/buzon.model');
const { Miembro } = require('../models/miembro.model');
const { Visitante } = require('../models/visitante.model');
const { asyncForEach } = require('../util/funciones.util');

exports.getNotificacionesByBuzonId = async (usuarioLogeado, buzonId) => {
  const buzon = await Buzon.findById(buzonId);
  if (!buzon) throw errorLanzado(404, 'El buzón del que intenta listar las notificaciones no existe');
  const actorConectado =
    (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
      path: 'buzones',
      match: { _id: buzonId },
      populate: { path: 'notificaciones' },
    })) ||
    (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
      path: 'buzones',
      match: { _id: buzonId },
      populate: { path: 'notificaciones' },
    }));
  if (actorConectado.buzones.length === 0) throw errorLanzado(403, 'Acceso prohibido. Esta notificación no existe en ninguno de tus buzones');
  return actorConectado.buzones[0].notificaciones;
};

exports.getNotificacionesNoLeidasByBuzonId = async (usuarioLogeado, buzonId) => {
  const buzon = await Buzon.findById(buzonId);
  if (!buzon) throw errorLanzado(404, 'El buzón del que intenta listar las notificaciones no existe');
  const actorConectado =
    (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
      path: 'buzones',
      match: { _id: buzonId },
      populate: { path: 'notificaciones', match: { leido: false } },
    })) ||
    (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
      path: 'buzones',
      match: { _id: buzonId },
      populate: { path: 'notificaciones', match: { leido: false } },
    }));
  if (actorConectado.buzones.length === 0) throw errorLanzado(403, 'Acceso prohibido. Esta notificación no existe en ninguno de tus buzones');
  return actorConectado.buzones[0].notificaciones;
};

exports.enviarNotificacion = async (parametros, usuarioLogeado) => {
  let notificacion;
  let buzonSalida;
  const notificacionesEntrantes = [];
  try {
    let actorBuzonSalida;
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      parametros.emisorVisitante = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
      actorBuzonSalida = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de salida' },
      });
    } else {
      parametros.emisorMiembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
      actorBuzonSalida = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de salida' },
      });
    }
    buzonSalida = actorBuzonSalida.buzones[0];
    parametros.receptoresVisitantes = [];
    parametros.receptoresMiembros = [];
    for (const receptor of parametros.receptores) {
      const actor =
        (await Visitante.findOne({ _id: receptor }).populate({ path: 'cuentaUsuario' })) ||
        (await Miembro.findOne({ _id: receptor }).populate({ path: 'cuentaUsuario' }));
      if (actor.cuentaUsuario.autoridad === 'VISITANTE') {
        if (usuarioLogeado.autoridad === 'VISITANTE') throw errorLanzado(403, 'Al ser visitante sólo puedes enviar notificaciones al presidente');
        parametros.receptoresVisitantes.push(receptor);
      } else {
        if (actor.cuentaUsuario.autoridad !== 'PRESIDENTE' && usuarioLogeado.autoridad === 'VISITANTE')
          throw errorLanzado(403, 'Al ser visitante sólo puedes enviar notificaciones al presidente');
        parametros.receptoresMiembros.push(receptor);
      }
    }
    notificacion = new Notificacion(parametros);
    notificacion = await notificacion.save();
    await Buzon.findOneAndUpdate(
      { _id: buzonSalida._id },
      {
        $push: { notificaciones: notificacion._id },
      },
      { new: true }
    );

    await asyncForEach(parametros.receptoresVisitantes, async receptor => {
      notificacion = new Notificacion(parametros);
      notificacion = await notificacion.save();
      notificacionesEntrantes.push(notificacion);
      const actorBuzonEntrada = await Visitante.findOne({ _id: receptor }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de entrada' },
      });
      const buzonEntrada = actorBuzonEntrada.buzones[0];
      await Buzon.findOneAndUpdate(
        { _id: buzonEntrada._id },
        {
          $push: { notificaciones: notificacion._id },
        },
        { new: true }
      );
    });
    await asyncForEach(parametros.receptoresMiembros, async receptor => {
      notificacion = new Notificacion(parametros);
      notificacion = await notificacion.save();
      notificacionesEntrantes.push(notificacion);
      const actorBuzonEntrada = await Miembro.findOne({ _id: receptor }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de entrada' },
      });
      const buzonEntrada = actorBuzonEntrada.buzones[0];
      await Buzon.findOneAndUpdate(
        { _id: buzonEntrada._id },
        {
          $push: { notificaciones: notificacion._id },
        },
        { new: true }
      );
    });
    return notificacion;
  } catch (error) {
    if (notificacion) {
      await Buzon.findOneAndUpdate(
        { _id: buzonSalida._id },
        {
          $pull: { notificaciones: notificacion._id },
        },
        { new: true }
      );
      await asyncForEach(parametros.receptoresVisitantes, async receptor => {
        const actorBuzonEntrada = await Visitante.findOne({ _id: receptor }).populate({
          path: 'buzones',
          match: { nombre: 'Buzón de entrada' },
        });
        const buzonEntrada = actorBuzonEntrada.buzones[0];
        for (const not of notificacionesEntrantes) {
          await Buzon.findOneAndUpdate(
            { _id: buzonEntrada._id },
            {
              $pull: { notificaciones: not._id },
            },
            { new: true }
          );
        }
      });
      await asyncForEach(parametros.receptoresMiembros, async receptor => {
        const actorBuzonEntrada = await Miembro.findOne({ _id: receptor }).populate({
          path: 'buzones',
          match: { nombre: 'Buzón de entrada' },
        });
        const buzonEntrada = actorBuzonEntrada.buzones[0];
        for (const not of notificacionesEntrantes) {
          await Buzon.findOneAndUpdate(
            { _id: buzonEntrada._id },
            {
              $pull: { notificaciones: not._id },
            },
            { new: true }
          );
        }
      });
      await Notificacion.findByIdAndDelete(notificacion._id);
      for (const not of notificacionesEntrantes) {
        await Notificacion.findByIdAndDelete(not._id);
      }
    }
    throw error;
  }
};

exports.getNotificacion = async (usuarioLogeado, notificacionId) => {
  let notificacion = await Notificacion.findById(notificacionId);
  if (!notificacion) throw errorLanzado(404, 'La notificacion no existe');
  if (usuarioLogeado.autoridad === 'VISITANTE') {
    actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
      path: 'buzones',
      match: { notificaciones: { $in: [notificacionId] } },
    });
  } else {
    actorConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
      path: 'buzones',
      match: { notificaciones: { $in: [notificacionId] } },
    });
  }
  if (actorConectado.buzones.length === 0) throw errorLanzado(403, 'Acceso prohibido. Esta notificación no existe en ninguno de tus buzones');

  notificacion = await Notificacion.findOneAndUpdate(
    { _id: notificacion._id },
    {
      leido: true,
    },
    { new: true }
  );

  return notificacion;
};

exports.moverNotificaciones = async (parametros, usuarioLogeado) => {
  let actorBuzon;
  await asyncForEach(parametros.notificaciones, async notificacionId => {
    const notificacion = await Notificacion.findById(notificacionId);
    const actorConectado =
      (await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } })) || (await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }));
    const propietarioEntidad =
      (await Visitante.findOne({ buzones: { $in: [parametros.buzon] } })) || (await Miembro.findOne({ buzones: { $in: [parametros.buzon] } }));
    if (actorConectado._id.toString() !== propietarioEntidad._id.toString()) throw errorLanzado(403, 'Acceso prohibido. No eres el autor de este buzón');
    if (usuarioLogeado.autoridad === 'VISITANTE') {
      actorBuzon = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { notificaciones: { $in: [notificacionId] } },
      });
    } else {
      actorBuzon = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { notificaciones: { $in: [notificacionId] } },
      });
    }
    if (actorBuzon.buzones.length === 0) throw errorLanzado(403, 'Acceso prohibido. Esta notificación no existe en ninguno de tus buzones');
    const buzon = actorBuzon.buzones[0]; // Buzón origen
    await Buzon.findOneAndUpdate(
      { _id: buzon._id },
      {
        $pull: { notificaciones: notificacion._id },
      },
      { new: true }
    );
    await Buzon.findOneAndUpdate(
      { _id: parametros.buzon },
      {
        $push: { notificaciones: notificacion._id },
      },
      { new: true }
    );
  });
  return parametros.notificaciones;
};

exports.eliminarNotificaciones = async (parametros, usuarioLogeado) => {
  let actorConectado;
  let propietarioEntidad;
  let actorBuzonEliminados;
  await asyncForEach(parametros.notificaciones, async notificacionId => {
    const notificacion = await Notificacion.findById(notificacionId);
    if (!notificacion) throw errorLanzado(404, 'La notificación que intenta eliminar no existe');

    if (usuarioLogeado.autoridad === 'VISITANTE') {
      actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { notificaciones: { $in: [notificacionId] } },
      });
      actorBuzonEliminados = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de eliminados' },
      });
    } else {
      actorConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { notificaciones: { $in: [notificacionId] } },
      });
      actorBuzonEliminados = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de eliminados' },
      });
    }
    if (actorConectado.buzones.length === 0) throw errorLanzado(403, 'Acceso prohibido. Esta notificación no existe en ninguno de tus buzones');
    const buzonEliminados = actorBuzonEliminados.buzones[0];

    const notificacionEnEliminados = await Buzon.findOne({ _id: buzonEliminados._id, notificaciones: { $in: [notificacionId] } });
    if (notificacionEnEliminados) {
      await Buzon.findOneAndUpdate(
        { _id: buzonEliminados._id },
        {
          $pull: { notificaciones: notificacion._id },
        },
        { new: true }
      );
      const buzonesContieneNotificacion = await Buzon.find({ notificaciones: { $in: [notificacionId] } });
      if (buzonesContieneNotificacion.length === 0) await Notificacion.findOneAndDelete(notificacionId);
    } else {
      await asyncForEach(actorConectado.buzones, async buzon => {
        await Buzon.findOneAndUpdate(
          { _id: buzon._id },
          {
            $pull: { notificaciones: notificacion._id },
          },
          { new: true }
        );
      });
      await Buzon.findOneAndUpdate(
        { _id: buzonEliminados._id },
        {
          $push: { notificaciones: notificacion._id },
        },
        { new: true }
      );
    }
  });
  return parametros.notificaciones;
};

exports.enviarNotificacionAutomatica = async function enviarNotificacionAutomatica(parametros) {
  let notificacion;
  let buzonSalida;
  const notificacionesEntrantes = [];
  try {
    parametros.emisorMiembro = await Miembro.findOne({ rol: 'PRESIDENTE' });
    await asyncForEach(parametros.receptoresVisitantes, async receptor => {
      notificacion = new Notificacion(parametros);
      notificacion = await notificacion.save();
      notificacionesEntrantes.push(notificacion);
      const actorBuzonEntrada = await Visitante.findOne({ _id: receptor }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de entrada' },
      });
      const buzonEntrada = actorBuzonEntrada.buzones[0];
      await Buzon.findOneAndUpdate(
        { _id: buzonEntrada._id },
        {
          $push: { notificaciones: notificacion._id },
        },
        { new: true }
      );
    });
    await asyncForEach(parametros.receptoresMiembros, async receptor => {
      notificacion = new Notificacion(parametros);
      notificacion = await notificacion.save();
      notificacionesEntrantes.push(notificacion);
      const actorBuzonEntrada = await Miembro.findOne({ _id: receptor }).populate({
        path: 'buzones',
        match: { nombre: 'Buzón de entrada' },
      });
      const buzonEntrada = actorBuzonEntrada.buzones[0];
      await Buzon.findOneAndUpdate(
        { _id: buzonEntrada._id },
        {
          $push: { notificaciones: notificacion._id },
        },
        { new: true }
      );
    });
    return notificacion;
  } catch (error) {
    if (notificacion) {
      await asyncForEach(parametros.receptoresVisitantes, async receptor => {
        const actorBuzonEntrada = await Visitante.findOne({ _id: receptor }).populate({
          path: 'buzones',
          match: { nombre: 'Buzón de entrada' },
        });
        const buzonEntrada = actorBuzonEntrada.buzones[0];
        for (const not of notificacionesEntrantes) {
          await Buzon.findOneAndUpdate(
            { _id: buzonEntrada._id },
            {
              $pull: { notificaciones: not._id },
            },
            { new: true }
          );
        }
      });
      await asyncForEach(parametros.receptoresMiembros, async receptor => {
        const actorBuzonEntrada = await Miembro.findOne({ _id: receptor }).populate({
          path: 'buzones',
          match: { nombre: 'Buzón de entrada' },
        });
        const buzonEntrada = actorBuzonEntrada.buzones[0];
        for (const not of notificacionesEntrantes) {
          await Buzon.findOneAndUpdate(
            { _id: buzonEntrada._id },
            {
              $pull: { notificaciones: not._id },
            },
            { new: true }
          );
        }
      });
      await Notificacion.findByIdAndDelete(notificacion._id);
      for (const not of notificacionesEntrantes) {
        await Notificacion.findByIdAndDelete(not._id);
      }
    }
    throw error;
  }
};
