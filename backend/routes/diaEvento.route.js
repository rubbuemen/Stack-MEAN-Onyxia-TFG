const express = require('express');
const router = express.Router();
const diaEventoController = require('../controllers/diaEvento.controller');
const auth = require('../middleware/auth');

router.get('/list/:eventoId', (req, res) => diaEventoController.getDiasByEventoId(req, res));
router.get('/:id', (req, res) => diaEventoController.getDiaEvento(req, res));
router.get('/tramoHorario/:tramoHorarioId', (req, res) => diaEventoController.getDiaEventoPorTramoHorarioId(req, res));
router.post('/:eventoId', auth.junta_directiva, (req, res) => diaEventoController.addDiaParaEventoId(req, res));
router.delete('/:eventoId', auth.junta_directiva, (req, res) => diaEventoController.deleteDiaParaEventoId(req, res));

module.exports = router;
