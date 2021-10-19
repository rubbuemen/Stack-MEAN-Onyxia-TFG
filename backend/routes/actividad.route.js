const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividad.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/list', auth.junta_directiva, (req, res) => actividadController.getActividades(req, res));
router.post('/', upload.single('fotografia'), auth.junta_directiva, (req, res) => actividadController.crearActividad(req, res));
router.put('/edit/:id', upload.single('fotografia'), auth.junta_directiva, (req, res) => actividadController.editarActividad(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => actividadController.eliminarActividad(req, res));
router.put('/publicar/:id', auth.junta_directiva, (req, res) => actividadController.publicarActividad(req, res));
router.put('/ocultar/:id', auth.junta_directiva, (req, res) => actividadController.ocultarActividad(req, res));
router.put('/descatalogar/:id', auth.junta_directiva, (req, res) => actividadController.descatalogarActividad(req, res));
router.put('/catalogar/:id', auth.junta_directiva, (req, res) => actividadController.catalogarActividad(req, res));
router.get('/listPub', (req, res) => actividadController.getActividadesPublicas(req, res));
router.get('/listEnVigor', (req, res) => actividadController.getActividadesEnVigor(req, res));
router.get('/listPubEnVigor', auth.junta_directiva, (req, res) => actividadController.getActividadesPublicasEnVigor(req, res));
router.get('/listPub/:eventoId', (req, res) => actividadController.getActividadesPublicasPorEventoId(req, res));
router.get('/list/:eventoId', (req, res) => actividadController.getActividadesPorEventoId(req, res));
router.get('/:id', (req, res) => actividadController.getActividad(req, res));

module.exports = router;
