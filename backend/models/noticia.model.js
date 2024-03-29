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
  imagen: {
    type: {
      data: Buffer,
      mimetype: String,
      size: Number,
    },
  },
  fechaPublicacion: {
    type: Date,
    required: [true, 'No se ha asignado ninguna fecha de publicación'],
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
