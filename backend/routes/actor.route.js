const express = require('express');
const router = express.Router();

const actorController = require('../controllers/actor.controller');
const auth = require('../middleware/auth');

router.get('/myData', auth.actor_registrado, (req, res) => actorController.getMisDatos(req, res));
router.put('/edit', auth.actor_registrado, (req, res) => actorController.editarMisDatos(req, res));

module.exports = router;
