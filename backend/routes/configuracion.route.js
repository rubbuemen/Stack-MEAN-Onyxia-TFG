const express = require('express');
const router = express.Router();
const configuracionController = require('../controllers/configuracion.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.put('/modoMantenimientoOn', auth.presidente, (req, res) => configuracionController.activarModoMantenimiento(req, res));
router.put('/modoMantenimientoOff', auth.presidente, (req, res) => configuracionController.desactivarModoMantenimiento(req, res));
router.put('/mostrarBanners', auth.presidente, (req, res) => configuracionController.mostrarBanners(req, res));
router.put('/ocultarBanners', auth.presidente, (req, res) => configuracionController.ocultarBanners(req, res));
router.get('/show', auth.presidente, (req, res) => configuracionController.getConfiguracion(req, res));

module.exports = router;
