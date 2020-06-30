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
