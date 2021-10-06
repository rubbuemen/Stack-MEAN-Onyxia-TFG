const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.none(), auth.actor_registrado, (req, res) => notificacionController.enviarNotificacion(req, res));
router.put('/mover', upload.none(), auth.actor_registrado, (req, res) => notificacionController.moverNotificaciones(req, res));
router.put('/eliminar', upload.none(), auth.actor_registrado, (req, res) => notificacionController.eliminarNotificaciones(req, res));
router.get('/:id', auth.actor_registrado, (req, res) => notificacionController.getNotificacion(req, res));
router.get('/list/:buzonId', auth.actor_registrado, (req, res) => notificacionController.getNotificacionesByBuzonId(req, res));
router.get('/list/leidos/:buzonId', auth.actor_registrado, (req, res) => notificacionController.getNotificacionesNoLeidasByBuzonId(req, res));

module.exports = router;
