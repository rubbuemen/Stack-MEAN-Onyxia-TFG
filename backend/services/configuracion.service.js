const { errorLanzado } = require('../util/error.util');
const { Configuracion } = require('../models/configuracion.model');
const { Miembro } = require('../models/miembro.model');

exports.getConfiguracion = async () => {
  const configuracion = await Configuracion.findOne();
  return configuracion;
};

exports.activarModoMantenimiento = async () => {
  let configuracion = await Configuracion.findOne();
  if (configuracion.modoMantenimiento) throw errorLanzado(403, 'El modo mantenimiento ya está activado');
  configuracion = await Configuracion.findOneAndUpdate(
    { _id: configuracion._id },
    {
      modoMantenimiento: true,
    },
    { new: true }
  );
  return configuracion;
};

exports.desactivarModoMantenimiento = async () => {
  let configuracion = await Configuracion.findOne();
  if (!configuracion.modoMantenimiento) throw errorLanzado(403, 'El modo mantenimiento ya está desactivado');
  configuracion = await Configuracion.findOneAndUpdate(
    { _id: configuracion._id },
    {
      modoMantenimiento: false,
    },
    { new: true }
  );
  return configuracion;
};

exports.mostrarBanners = async () => {
  let configuracion = await Configuracion.findOne();
  if (!configuracion.ocultarBanners) throw errorLanzado(403, 'La muestra de banners ya está activa');
  configuracion = await Configuracion.findOneAndUpdate(
    { _id: configuracion._id },
    {
      ocultarBanners: false,
    },
    { new: true }
  );
  return configuracion;
};

exports.ocultarBanners = async () => {
  let configuracion = await Configuracion.findOne();
  if (configuracion.ocultarBanners) throw errorLanzado(403, 'La ocultación de banners ya está activa');
  configuracion = await Configuracion.findOneAndUpdate(
    { _id: configuracion._id },
    {
      ocultarBanners: true,
    },
    { new: true }
  );
  return configuracion;
};
