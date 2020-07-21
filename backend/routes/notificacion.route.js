const express = require('express');
const router = express.Router();
const notificacionController = require('../controllers/notificacion.controller');
const auth = require('../middleware/auth');

router.post('/', auth.actor_registrado, (req, res) => notificacionController.enviarNotificacion(req, res));
router.put('/mover/:id', auth.actor_registrado, (req, res) => notificacionController.moverNotificacion(req, res));
router.put('/delete/:id', auth.actor_registrado, (req, res) => notificacionController.eliminarNotificacion(req, res));
router.get('/list/:buzonId', auth.actor_registrado, (req, res) => notificacionController.getNotificacionesByBuzonId(req, res));

module.exports = router;
