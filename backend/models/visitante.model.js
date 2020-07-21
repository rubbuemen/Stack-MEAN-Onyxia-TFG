const mongoose = require('mongoose');

const visitanteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Inserte un nombre'],
  },
  apellidos: {
    type: String,
    required: [true, 'Inserte unos apellidos'],
  },
  fechaNacimiento: {
    type: Date,
    validate: {
      validator: (fechaNacimiento) => {
        return fechaNacimiento < new Date();
      },
      message: 'Inserte una fecha de nacimiento en pasado',
    },
    required: [true, 'Inserte su fecha de nacimiento'],
  },
  correoElectronico: {
    type: String,
    required: [true, 'Inserte un correo electrónico'],
    lowercase: true,
    unique: [true, 'El correo electrónico insertado ya existe, inserte otro'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'El correo electrónico insertado no mantiene el formato x@y.z'],
  },
  alias: {
    type: String,
  },
  numeroTelefono: {
    type: String,
    unique: [true, 'El número de teléfono insertado ya existe, inserte otro'],
    match: [/\d{9,10}/, 'El teléfono insertado debe tener 9 o 10 dígitos'],
  },
  cuentaUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaUsuario',
    required: [true, 'Es obligatorio asignar una cuenta de usuario al visitante'],
  },
  redSocials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RedSocial',
    },
  ],
  solicitudMiembro: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SolicitudMiembro',
  },
  buzones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Buzon',
    },
  ],
});

const visitante = mongoose.model('Visitante', visitanteSchema);

module.exports.Visitante = visitante;
