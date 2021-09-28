const express = require('express');
const router = express.Router();

const redSocialController = require('../controllers/redSocial.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.none(), auth.actor_registrado, (req, res) => redSocialController.crearRedSocial(req, res));
router.put('/edit/:id', upload.none(), auth.actor_registrado, (req, res) => redSocialController.editarRedSocial(req, res));
router.delete('/delete/:id', auth.actor_registrado, (req, res) => redSocialController.eliminarRedSocial(req, res));
router.get('/mylist', auth.actor_registrado, (req, res) => redSocialController.getMisRedesSociales(req, res));
router.get('/list/:actorId', auth.presidente, (req, res) => redSocialController.getRedesSocialesByActorId(req, res));
router.get('/:id', auth.actor_registrado, (req, res) => redSocialController.getRedSocial(req, res));

module.exports = router;
