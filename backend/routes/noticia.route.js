const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticia.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.single('imagen'), auth.junta_superior, (req, res) => noticiaController.crearNoticia(req, res));
router.put('/edit/:id', upload.single('imagen'), auth.junta_superior, (req, res) => noticiaController.editarNoticia(req, res));
router.delete('/delete/:id', auth.junta_superior, (req, res) => noticiaController.eliminarNoticia(req, res));
router.get('/list', (req, res) => noticiaController.getNoticias(req, res));
router.get('/:id', (req, res) => noticiaController.getNoticiaById(req, res));

module.exports = router;
