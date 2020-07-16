const { errorLanzado } = require('../util/error.util');
const { AlbumFotografia } = require('../models/albumFotografia.model');
const { Fotografia } = require('../models/fotografia.model');
const { asyncForEach } = require('../util/funciones.util');

exports.getFotografiasByAlbumId = async (albumFotografiasId) => {
  const albumFotografias = await AlbumFotografia.findById(albumFotografiasId).populate({ path: 'fotografias' });
  return albumFotografias.fotografias;
};

exports.añadirFotografiasAlbum = async (imagenes, albumFotografiasId) => {
  const checkExistencia = await AlbumFotografia.findById(albumFotografiasId);
  if (!checkExistencia) throw errorLanzado(404, 'El álbum de fotografías al que intenta añadir fotografías no existe');
  const fotografias = [];
  await asyncForEach(imagenes, async (img) => {
    let fotografia = new Fotografia();
    fotografia.imagen = {
      data: img.data,
      mimetype: img.mimetype,
      size: img.size,
    };
    fotografia = await fotografia.save();
    await AlbumFotografia.findOneAndUpdate(
      { _id: albumFotografiasId },
      {
        $push: { fotografias: fotografia._id },
      },
      { new: true }
    );
    fotografias.push(fotografia);
  });
  return fotografias;
};

exports.eliminarFotografia = async (fotografiaId) => {
  const checkExistencia = await Fotografia.findById(fotografiaId);
  if (!checkExistencia) throw errorLanzado(404, 'La fotografía que intenta eliminar no existe');
  const album = await AlbumFotografia.findOne({ fotografias: { $in: [fotografiaId] } });
  await AlbumFotografia.updateOne({ _id: album._id }, { $pull: { fotografias: fotografiaId } });
  const fotografia = await Fotografia.findOneAndDelete(fotografiaId);
  return fotografia;
};
