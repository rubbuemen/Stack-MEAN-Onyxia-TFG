const express = require('express');
const router = express.Router();

const cuentaUsuarioController = require('../controllers/cuentaUsuario');

const auth = require('../middleware/auth'); // Aquí no hace falta porque lo hacen usuarios no logeados

router.post('/login', (req, res) => cuentaUsuarioController.login(req, res));
router.post('/registro', (req, res) => cuentaUsuarioController.registro(req, res));

// router.post('/registro', async (req, res) => {
//   let cuentaUsuario = await CuentaUsuario.findOne({ usuario: req.body.usuario });
//   if (cuentaUsuario) return res.status(400).send('Ese usuario ya existe');
//   cuentaUsuario = new CuentaUsuario({
//     usuario: req.body.usuario,
//     contraseña: req.body.contraseña,
//     autoridad: req.body.autoridad,
//     estado: req.body.estado,
//     fechaCreacion: req.body.fechaCreacion,
//   });

//   const result = await cuentaUsuario.save();
//   const jwtToken = cuentaUsuario.generateJWT();
//   res.status(200).send({ jwtToken });
// });

module.exports = router;
