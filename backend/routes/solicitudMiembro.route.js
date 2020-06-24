const express = require('express');
const router = express.Router();
const solicitudMiembroController = require('../controllers/solicitudMiembro.controller');
const auth = require('../middleware/auth');

router.post('/', auth.visitante, (req, res) => solicitudMiembroController.rellenarSolicitudMiembro(req, res));
router.get('/estado', auth.visitante, (req, res) => solicitudMiembroController.getEstadoSolicitudMiembro(req, res));

module.exports = router;
