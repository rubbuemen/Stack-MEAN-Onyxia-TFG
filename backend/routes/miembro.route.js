const express = require('express');
const router = express.Router();
const miembroController = require('../controllers/miembro.controller');
const auth = require('../middleware/auth');

router.put('/penalizar/:miembroId', auth.presidente, (req, res) => miembroController.penalizarMiembro(req, res));
router.get('/list', auth.aso_miembro, (req, res) => miembroController.getMiembrosVigentes(req, res));
router.get('/juntaSuperior', (req, res) => miembroController.getMiembrosJuntaSuperior(req, res));
router.get('/juntaVocales', (req, res) => miembroController.getMiembrosJuntaVocales(req, res));
router.put('/darBaja/:miembroId', auth.secretario_presidente, (req, res) => miembroController.darBajaMiembro(req, res));
router.put('/darAltaExMiembro/:miembroId', auth.secretario_presidente, (req, res) => miembroController.darAltaExMiembro(req, res));

module.exports = router;
