const { errorLanzado, controlError } = require('../util/error.util');
const noticiaService = require('../services/noticia.service');
const { convertirImagenABase64 } = require('../util/funciones.util');

exports.getNoticias = async (req, res) => {
  try {
    const noticias = await noticiaService.getNoticias();
    return res.status(200).send({ noticias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getNoticiaById = async (req, res) => {
  try {
    const id = req.params.id;
    const noticia = await noticiaService.getNoticiaById(id);
    return res.status(200).send({ noticia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearNoticia = async (req, res) => {
  try {
    const usuarioLogeado = req.cuentaUsuario;
    const { titulo, cuerpo } = req.body;
    const imagen = req.file;
    if (imagen) req.file.data = convertirImagenABase64(imagen);
    if (!titulo || !cuerpo) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const noticia = await noticiaService.crearNoticia(req.body, req.file, usuarioLogeado);
    return res.status(200).send({ noticia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarNoticia = async (req, res) => {
  try {
    const noticiaId = req.params.id;
    const { titulo, cuerpo, hayImagen } = req.body;
    const imagen = req.file;
    if (!imagen && hayImagen === 'true') {
      req.file = undefined;
    } else if (imagen) {
      req.file.data = convertirImagenABase64(imagen);
    } else {
      req.file = undefined;
    }
    if (!titulo || !cuerpo) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const noticia = await noticiaService.editarNoticia(req.body, req.file, noticiaId);
    return res.status(200).send({ noticia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarNoticia = async (req, res) => {
  try {
    const noticiaId = req.params.id;
    const noticia = await noticiaService.eliminarNoticia(noticiaId);
    return res.status(200).send({ noticia });
  } catch (error) {
    return controlError(error, res);
  }
};
