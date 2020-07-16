const mongoose = require('mongoose');

const albumFotografiaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'Inserte un nombre del álbum'],
  },
  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: [true, 'Es obligatorio asignarle un evento al álbum de fotografias'],
  },
  fotografias: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fotografia',
    },
  ],
});

const albumFotografia = mongoose.model('AlbumFotografia', albumFotografiaSchema);

module.exports.AlbumFotografia = albumFotografia;
