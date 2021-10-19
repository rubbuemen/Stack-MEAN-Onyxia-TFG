const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.get('/list/:materialId', auth.junta_directiva, (req, res) => inventarioController.getInventarioByMaterialId(req, res));
router.get('/:id', auth.junta_directiva, (req, res) => inventarioController.getInventario(req, res));
router.post('/:materialId', upload.none(), auth.junta_directiva, (req, res) => inventarioController.addInventarioParaMaterialId(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => inventarioController.descatalogarInventario(req, res));
router.put('/deteriorar/:id', auth.junta_directiva, (req, res) => inventarioController.deteriorarInventario(req, res));
router.put('/arreglar/:id', auth.junta_directiva, (req, res) => inventarioController.arreglarInventario(req, res));

module.exports = router;
