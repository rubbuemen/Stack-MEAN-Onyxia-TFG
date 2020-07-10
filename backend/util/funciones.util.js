const fs = require('fs');

exports.convertirImagenABase64 = function convertirImagenABase64(file) {
  const imagen = fs.readFileSync(file.path);
  return imagen;
};

exports.asyncForEach = async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

exports.esHoy = function esHoy(fecha) {
  const hoy = new Date();
  return fecha.getDate() == hoy.getDate() && fecha.getMonth() == hoy.getMonth() && fecha.getFullYear() == hoy.getFullYear();
};

exports.calcularEdad = function calcularEdad(fechaNacimiento) {
  const hoy = new Date();
  let thisYear = 0;
  if (hoy.getMonth() < fechaNacimiento.getMonth()) {
    thisYear = 1;
  } else if (hoy.getMonth() == fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate()) {
    thisYear = 1;
  }
  const edad = hoy.getFullYear() - fechaNacimiento.getFullYear() - thisYear;
  return edad;
};
