const express = require('express');
const router = express.Router();
const eventoController = require('../controllers/evento.controller');
const auth = require('../middleware/auth');

router.post('/', auth.junta_directiva, (req, res) => eventoController.crearEvento(req, res));
router.put('/edit/:id', auth.junta_directiva, (req, res) => eventoController.editarEvento(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => eventoController.eliminarEvento(req, res));
router.put('/publicar/:id', auth.junta_directiva, (req, res) => eventoController.publicarEvento(req, res));
router.put('/ocultar/:id', auth.junta_directiva, (req, res) => eventoController.ocultarEvento(req, res));
// router.put('/descatalogar/:id', auth.junta_directiva, (req, res) => eventoController.descatalogarEvento(req, res));
// router.put('/catalogar/:id', auth.junta_directiva, (req, res) => eventoController.catalogarEvento(req, res));
router.get('/listPub', (req, res) => eventoController.getEventosPublicos(req, res));
router.get('/list', auth.junta_directiva, (req, res) => eventoController.getEventos(req, res));

//HACER MÉTODO PARA AÑADIR DÍAS DE EVENTOS Y TRAMOS AL EVENTO
//Cancelar evento

module.exports = router;
