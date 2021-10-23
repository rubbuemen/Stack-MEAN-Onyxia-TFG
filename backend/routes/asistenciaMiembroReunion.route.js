const express = require('express');
const router = express.Router();
const asistenciaMiembroReunionController = require('../controllers/asistenciaMiembroReunion.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.put('/asistencia/:reunionId', upload.none(), auth.aso_miembro, (req, res) => asistenciaMiembroReunionController.marcarAsistenciaReunion(req, res));
router.put('/verificar/:reunionId', upload.none(), auth.presidente, (req, res) =>
  asistenciaMiembroReunionController.verificarAsistenciaMiembrosReunion(req, res)
);
router.get('/asistencias/:reunionId', auth.presidente, (req, res) => asistenciaMiembroReunionController.getAsistenciasReunion(req, res));
router.get('/tieneAsistencia/:reunionId', auth.aso_miembro, (req, res) => asistenciaMiembroReunionController.tieneAsistenciaMarcadaReunion(req, res));

module.exports = router;
