const mongoose = require('mongoose');

const inventarioSchema = new mongoose.Schema({
  estadoMaterial: {
    type: String,
    required: [true, 'Especifique el estado del material'],
    enum: ['OPERATIVO', 'DETERIORADO', 'DESCATALOGADO'],
  },
  esPropio: {
    type: Boolean,
    required: [true, 'Especifique si el material es propio'],
    default: true,
  },
});

const inventario = mongoose.model('Inventario', inventarioSchema);

module.exports.Inventario = inventario;
