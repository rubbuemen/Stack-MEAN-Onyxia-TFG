const { errorLanzado } = require('../util/error.util');
const { Noticia } = require('../models/noticia.model');
const { Miembro } = require('../models/miembro.model');

exports.getNoticias = async () => {
  const noticias = await Noticia.find().populate({ path: 'miembroCreador' });
  return noticias;
};

exports.crearNoticia = async (parametros, usuarioLogeado) => {
  const miembro = await Miembro.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
  let noticia = new Noticia(parametros);
  noticia.miembroCreador = miembro;
  noticia = await noticia.save();
  return noticia;
};

exports.editarNoticia = async (parametros, noticiaId) => {
  const checkExistencia = await Noticia.findById(noticiaId);
  if (!checkExistencia) throw errorLanzado(404, 'La noticia que intenta editar no existe');
  const noticia = await Noticia.findOneAndUpdate(
    { _id: noticiaId },
    {
      titulo: parametros.titulo,
      cuerpo: parametros.cuerpo,
    },
    { new: true }
  );
  return noticia;
};

exports.eliminarNoticia = async (noticiaId) => {
  const checkExistencia = await Noticia.findById(noticiaId);
  if (!checkExistencia) throw errorLanzado(404, 'La noticia que intenta eliminar no existe');
  const noticia = await Noticia.findOneAndDelete(noticiaId);
  return noticia;
};
