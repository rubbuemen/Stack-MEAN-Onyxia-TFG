const express = require('express');
const router = express.Router();
const actorController = require('../controllers/actor.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/myData', auth.actor_registrado, (req, res) => actorController.getMisDatos(req, res));
router.put('/edit', upload.single('fotografia'), auth.actor_registrado, (req, res) => actorController.editarMisDatos(req, res));
router.get('/visitantes', auth.presidente, (req, res) => actorController.getVisitantes(req, res));
router.get('/miembros', auth.presidente, (req, res) => actorController.getMiembros(req, res));
router.get('/:actorId', auth.presidente, (req, res) => actorController.getDatosByActorId(req, res));
router.put('/edit/:actorId', upload.single('fotografia'), auth.presidente, (req, res) => actorController.editarDatosActorId(req, res));
router.post('/hacerMiembro/:actorId', upload.single('fotografia'), auth.secretario_presidente, (req, res) => actorController.hacerMiembroActorId(req, res));

module.exports = router;
