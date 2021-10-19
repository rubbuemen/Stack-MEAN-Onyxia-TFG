const { errorLanzado, controlError } = require('../util/error.util');
const actividadService = require('../services/actividad.service');
const eventoService = require('../services/actividad.service');

const { convertirImagenABase64 } = require('../util/funciones.util');

exports.getActividadesPublicas = async (req, res) => {
  try {
    const actividades = await actividadService.getActividadesPublicas();
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividadesPublicasEnVigor = async (req, res) => {
  try {
    const actividades = await actividadService.getActividadesPublicasEnVigor();
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividadesEnVigor = async (req, res) => {
  try {
    const actividades = await actividadService.getActividadesEnVigor();
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividadesPublicasPorEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const actividades = await eventoService.getActividadesPublicasPorEventoId(eventoId);
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividadesPorEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const actividades = await eventoService.getActividadesPorEventoId(eventoId);
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const actividad = await actividadService.getActividad(actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getActividades = async (req, res) => {
  try {
    const actividades = await actividadService.getActividades();
    return res.status(200).send({ actividades });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearActividad = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { nombre, descripcion, reglas, enVigor } = req.body;
    const fotografia = req.file;
    if (!nombre || !descripcion || !reglas || enVigor === undefined || !fotografia)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    req.file.data = convertirImagenABase64(fotografia);
    const actividad = await actividadService.crearActividad(req.body, req.file, usuarioLogeado);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const { nombre, descripcion, reglas, enVigor, estaPublicado, materiales } = req.body;
    if (materiales === undefined) req.body.materiales = [];
    const fotografia = req.file;
    if (!nombre || !descripcion || !reglas || enVigor === undefined || estaPublicado === undefined)
      throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (fotografia) {
      req.file.data = convertirImagenABase64(fotografia);
    } else {
      req.file = undefined; // Para el caso que se ha editado pero no se ha cambiado la imagen
    }
    const actividad = await actividadService.editarActividad(req.body, req.file, actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const actividad = await actividadService.eliminarActividad(actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.publicarActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const actividad = await actividadService.publicarActividad(actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.ocultarActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const actividad = await actividadService.ocultarActividad(actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.descatalogarActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const actividad = await actividadService.descatalogarActividad(actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.catalogarActividad = async (req, res) => {
  try {
    const actividadId = req.params.id;
    const actividad = await actividadService.catalogarActividad(actividadId);
    return res.status(200).send({ actividad });
  } catch (error) {
    return controlError(error, res);
  }
};
