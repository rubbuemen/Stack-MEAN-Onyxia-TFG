const express = require('express');
const router = express.Router();

const cuentaUsuarioController = require('../controllers/cuentaUsuario.controller');

router.post('/login', (req, res) => cuentaUsuarioController.login(req, res));
router.post('/registrarse', (req, res) => cuentaUsuarioController.registrarse(req, res));

module.exports = router;
