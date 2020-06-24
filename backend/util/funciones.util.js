var fs = require('fs');

function convertirImagenABase64(file) {
  const imagen = fs.readFileSync(file.path);
  return imagen;
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

module.exports = convertirImagenABase64;
module.exports = asyncForEach;
