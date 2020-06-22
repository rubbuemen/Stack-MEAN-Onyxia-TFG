const mongoose = require('mongoose');

const miembroSchema = new mongoose.Schema({
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
  numeroSocio: {
    //Como máximo se tendrá que setear un número mayor al número de socio anterior
    type: Number,
    min: 0,
    required: [true, 'Inserte un número de socio'],
    unique: [true, 'El número de socio insertado ya existe, inserte otro'],
  },
  fotografia: {
    type: {
      data: Buffer,
      mimetype: String,
      size: Number,
    },
    required: [true, 'Inserte una fotografía'],
  },
  alias: {
    type: String,
    required: [true, 'Inserte un alias'],
  },
  numeroTelefono: {
    type: String,
    unique: [true, 'El número de teléfono insertado ya existe, inserte otro'],
    match: [/\d{9,10}/, 'El teléfono insertado debe tener 9 o 10 dígitos'],
  },
  direccion: {
    type: String,
    required: [true, 'Inserte una dirección'],
  },
  dni: {
    type: String,
    required: [true, 'Inserte un DNI'],
    validate: {
      validator: (dni) => {
        const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        const nifRexp = /^\d{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        const nieRexp = /^[XYZ]\d{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        dni = dni.toString().toUpperCase();
        if (!nifRexp.test(dni) && !nieRexp.test(dni)) return false;
        const nie = dni.replace(/^[X]/, '0').replace(/^[Y]/, '1').replace(/^[Z]/, '2');
        const letra = dni.substr(-1);
        const charIndex = parseInt(nie.substr(0, 8)) % 23;
        if (validChars.charAt(charIndex) === letra) return true;
        return false;
      },
      message: 'El DNI insertado no mantiene el formato nacional NNNNNNNNL, el formato extrangero LNNNNNNNL o simplemente no es válido',
    },
  },
  aficiones: {
    type: String,
    required: [true, 'Inserte unas aficiones'],
  },
  tieneCochePropio: {
    type: Boolean,
    required: [true, 'Especifique si tiene coche propio'],
    default: false,
  },
  rol: {
    type: String,
    required: [true, 'Especifique el rol del miembro'],
    enum: ['ESTANDAR', 'VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE'],
  },
  estaDeAlta: {
    type: Boolean,
    required: [true, 'Especifique si el miembro está de alta'],
    default: true,
  },
  fechaAlta: {
    type: Date,
    required: [true, 'No se ha asignado ninguna fecha de alta del miembro'],
    validate: {
      validator: (fechaAlta) => {
        return fechaAlta < new Date();
      },
      message: 'Inserte una fecha de alta en pasado',
    },
    default: Date.now,
  },
  cantidadPenalizaciones: {
    type: Number,
    min: 0,
    required: [true, 'Inserte un de penalizaciones'],
    default: 0,
  },
  fechaUltimaPenalizacion: {
    type: Date,
    validate: {
      validator: (fechaUltimaPenalizacion) => {
        return fechaUltimaPenalizacion < new Date();
      },
      message: 'Inserte una fecha de penalización en pasado',
    },
  },
  cuentaUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CuentaUsuario',
    required: [true, 'Es obligatorio asignar una cuenta de usuario al miembro'],
  },
  redSocials: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RedSocial',
    },
  ],
});

const miembro = mongoose.model('Miembro', miembroSchema);

module.exports.Miembro = miembro;
