const mongoose = require('mongoose');

const configuracionSchema = new mongoose.Schema({
  modoMantenimiento: {
    type: Boolean,
    required: [true, 'Especifique si el sistema está en modo mantenimiento'],
    default: false,
  },
  ocultarBanners: {
    type: Boolean,
    required: [true, 'Especifique si el sistema está ocultando los banners'],
    default: false,
  },
  bannersPrincipales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Banner',
    },
  ],
});

const configuracion = mongoose.model('Configuracion', configuracionSchema);

module.exports.Configuracion = configuracion;
