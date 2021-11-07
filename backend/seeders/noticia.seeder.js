const { Seeder } = require('mongoose-data-seed');
const { Noticia } = require('../models/noticia.model');
const fs = require('fs');
const path = require('path');

const data = [
  {
    _id: '617d8fe3116642291cadc431',
    titulo: 'Buscamos nuevos miembros',
    cuerpo: 'Estamos buscando nuevos miembros para unirse a la asociación, ¿te interesa unirte? Puedes buscar más información',
    fechaPublicacion: new Date('2021/10/30 18:33:07'),
    imagen: {
      data: fs.readFileSync(path.resolve(__dirname, '../images/noticia.jpg')),
      mimetype: 'image/jpeg',
      size: '56180',
    },
    miembroCreador: '617d85de116642291cadbb97',
  },
];

class NoticiasSeeder extends Seeder {
  async shouldRun() {
    return Noticia.countDocuments()
      .exec()
      .then(count => count === 0);
  }

  async run() {
    return Noticia.create(data);
  }
}

module.exports.Noticias = NoticiasSeeder;
