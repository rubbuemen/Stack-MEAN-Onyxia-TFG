const express = require('express');
const router = express.Router();
const cuentaUsuarioController = require('../controllers/cuentaUsuario.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/login', upload.none(), (req, res) => cuentaUsuarioController.login(req, res));
router.get('/renovarToken', auth.actor_registrado, (req, res) => cuentaUsuarioController.renovarToken(req, res));
router.post('/registrarse', upload.none(), (req, res) => cuentaUsuarioController.registrarse(req, res));
router.put('/ban/:userId', auth.presidente, (req, res) => cuentaUsuarioController.banearCuenta(req, res));
router.put('/unban/:userId', auth.presidente, (req, res) => cuentaUsuarioController.desbanearCuenta(req, res));

module.exports = router;
