const express = require('express');
const router = express.Router();
const tramoHorarioController = require('../controllers/tramoHorario.controller');
const auth = require('../middleware/auth');

router.get('/list/:diaEventoId', auth.junta_directiva, (req, res) => tramoHorarioController.getTramosHorariosByDiaId(req, res));
router.post('/:diaEventoId', auth.junta_directiva, (req, res) => tramoHorarioController.addTramoHorarioParaDiaId(req, res));
router.put('/edit/:id', auth.junta_directiva, (req, res) => tramoHorarioController.editarTramoHorario(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => tramoHorarioController.deleteTramoHorario(req, res));

module.exports = router;
