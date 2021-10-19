const express = require('express');
const router = express.Router();
const actividadMiembroTramoController = require('../controllers/actividadMiembroTramo.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/list/:eventoId', auth.junta_directiva, (req, res) => actividadMiembroTramoController.getHorariosByEventoId(req, res));
router.post('/:eventoId', upload.none(), auth.junta_directiva, (req, res) => actividadMiembroTramoController.addHorarioParaEventoId(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => actividadMiembroTramoController.deleteHorario(req, res));

module.exports = router;
