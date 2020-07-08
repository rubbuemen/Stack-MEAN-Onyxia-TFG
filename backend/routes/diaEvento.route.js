const express = require('express');
const router = express.Router();
const diaEventoController = require('../controllers/diaEvento.controller');
const auth = require('../middleware/auth');

router.get('/list/:eventoId', auth.junta_directiva, (req, res) => diaEventoController.getDiasByEventoId(req, res));
router.post('/:eventoId', auth.junta_directiva, (req, res) => diaEventoController.addDiaParaEventoId(req, res));
router.delete('/:eventoId', auth.junta_directiva, (req, res) => diaEventoController.deleteDiaParaEventoId(req, res));

module.exports = router;
