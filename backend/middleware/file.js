const multer = require('multer');
const formatos = ['image/png', 'image/jpg', 'image/jpeg'];

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, filename);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (formatos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Los formatos aceptados son .png, .jpg o jpeg'));
    }
  },
});

module.exports = upload;
