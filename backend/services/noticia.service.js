const { errorLanzado } = require('../util/error.util');
const { Noticia } = require('../models/noticia.model');
const { Miembro } = require('../models/miembro.model');

exports.getNoticias = async () => {
  const noticias = await Noticia.find().populate({ path: 'miembroCreador' });
  return noticias;
};

exports.getNoticiaById = async id => {
  const noticia = await Noticia.findById(id).populate({ path: 'miembroCreador' });
  if (!noticia) throw errorLanzado(404, 'La noticia que intenta visualizar no existe');
  return noticia;
};

exports.crearNoticia = async (parametros, img, usuarioLogeado) => {
  const miembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
  let noticia = new Noticia(parametros);
  if (img) {
    noticia.imagen = {
      data: img.data,
      mimetype: img.mimetype,
      size: img.size,
    };
  }
  noticia.miembroCreador = miembro;
  noticia = await noticia.save();
  return noticia;
};

exports.editarNoticia = async (parametros, img, noticiaId) => {
  const checkExistencia = await Noticia.findById(noticiaId);
  if (!checkExistencia) throw errorLanzado(404, 'La noticia que intenta editar no existe');
  let noticia;
  if (img) {
    noticia = await Noticia.findOneAndUpdate(
      { _id: noticiaId },
      {
        titulo: parametros.titulo,
        cuerpo: parametros.cuerpo,
        imagen: {
          data: img.data,
          mimetype: img.mimetype,
          size: img.size,
        },
      },
      { new: true }
    );
  } else {
    noticia = await Noticia.findOneAndUpdate(
      { _id: noticiaId },
      {
        titulo: parametros.titulo,
        cuerpo: parametros.cuerpo,
      },
      { new: true }
    );
    noticia = await Noticia.findOneAndUpdate(
      { _id: noticia._id },
      {
        $unset: { imagen: 1 },
      },
      { new: true }
    );
  }
  return noticia;
};

exports.eliminarNoticia = async noticiaId => {
  const checkExistencia = await Noticia.findById(noticiaId);
  if (!checkExistencia) throw errorLanzado(404, 'La noticia que intenta eliminar no existe');
  const noticia = await Noticia.findOneAndDelete(noticiaId);
  return noticia;
};
