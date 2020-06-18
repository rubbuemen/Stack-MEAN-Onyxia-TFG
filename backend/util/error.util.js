function errorLanzado(codigo, mensaje) {
  const error = new Error();
  error.message = mensaje;
  error.status = codigo;
  return error;
}

module.exports = errorLanzado;
