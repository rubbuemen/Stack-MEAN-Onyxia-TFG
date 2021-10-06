const express = require('express');
const router = express.Router();
const buzonController = require('../controllers/buzon.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.none(), auth.actor_registrado, (req, res) => buzonController.crearBuzon(req, res));
router.put('/edit/:id', upload.none(), auth.actor_registrado, (req, res) => buzonController.editarBuzon(req, res));
router.delete('/delete/:id', auth.actor_registrado, (req, res) => buzonController.eliminarBuzon(req, res));
router.get('/list', auth.actor_registrado, (req, res) => buzonController.getBuzones(req, res));
router.get('/creados', auth.actor_registrado, (req, res) => buzonController.getBuzonesCreados(req, res));
router.get('/entrada', auth.actor_registrado, (req, res) => buzonController.getBuzonEntrada(req, res));
router.get('/salida', auth.actor_registrado, (req, res) => buzonController.getBuzonSalida(req, res));
router.get('/papelera', auth.actor_registrado, (req, res) => buzonController.getBuzonPapelera(req, res));
router.get('/:id', auth.actor_registrado, (req, res) => buzonController.getBuzon(req, res));

module.exports = router;
