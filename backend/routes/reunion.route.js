const express = require('express');
const router = express.Router();
const reunionController = require('../controllers/reunion.controller');
const auth = require('../middleware/auth');

//cron de en progreso y de realizado

router.post('/', auth.presidente, (req, res) => reunionController.crearReunion(req, res));
router.put('/edit/:id', auth.presidente, (req, res) => reunionController.editarReunion(req, res));
router.put('/editRealizada/:id', auth.presidente, (req, res) => reunionController.añadirInformacionReunionRealizada(req, res));
router.delete('/delete/:id', auth.presidente, (req, res) => reunionController.eliminarReunion(req, res));
router.put('/publicar/:id', auth.presidente, (req, res) => reunionController.publicarReunion(req, res));
router.put('/cancelar/:id', auth.presidente, (req, res) => reunionController.cancelarReunion(req, res));
router.get('/list', auth.aso_miembro, (req, res) => reunionController.getReuniones(req, res));
router.get('/pendientes/', auth.aso_miembro, (req, res) => reunionController.getReunionesPendientes(req, res));
router.get('/realizadas/', auth.aso_miembro, (req, res) => reunionController.getReunionesRealizadas(req, res));

module.exports = router;
