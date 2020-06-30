const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: [true, 'El nombre insertado ya existe, inserte otro'],
    required: [true, 'Inserte un nombre'],
  },
  descripcion: {
    type: String,
    required: [true, 'Inserte una descripción'],
  },
  fotografia: {
    type: {
      data: Buffer,
      mimetype: String,
      size: Number,
    },
    required: [true, 'Inserte una fotografía'],
  },
  cantidadDisponible: {
    type: Number,
    min: 0,
    required: [true, 'Inserte una cantidad disponible'],
  },
  cantidadEnUso: {
    type: Number,
    min: 0,
    required: [true, 'Inserte una cantidad en uso'],
  },
  miembroCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro que publica el material'],
  },
  inventarios: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Inventario',
    },
  ],
});

const material = mongoose.model('Material', materialSchema);

module.exports.Material = material;
