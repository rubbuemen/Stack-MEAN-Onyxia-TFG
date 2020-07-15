const express = require('express');
const router = express.Router();
const asistenciaMiembroReunionController = require('../controllers/asistenciaMiembroReunion.controller');
const auth = require('../middleware/auth');

router.put('/asistencia/:reunionId', auth.aso_miembro, (req, res) => asistenciaMiembroReunionController.marcarAsistenciaReunion(req, res));
router.put('/verificar/:miembroId/:reunionId', auth.presidente, (req, res) => asistenciaMiembroReunionController.verificarAsistenciaMiembroReunion(req, res));
router.get('/asistencias/:reunionId', auth.presidente, (req, res) => asistenciaMiembroReunionController.getAsistenciasReunion(req, res));

module.exports = router;
