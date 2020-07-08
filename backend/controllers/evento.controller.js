const { errorLanzado, controlError } = require('../util/error.util');
const eventoService = require('../services/evento.service');

exports.getEventosPublicos = async (req, res) => {
  try {
    const eventos = await eventoService.getEventosPublicos();
    return res.status(200).send({ eventos });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getEventos = async (req, res) => {
  try {
    const eventos = await eventoService.getEventos();
    return res.status(200).send({ eventos });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearEvento = async (req, res) => {
  // Se añade una fecha de día de evento, se podrá añadir más una vez creado
  // Se añade un tramo horario, se podrá añadir más una vez creado
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, descripcion, lugar, cupoInscripciones, esFueraSevilla, actividadesEvento, fecha, horaInicio, horaFin } = req.body;
    if (!nombre || !descripcion || !lugar || !cupoInscripciones || esFueraSevilla === undefined || !actividadesEvento || !fecha || !horaInicio || !horaFin)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (cupoInscripciones < 0) throw errorLanzado(400, 'El cupo de inscripciones no puede ser menor a 0');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaInicio)) throw errorLanzado(400, 'La hora de inicio del tramo horario no mantiene el formato hh:mm');
    if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(horaFin)) throw errorLanzado(400, 'La hora de fin del tramo horario no mantiene el formato hh:mm');
    if (horaInicio >= horaFin) throw errorLanzado(400, 'La hora de inicio debe ser anterior a la hora de fin del tramo horario');
    req.body.fecha = new Date(fecha);
    if (req.body.fecha <= new Date()) throw errorLanzado(400, 'La fecha del día del evento insertado no es futuro');
    req.body.estadoEvento = 'PENDIENTE';
    const evento = await eventoService.crearEvento(req.body, usuarioLogeado);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const { nombre, descripcion, lugar, cupoInscripciones, actividadesEvento } = req.body;
    if (!nombre || !descripcion || !lugar || !cupoInscripciones || !actividadesEvento)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const evento = await eventoService.editarEvento(req.body, eventoId);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const evento = await eventoService.eliminarEvento(eventoId);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.publicarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const evento = await eventoService.publicarEvento(eventoId);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.ocultarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const evento = await eventoService.ocultarEvento(eventoId);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.cancelarEvento = async (req, res) => {
  try {
    const eventoId = req.params.id;
    const evento = await eventoService.cancelarEvento(eventoId);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

// exports.catalogarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const evento = await eventoService.catalogarEvento(eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };
