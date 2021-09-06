const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/evento.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.single('imagen'), auth.junta_directiva, (req, res) => eventoController.crearEvento(req, res));
router.put('/edit/:id', upload.single('imagen'), auth.junta_directiva, (req, res) => eventoController.editarEvento(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => eventoController.eliminarEvento(req, res));
router.put('/publicar/:id', auth.junta_directiva, (req, res) => eventoController.publicarEvento(req, res));
router.put('/ocultar/:id', auth.junta_directiva, (req, res) => eventoController.ocultarEvento(req, res));
router.put('/cancelar/:id', auth.junta_directiva, (req, res) => eventoController.cancelarEvento(req, res));
router.get('/listPub', (req, res) => eventoController.getEventosPublicos(req, res));
router.get('/:id', (req, res) => eventoController.getEvento(req, res));
router.get('/list', auth.junta_directiva, (req, res) => eventoController.getEventos(req, res));

module.exports = router;
