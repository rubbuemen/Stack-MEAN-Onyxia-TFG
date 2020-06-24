const express = require('express');
const router = express.Router();
const solicitudMiembroController = require('../controllers/solicitudMiembro.controller');
const auth = require('../middleware/auth');

router.post('/', auth.visitante, (req, res) => solicitudMiembroController.rellenarSolicitudMiembro(req, res));

module.exports = router;
