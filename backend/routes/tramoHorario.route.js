const express = require('express');
const router = express.Router();
const tramoHorarioController = require('../controllers/tramoHorario.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/list/:diaEventoId', (req, res) => tramoHorarioController.getTramosHorariosByDiaId(req, res));
router.get('/:id', (req, res) => tramoHorarioController.getTramoHorario(req, res));
router.post('/:diaEventoId', upload.none(), auth.junta_directiva, (req, res) => tramoHorarioController.addTramoHorarioParaDiaId(req, res));
router.put('/edit/:id', upload.none(), auth.junta_directiva, (req, res) => tramoHorarioController.editarTramoHorario(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => tramoHorarioController.deleteTramoHorario(req, res));

module.exports = router;
