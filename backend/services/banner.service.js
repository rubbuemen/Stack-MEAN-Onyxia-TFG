const { errorLanzado } = require('../util/error.util');
const { Banner } = require('../models/banner.model');
const { Configuracion } = require('../models/configuracion.model');

exports.getBanners = async () => {
  const banners = await Banner.find();
  return banners;
};

exports.añadirBanner = async (parametros, img) => {
  let banner = new Banner(parametros);
  banner.imagen = {
    data: img.data,
    mimetype: img.mimetype,
    size: img.size,
  };
  banner = await banner.save();
  const configuracion = await Configuracion.findOne();
  await Configuracion.findOneAndUpdate(
    { _id: configuracion._id },
    {
      $push: { bannersPrincipales: banner._id },
    },
    { new: true }
  );
  return banner;
};

exports.getUltimoNumeroOrden = async () => {
  let ultimoNumeroOrden;
  const banner = await Banner.findOne().sort({ orden: -1 }).limit(1);
  if (!banner) ultimoNumeroOrden = 0;
  else ultimoNumeroOrden = banner.orden;
  return ultimoNumeroOrden;
};

exports.editarBanner = async (parametros, bannerId) => {
  const checkExistencia = await Banner.findById(bannerId);
  if (!checkExistencia) throw errorLanzado(404, 'La banner que intenta editar no existe');
  const banner = await Banner.findOneAndUpdate(
    { _id: bannerId },
    {
      orden: parametros.orden,
      texto: parametros.texto,
    },
    { new: true }
  );
  return banner;
};

exports.eliminarBanner = async (bannerId) => {
  const checkExistencia = await Banner.findById(bannerId);
  if (!checkExistencia) throw errorLanzado(404, 'La banner que intenta eliminar no existe');
  const banner = await Banner.findOneAndDelete(bannerId);
  return banner;
};
