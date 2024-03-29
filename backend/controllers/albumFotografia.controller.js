const { errorLanzado, controlError } = require('../util/error.util');
const albumFotografiaService = require('../services/albumFotografia.service');
const { convertirImagenABase64 } = require('../util/funciones.util');

exports.getAlbumesFotografiasByEventoId = async (req, res) => {
  try {
    const eventoId = req.params.eventoId;
    const albumesFotografias = await albumFotografiaService.getAlbumesFotografiasByEventoId(eventoId);
    return res.status(200).send({ albumesFotografias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getAlbumesFotografias = async (req, res) => {
  try {
    const albumesFotografias = await albumFotografiaService.getAlbumesFotografias();
    return res.status(200).send({ albumesFotografias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.getAlbumFotografiasById = async (req, res) => {
  try {
    const id = req.params.id;
    const albumFotografias = await albumFotografiaService.getAlbumFotografiasById(id);
    return res.status(200).send({ albumFotografias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.crearAlbumFotografias = async (req, res) => {
  try {
    const { nombre } = req.body;
    const eventoId = req.params.eventoId;
    const imagen = req.file;
    if (!nombre || !imagen) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    req.file.data = convertirImagenABase64(imagen);
    const albumFotografia = await albumFotografiaService.crearAlbumFotografias(req.body, req.file, eventoId);
    return res.status(200).send({ albumFotografia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarAlbumFotografias = async (req, res) => {
  try {
    const albumFotografiaId = req.params.id;
    const { nombre } = req.body;
    if (!nombre) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    const albumFotografia = await albumFotografiaService.editarAlbumFotografias(req.body, albumFotografiaId);
    return res.status(200).send({ albumFotografia });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarAlbumFotografias = async (req, res) => {
  try {
    const albumFotografiaId = req.params.id;
    const albumFotografia = await albumFotografiaService.eliminarAlbumFotografias(albumFotografiaId);
    return res.status(200).send({ albumFotografia });
  } catch (error) {
    return controlError(error, res);
  }
};
