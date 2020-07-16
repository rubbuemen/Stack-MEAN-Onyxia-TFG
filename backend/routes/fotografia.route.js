const express = require('express');
const router = express.Router();
const fotografiaController = require('../controllers/fotografia.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/:albumFotografiasId', upload.array('imagenes'), auth.junta_superior, (req, res) => fotografiaController.añadirFotografiasAlbum(req, res));
router.delete('/delete/:id', auth.junta_superior, (req, res) => fotografiaController.eliminarFotografia(req, res));
router.get('/list/:albumFotografiasId', (req, res) => fotografiaController.getFotografiasByAlbumId(req, res));

module.exports = router;
