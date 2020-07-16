const { errorLanzado } = require('../util/error.util');
const { AlbumFotografia } = require('../models/albumFotografia.model');
const { Fotografia } = require('../models/fotografia.model');
const { Evento } = require('../models/evento.model');
const { asyncForEach } = require('../util/funciones.util');

exports.getAlbumesFotografiasByEventoId = async (eventoId) => {
  const albumesFotografias = await AlbumFotografia.find({ evento: eventoId }).populate({ path: 'fotografias' });
  return albumesFotografias;
};

exports.crearAlbumFotografias = async (parametros, imagen) => {
  const checkEventoExistente = await Evento.findById(parametros.evento);
  if (!checkEventoExistente) throw errorLanzado(404, 'El evento que ha seleccionado no existe');
  if (checkEventoExistente.estadoEvento !== 'REALIZADO')
    throw errorLanzado(403, 'No se puede crear un álbum de fotografias para este evento porque no se ha realizado');
  let fotografia = new Fotografia();
  fotografia.imagen = {
    data: imagen.data,
    mimetype: imagen.mimetype,
    size: imagen.size,
  };
  fotografia = await fotografia.save();
  let albumFotografia = new AlbumFotografia(parametros);
  albumFotografia.fotografias = [fotografia._id];
  albumFotografia = await albumFotografia.save();
  return albumFotografia;
};

exports.editarAlbumFotografias = async (parametros, albumFotografiaId) => {
  const checkExistencia = await AlbumFotografia.findById(albumFotografiaId);
  if (!checkExistencia) throw errorLanzado(404, 'El álbum de fotografías que intenta editar no existe');
  const checkEventoExistente = await Evento.findById(parametros.evento);
  if (!checkEventoExistente) throw errorLanzado(404, 'El evento que ha seleccionado no existe');
  if (checkEventoExistente.estadoEvento !== 'REALIZADO')
    throw errorLanzado(403, 'No se puede editar el álbum de fotografias para asociarlo a este evento porque no se ha realizado');
  const albumFotografia = await AlbumFotografia.findOneAndUpdate(
    { _id: albumFotografiaId },
    {
      nombre: parametros.nombre,
      evento: parametros.evento,
    },
    { new: true }
  );
  return albumFotografia;
};

exports.eliminarAlbumFotografias = async (albumFotografiaId) => {
  const checkExistencia = await AlbumFotografia.findById(albumFotografiaId);
  if (!checkExistencia) throw errorLanzado(404, 'El álbum de fotografías que intenta eliminar no existe');
  await asyncForEach(checkExistencia.fotografias, async (fotografia) => {
    await Fotografia.findByIdAndDelete(fotografia);
  });
  const albumFotografia = await AlbumFotografia.findOneAndDelete(albumFotografiaId);
  return albumFotografia;
};
