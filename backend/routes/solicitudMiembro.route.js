const express = require('express');
const router = express.Router();
const solicitudMiembroController = require('../controllers/solicitudMiembro.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/list', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembros(req, res));
router.get('/listAceptadas', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosAceptadas(req, res));
router.get('/listRechazadas', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosRechazadas(req, res));
router.get('/listPagadas', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosPagadas(req, res));
router.get('/listPendientePago', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosNoPagadas(req, res));
router.get('/listPendientes', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudesMiembrosPendientes(req, res));
router.get('/', auth.actor_registrado, (req, res) => solicitudMiembroController.getMiSolicitudMiembro(req, res));
router.get('/display/:id', auth.presidente, (req, res) => solicitudMiembroController.getSolicitudMiembroById(req, res));
router.get('/:actorId', auth.secretario_presidente, (req, res) => solicitudMiembroController.getSolicitudMiembroByActorId(req, res));
router.post('/', upload.none(), auth.visitante, (req, res) => solicitudMiembroController.rellenarSolicitudMiembro(req, res));
router.put('/aceptar/:solicitudMiembroId', auth.presidente, (req, res) => solicitudMiembroController.aceptarSolicitudMiembro(req, res));
router.put('/rechazar/:solicitudMiembroId', auth.presidente, (req, res) => solicitudMiembroController.rechazarSolicitudMiembro(req, res));
router.put('/establecerPagado/:solicitudMiembroId', auth.presidente, (req, res) => solicitudMiembroController.establecerPagadoSolicitudMiembro(req, res));
router.put('/pagoAutomatico/:solicitudMiembroId', upload.none(), auth.visitante, (req, res) =>
  solicitudMiembroController.pagarAutomaticoSolicitudMiembro(req, res)
);

module.exports = router;
