const { errorLanzado, controlError } = require('../util/error.util');
const bannerService = require('../services/banner.service');
const { convertirImagenABase64 } = require('../util/funciones.util');

exports.getBanners = async (req, res) => {
  try {
    const banners = await bannerService.getBanners();
    return res.status(200).send({ banners });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.añadirBanner = async (req, res) => {
  try {
    const imagen = req.file;
    req.body.orden = (await bannerService.getUltimoNumeroOrden()) + 1;
    req.file.data = convertirImagenABase64(imagen);
    const banners = await bannerService.añadirBanner(req.body, req.file);
    return res.status(200).send({ banners });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.editarBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const { orden } = req.body;
    if (!orden) throw errorLanzado(400, 'Hay datos obligatorios del formulario que no se han enviado');
    if (orden < 1) throw errorLanzado(400, 'El número del orden debe ser mayor que 0');
    const ultimoNumeroOrden = await bannerService.getUltimoNumeroOrden();
    if (orden <= ultimoNumeroOrden)
      throw errorLanzado(400, 'El número en el orden no puede ser menor que el número del último del orden: ' + ultimoNumeroOrden);
    const banners = await bannerService.editarBanner(req.body, bannerId);
    return res.status(200).send({ banners });
  } catch (error) {
    return controlError(error, res);
  }
};

exports.eliminarBanner = async (req, res) => {
  try {
    const bannerId = req.params.id;
    const banner = await bannerService.eliminarBanner(bannerId);
    return res.status(200).send({ banner });
  } catch (error) {
    return controlError(error, res);
  }
};
