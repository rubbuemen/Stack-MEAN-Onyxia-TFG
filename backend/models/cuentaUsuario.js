const mongoose = require('mongoose');

const cuentaUsuarioSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: [true, 'Inserte un usuario'],
    unique: [true, 'El usuario insertado ya existe, inserte otro usuario'],
    minlength: [5, 'El usuario insertado contiene menos de 5 caracteres, introduzca un usuario que contenga entre 5 y 32 caracteres'],
    maxlength: [32, 'El usuario insertado contiene más de 32 caracteres, introduzca un usuario que contenga entre 5 y 32 caracteres'],
  },
  contraseña: {
    type: String,
    required: [true, 'Inserte una contraseña'],
    minlength: [5, 'La contraseña insertada contiene menos de 5 caracteres, introduzca un usuario que contenga entre 5 y 32 caracteres'],
    maxlength: [32, 'La contraseña insertada contiene más de 32 caracteres, introduzca un usuario que contenga entre 5 y 32 caracteres'],
  },
  autoridad: {
    type: String,
    required: [true, 'No se ha asignado ninguna autoridad a la cuenta de usuario'],
    enum: ['VISITANTE', 'MIEMBRO', 'VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE'],
  },
  estado: {
    type: Boolean,
    required: [true, 'No se ha asignado ningún estado de la cuenta de usuario'],
    default: true,
  },
  fechaCreacion: {
    type: Date,
    required: [true, 'No se ha asignado ninguna fecha de creación de la cuenta de usuario'],
    default: Date.now,
  },
});

const cuentaUsuario = mongoose.model('CuentaUsuario', cuentaUsuarioSchema);

module.exports.CuentaUsuario = cuentaUsuario;
