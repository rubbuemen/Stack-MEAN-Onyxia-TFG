const express = require('express');
const router = express.Router();
const inscripcionEventoController = require('../controllers/inscripcionEvento.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/list/:eventoId', auth.junta_directiva, (req, res) => inscripcionEventoController.getInscripcionesByEventoId(req, res));
router.get('/pendientes/:eventoId', auth.junta_directiva, (req, res) => inscripcionEventoController.getInscripcionesPendientesByEventoId(req, res));
router.get('/aceptadas/:eventoId', auth.junta_directiva, (req, res) => inscripcionEventoController.getInscripcionesAceptadasByEventoId(req, res));
router.get('/mylist', auth.aso_miembro, (req, res) => inscripcionEventoController.getMisInscripcionesEventos(req, res));
router.get('/:eventoId', auth.aso_miembro, (req, res) => inscripcionEventoController.getEstadoInscripcionByEventoId(req, res));
router.post('/:eventoId', upload.none(), auth.aso_miembro, (req, res) => inscripcionEventoController.inscribirseAEvento(req, res));
router.put('/:id', auth.junta_directiva, (req, res) => inscripcionEventoController.aceptarInscripcionEvento(req, res));
router.get('/checkInscripcion/:eventoId', auth.aso_miembro, (req, res) => inscripcionEventoController.tieneInscripcionMandada(req, res));

module.exports = router;
