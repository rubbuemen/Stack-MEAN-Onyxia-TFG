const express = require('express');
const router = express.Router();
const solicitudMiembroController = require('../controllers/solicitudMiembro.controller');
const auth = require('../middleware/auth');

router.post('/', auth.visitante, (req, res) => solicitudMiembroController.rellenarSolicitudMiembro(req, res));
router.get('/estado', auth.visitante, (req, res) => solicitudMiembroController.getEstadoSolicitudMiembro(req, res));
router.get('/list', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembros(req, res));
router.get('/listPendientes', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosPendientes(req, res));
router.get('/listAceptadas', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosAceptadas(req, res));
router.get('/listRechazadas', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosRechazadas(req, res));
router.get('/listPagadas', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosPagadas(req, res));
router.get('/listPendientePago', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosNoPagadas(req, res));
router.put('/aceptar/:solicitudMiembroId', auth.presidente, (req, res) => solicitudMiembroController.aceptarSolicitudMiembro(req, res));
router.put('/rechazar/:solicitudMiembroId', auth.presidente, (req, res) => solicitudMiembroController.rechazarSolicitudMiembro(req, res));

module.exports = router;
