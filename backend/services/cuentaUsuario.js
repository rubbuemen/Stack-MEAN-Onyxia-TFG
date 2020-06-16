const errorLanzado = require('../util/error');
const { CuentaUsuario } = require('../models/cuentaUsuario');

exports.getUsuarioLogeado = async (usuario) => {
  const resultado = await CuentaUsuario.findOne({ usuario: usuario });
  if (!resultado) throw errorLanzado(404, 'El usuario introducido no existe');
  if (!resultado.estado) throw errorLanzado(403, 'El usuario introducido está baneado');
  return resultado;
};
