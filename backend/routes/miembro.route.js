const express = require('express');
const router = express.Router();
const miembroController = require('../controllers/miembro.controller');
const auth = require('../middleware/auth');

router.put('/penalizar/:miembroId', auth.presidente, (req, res) => miembroController.penalizarMiembro(req, res));

module.exports = router;
