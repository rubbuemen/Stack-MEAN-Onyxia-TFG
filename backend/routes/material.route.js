const express = require('express');
const router = express.Router();
const materialController = require('../controllers/material.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.single('fotografia'), auth.junta_directiva, (req, res) => materialController.crearMaterial(req, res));
router.put('/edit/:id', upload.single('fotografia'), auth.junta_directiva, (req, res) => materialController.editarMaterial(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => materialController.eliminarMaterial(req, res));
router.get('/list/:actividadId', auth.junta_directiva, (req, res) => materialController.getMaterialesByActividadId(req, res));

module.exports = router;
