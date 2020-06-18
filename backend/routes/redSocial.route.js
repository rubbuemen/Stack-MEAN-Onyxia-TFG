const express = require('express');
const router = express.Router();

const redSocialController = require('../controllers/redSocial.controller');
const auth = require('../middleware/auth');

router.post('/', auth.actor_registrado, (req, res) => redSocialController.crearRedSocial(req, res));
router.put('/edit/:id', auth.actor_registrado, (req, res) => redSocialController.editarRedSocial(req, res));
router.delete('/delete/:id', auth.actor_registrado, (req, res) => redSocialController.eliminarRedSocial(req, res));

module.exports = router;
