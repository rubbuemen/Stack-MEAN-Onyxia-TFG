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
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, descripcion, lugar, cupoInscripciones, esFueraSevilla, actividadesEvento, fecha } = req.body;
    if (!nombre || !descripcion || !lugar || !cupoInscripciones || esFueraSevilla === undefined || !actividadesEvento || !fecha)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (cupoInscripciones < 0) throw errorLanzado(400, 'El cupo de inscripciones no puede ser menor a 0');
    req.body.fecha = new Date(fecha);
    if (req.body.fecha <= new Date()) throw errorLanzado(400, 'La fecha del día del evento insertado no es futuro');
    req.body.estadoEvento = 'PENDIENTE';
    const evento = await eventoService.crearEvento(req.body, usuarioLogeado);
    return res.status(200).send({ evento });
  } catch (error) {
    return controlError(error, res);
  }
};

// exports.editarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const { nombre, descripcion, reglas, enVigor } = req.body;
//     const fotografia = req.file;
//     if (!nombre || !descripcion || !reglas || !enVigor || !fotografia) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
//     req.file.data = convertirImagenABase64(fotografia);
//     const evento = await eventoService.editarEvento(req.body, req.file, eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };

// exports.eliminarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const evento = await eventoService.eliminarEvento(eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };

// exports.publicarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const evento = await eventoService.publicarEvento(eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };

// exports.ocultarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const evento = await eventoService.ocultarEvento(eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };

// exports.descatalogarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const evento = await eventoService.descatalogarEvento(eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };

// exports.catalogarEvento = async (req, res) => {
//   try {
//     const eventoId = req.params.id;
//     const evento = await eventoService.catalogarEvento(eventoId);
//     return res.status(200).send({ evento });
//   } catch (error) {
//     return controlError(error, res);
//   }
// };
