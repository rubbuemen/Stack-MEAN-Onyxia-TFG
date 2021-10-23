const express = require('express');
const router = express.Router();
const reunionController = require('../controllers/reunion.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/pendientes', auth.aso_miembro, (req, res) => reunionController.getReunionesPendientes(req, res));
router.get('/realizadas', auth.aso_miembro, (req, res) => reunionController.getReunionesRealizadas(req, res));
router.post('/', upload.none(), auth.presidente, (req, res) => reunionController.crearReunion(req, res));
router.put('/edit/:id', upload.none(), auth.presidente, (req, res) => reunionController.editarReunion(req, res));
router.put('/editRealizada/:id', upload.none(), auth.presidente, (req, res) => reunionController.añadirInformacionReunionRealizada(req, res));
router.delete('/delete/:id', auth.presidente, (req, res) => reunionController.eliminarReunion(req, res));
router.put('/cancelar/:id', auth.presidente, (req, res) => reunionController.cancelarReunion(req, res));
router.get('/list', auth.presidente, (req, res) => reunionController.getReuniones(req, res));
router.get('/:id', auth.aso_miembro, (req, res) => reunionController.getReunion(req, res));

module.exports = router;
