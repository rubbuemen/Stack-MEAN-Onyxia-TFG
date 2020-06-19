const express = require('express');
const router = express.Router();

const redSocialController = require('../controllers/redSocial.controller');
const auth = require('../middleware/auth');

router.post('/', auth.actor_registrado, (req, res) => redSocialController.crearRedSocial(req, res));
router.put('/edit/:id', auth.actor_registrado, (req, res) => redSocialController.editarRedSocial(req, res));
router.delete('/delete/:id', auth.actor_registrado, (req, res) => redSocialController.eliminarRedSocial(req, res));
router.get('/mylist', auth.actor_registrado, (req, res) => redSocialController.getMisRedesSociales(req, res));
router.get('/list/:actorId', auth.presidente, (req, res) => redSocialController.getRedesSocialesByActorId(req, res));

module.exports = router;
