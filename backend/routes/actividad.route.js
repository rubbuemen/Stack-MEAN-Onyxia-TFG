const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividad.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.single('fotografia'), auth.junta_directiva, (req, res) => actividadController.crearActividad(req, res));
router.put('/edit/:id', upload.single('fotografia'), auth.junta_directiva, (req, res) => actividadController.editarActividad(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => actividadController.eliminarActividad(req, res));
router.get('/listPub', (req, res) => actividadController.getActividadesPublicas(req, res));
router.get('/list', auth.junta_directiva, (req, res) => actividadController.getActividades(req, res));

module.exports = router;
