const { errorLanzado } = require('../util/error.util');
const { InscripcionEvento } = require('../models/inscripcionEvento.model');
const { Evento } = require('../models/evento.model');
const { Miembro } = require('../models/miembro.model');
const { asyncForEach, calcularEdad } = require('../util/funciones.util');

exports.getInscripcionesByEventoId = async (eventoId) => {
  const evento = await Evento.findById(eventoId).populate({ path: 'inscripcionesEvento', populate: { path: 'miembro' } });
  if (!evento) throw errorLanzado(404, 'La ID del evento indicado no existe');
  return evento.inscripcionesEvento;
};

exports.getInscripcionesPendientesByEventoId = async (eventoId) => {
  const evento = await Evento.findById(eventoId).populate({
    path: 'inscripcionesEvento',
    match: { estadoInscripcion: 'PENDIENTE' },
    populate: { path: 'miembro' },
  });
  if (!evento) throw errorLanzado(404, 'La ID del evento indicado no existe');
  return evento.inscripcionesEvento;
};

exports.getInscripcionesAceptadasByEventoId = async (eventoId) => {
  const evento = await Evento.findById(eventoId).populate({
    path: 'inscripcionesEvento',
    match: { estadoInscripcion: 'ACEPTADO' },
    populate: { path: 'miembro' },
  });
  if (!evento) throw errorLanzado(404, 'La ID del evento indicado no existe');
  return evento.inscripcionesEvento;
};

exports.getMisInscripcionesEventos = async (usuarioLogeado) => {
  const miembroConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
  const inscripcionesEventos = await InscripcionEvento.find({ miembro: miembroConectado._id })
    .populate({ path: 'evento' })
    .populate({ path: 'actividadesInteres' });
  return inscripcionesEventos;
};

exports.getEstadoInscripcionByEventoId = async (eventoId, usuarioLogeado) => {
  const miembroConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
  const evento = await Evento.findById(eventoId);
  if (!evento) throw errorLanzado(404, 'La ID del evento indicado no existe');
  const inscripcionEvento = await InscripcionEvento.findOne({ miembro: miembroConectado._id, evento: evento._id }).populate({ path: 'actividadesInteres' });
  return inscripcionEvento;
};

exports.inscribirseAEvento = async (parametros, eventoId, usuarioLogeado) => {
  let inscripcionEvento;
  let evento;
  let miembroConectado;
  try {
    evento = await Evento.findById(eventoId);
    if (!evento) throw errorLanzado(404, 'El evento al que intenta inscribirse no existe');
    if (!evento.estaPublicado) throw errorLanzado(403, 'El evento al que intenta inscribirse no está aún publicado');
    if (evento.estadoEvento !== 'PENDIENTE') throw errorLanzado(403, 'El evento al que intenta inscribirse no está disponible para inscribirse');
    if (evento.cupoInscripciones === 0) throw errorLanzado(403, 'El evento al que intenta incribirse no tiene plazas disponibles');
    miembroConectado = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    const checkInscripcionEvento = await InscripcionEvento.findOne({ miembro: miembroConectado._id, evento: evento._id });
    if (checkInscripcionEvento) throw errorLanzado(403, 'No te puedes inscribir al evento indicado porque ya has mandado una inscripción');
    if (miembroConectado.cantidadPenalizaciones > 0) throw errorLanzado(403, 'No te puedes inscribir al evento porque tienes penalizaciones');
    const edadMiembro = calcularEdad(miembroConectado.fechaNacimiento);
    if (evento.esFueraSevilla && edadMiembro < 18) throw errorLanzado(403, 'No te puedes inscribir al evento porque es fuera de Sevilla y eres menor de edad');
    if (!parametros.actividadesInteres.every((actividad) => evento.actividadesEvento.includes(actividad)))
      throw errorLanzado(403, 'Hay actividades de las que tienes interés que no están adjudicadas al evento');
    inscripcionEvento = new InscripcionEvento(parametros);
    inscripcionEvento.miembro = miembroConectado;
    inscripcionEvento.evento = evento;
    inscripcionEvento = await inscripcionEvento.save();
    await Evento.findOneAndUpdate(
      { _id: evento._id },
      {
        $push: { inscripcionesEvento: inscripcionEvento._id },
      },
      { new: true }
    );
    await Miembro.findOneAndUpdate(
      { _id: miembroConectado._id },
      {
        $push: { inscripcionesEvento: inscripcionEvento._id },
      },
      { new: true }
    );
    return inscripcionEvento;
  } catch (error) {
    if (inscripcionEvento) {
      const checkInscripcionInEvento = await Evento.findOne({ inscripcionesEvento: { $in: [inscripcionEvento._id] } });
      if (checkInscripcionInEvento) await Evento.updateOne({ _id: evento._id }, { $pull: { inscripcionesEvento: inscripcionEvento._id } });
      const checkInscripcionInMiembro = await Miembro.findOne({ inscripcionesEvento: { $in: [inscripcionEvento._id] } });
      if (checkInscripcionInMiembro) await Miembro.updateOne({ _id: miembroConectado._id }, { $pull: { inscripcionesEvento: inscripcionEvento._id } });
      await InscripcionEvento.findByIdAndDelete(inscripcionEvento._id);
    }
    throw error;
  }
};

exports.aceptarInscripcionEvento = async (inscripcionEventoId) => {
  const checkExistenciaInscripcion = await InscripcionEvento.findById(inscripcionEventoId).populate({ path: 'evento' });
  if (!checkExistenciaInscripcion) throw errorLanzado(404, 'La inscripción al evento que intenta aceptar no existe');
  if (checkExistenciaInscripcion.estadoInscripcion !== 'PENDIENTE')
    throw errorLanzado(403, 'La inscripción al evento que intenta aceptar no puede hacerse porque no está en un estado de pendiente');
  if (checkExistenciaInscripcion.evento.cupoInscripciones === 0)
    throw errorLanzado(403, 'No se puede aceptar la inscripción al evento porque no hay cupos disponibles');
  const inscripcionEvento = await InscripcionEvento.findOneAndUpdate(
    { _id: inscripcionEventoId },
    {
      estadoInscripcion: 'ACEPTADO',
    },
    { new: true }
  );

  await Evento.findByIdAndUpdate(
    { _id: inscripcionEvento.evento._id },
    {
      cupoInscripciones: checkExistenciaInscripcion.evento.cupoInscripciones - 1,
    },
    { new: true }
  );
  const evento = await Evento.findById(inscripcionEvento.evento).populate({ path: 'inscripcionesEvento', match: { estadoInscripcion: 'PENDIENTE' } });
  if (evento.cupoInscripciones === 0) {
    await asyncForEach(evento.inscripcionesEvento, async (inscripcion) => {
      await InscripcionEvento.findOneAndUpdate(
        { _id: inscripcion._id },
        {
          estadoInscripcion: 'RECHAZADO',
        },
        { new: true }
      );
    });
  }
  return inscripcionEvento;
};
