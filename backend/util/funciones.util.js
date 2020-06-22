var fs = require('fs');

function convertirImagenABase64(file) {
  const imagen = fs.readFileSync(file.path);
  return imagen;
}

module.exports = convertirImagenABase64;
