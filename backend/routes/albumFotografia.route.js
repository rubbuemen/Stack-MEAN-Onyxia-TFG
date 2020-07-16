const express = require('express');
const router = express.Router();
const albumFotografiaController = require('../controllers/albumFotografia.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.single('imagen'), auth.junta_superior, (req, res) => albumFotografiaController.crearAlbumFotografias(req, res));
router.put('/edit/:id', auth.junta_superior, (req, res) => albumFotografiaController.editarAlbumFotografias(req, res));
router.delete('/delete/:id', auth.junta_superior, (req, res) => albumFotografiaController.eliminarAlbumFotografias(req, res));
router.get('/list/:eventoId', (req, res) => albumFotografiaController.getAlbumesFotografiasByEventoId(req, res));

module.exports = router;
