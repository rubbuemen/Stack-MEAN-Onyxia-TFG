const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventario.controller');
const auth = require('../middleware/auth');

router.get('/list/:materialId', auth.junta_directiva, (req, res) => inventarioController.getInventarioByMaterialId(req, res));
router.post('/:materialId', auth.junta_directiva, (req, res) => inventarioController.addInventarioParaMaterialId(req, res));
router.delete('/delete/:id', auth.junta_directiva, (req, res) => inventarioController.descatalogarInventario(req, res));
router.put('/deteriorar/:id', auth.junta_directiva, (req, res) => inventarioController.deteriorarInventario(req, res));
router.put('/arreglar/:id', auth.junta_directiva, (req, res) => inventarioController.arreglarInventario(req, res));

module.exports = router;

//TODO: añadir inventario para material -> se suma + 1 a cantidad disponible,
//descatalogar inventario para material -> se resta -1 a cantidad disponible y se elimina la entidad de inventario y pop en material (creo que se puede poner solo :inventarioId y sacar el material que tiene este inventario).En caso de que esté a 0 porque está en uso, no se podrá descatalogar.
//deteriorar inventario, pasando id de inventario y no debe estarlo ya de antes -> pasa a deteriorado
//arreglar inventario, pasando id de inventario y no debe estarlo ya de antes -> pasa a operativo
