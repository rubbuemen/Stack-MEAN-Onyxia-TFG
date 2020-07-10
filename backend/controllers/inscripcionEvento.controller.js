const { errorLanzado, controlError } = require('../util/error.util');
const inscripcionEventoService = require('../services/inscripcionEvento.service');

exports.getInscripcionesByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const inscripcionesEvento = await inscripcionEventoService.getInscripcionesByEventoId(eventoId);
    return res.status(200).send({ inscripcionesEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getInscripcionesPendientesByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const inscripcionesEvento = await inscripcionEventoService.getInscripcionesPendientesByEventoId(eventoId);
    return res.status(200).send({ inscripcionesEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getInscripcionesAceptadasByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const inscripcionesEvento = await inscripcionEventoService.getInscripcionesAceptadasByEventoId(eventoId);
    return res.status(200).send({ inscripcionesEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getMisInscripcionesEventos = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const inscripcionesEventos = await inscripcionEventoService.getMisInscripcionesEventos(usuarioLogeado);
    return res.status(200).send({ inscripcionesEventos });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getEstadoInscripcionByEventoId = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const eventoId = req.params.eventoId;
    const inscripcionEvento = await inscripcionEventoService.getEstadoInscripcionByEventoId(eventoId, usuarioLogeado);
    return res.status(200).send({ inscripcionEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.inscribirseAEvento = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    //problemaAlimenticio, tieneCocheDisponible, comentarioAdicional, actividadesInteres opcionales
    const usuarioLogeado = req.cuentaUsuario;
    const inscripcionEvento = await inscripcionEventoService.inscribirseAEvento(req.body, eventoId, usuarioLogeado);
    return res.status(200).send({ inscripcionEvento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.aceptarInscripcionEvento = async (req, res) => {
  try {
    const inscripcionEventoId = req.params.id;
    const inscripcionEvento = await inscripcionEventoService.aceptarInscripcionEvento(inscripcionEventoId);
    return res.status(200).send({ inscripcionEvento });
  } catch (error) {
    return controlError(error, res);
  }
};
