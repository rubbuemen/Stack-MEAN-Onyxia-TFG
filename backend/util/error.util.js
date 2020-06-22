const colores = require('colors');

function errorLanzado(codigo, mensaje) {
  const error = new Error();
  error.message = mensaje;
  error.status = codigo;
  return error;
}

function controlError(error, res) {
  if (error.status && error.message) {
    console.error(colores.red('[Error ' + error.status + ']'));
    console.error(colores.red(error.stack));
    return res.status(error.status).send({ error: error.message });
  } else {
    console.error(colores.red(error));
    return res.status(500).send({ error });
  }
}

module.exports.errorLanzado = errorLanzado;
module.exports.controlError = controlError;
