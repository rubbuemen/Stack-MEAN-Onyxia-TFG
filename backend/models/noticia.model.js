const mongoose = require('mongoose');

const noticiaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'Inserte un título para la noticia'],
  },
  cuerpo: {
    type: String,
    required: [true, 'Inserte un cuerpo para la noticia'],
  },
  fechaPublicacion: {
    type: Date,
    required: [true, 'No se ha asignado ninguna fecha de publicación'],
    validate: {
      validator: (fechaAlta) => {
        return fechaAlta < new Date();
      },
      message: 'Inserte una fecha de publicación en pasado',
    },
    default: Date.now,
  },
  miembroCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Miembro',
    required: [true, 'Es obligatorio asignar un miembro que publica la noticia'],
  },
});

const noticia = mongoose.model('Noticia', noticiaSchema);

module.exports.Noticia = noticia;
