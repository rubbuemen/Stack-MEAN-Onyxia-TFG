const express = require('express');
const router = express.Router();
const buzonController = require('../controllers/buzon.controller');
const auth = require('../middleware/auth');

router.post('/', auth.actor_registrado, (req, res) => buzonController.crearBuzon(req, res));
router.put('/edit/:id', auth.actor_registrado, (req, res) => buzonController.editarBuzon(req, res));
router.delete('/delete/:id', auth.actor_registrado, (req, res) => buzonController.eliminarBuzon(req, res));
router.get('/list', auth.actor_registrado, (req, res) => buzonController.getBuzones(req, res));
router.get('/entrada', auth.actor_registrado, (req, res) => buzonController.getBuzonEntrada(req, res));

module.exports = router;
