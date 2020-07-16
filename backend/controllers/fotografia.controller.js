const { errorLanzado, controlError } = require('../util/error.util');
const fotografiaService = require('../services/fotografia.service');
const { convertirImagenABase64 } = require('../util/funciones.util');

exports.getFotografiasByAlbumId = async (req, res) => {
  try {
    const albumFotografiasId = req.params.albumFotografiasId;
    const fotografias = await fotografiaService.getFotografiasByAlbumId(albumFotografiasId);
    return res.status(200).send({ fotografias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.añadirFotografiasAlbum = async (req, res) => {
  try {
    const albumFotografiasId = req.params.albumFotografiasId;
    const imagenes = req.files;
    if (imagenes.length === 0) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    for (let i = 0; i < imagenes.length; i++) {
      req.files[i].data = convertirImagenABase64(req.files[i]);
    }
    const fotografias = await fotografiaService.añadirFotografiasAlbum(req.files, albumFotografiasId);
    return res.status(200).send({ fotografias });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarFotografia = async (req, res) => {
  try {
    const fotografiaId = req.params.id;
    const fotografia = await fotografiaService.eliminarFotografia(fotografiaId);
    return res.status(200).send({ fotografia });
  } catch (error) {
    return controlError(error, res);
  }
};
