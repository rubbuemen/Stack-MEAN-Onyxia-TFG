const express = require('express');
const router = express.Router();
const cuentaUsuarioController = require('../controllers/cuentaUsuario.controller');
const auth = require('../middleware/auth');

router.post('/login', (req, res) => cuentaUsuarioController.login(req, res));
router.post('/registrarse', (req, res) => cuentaUsuarioController.registrarse(req, res));
router.put('/ban/:userId', auth.presidente, (req, res) => cuentaUsuarioController.banearCuenta(req, res));
router.put('/unban/:userId', auth.presidente, (req, res) => cuentaUsuarioController.desbanearCuenta(req, res));

module.exports = router;
