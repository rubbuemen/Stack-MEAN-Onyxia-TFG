const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/banner.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/file');

router.post('/', upload.single('imagen'), auth.presidente, (req, res) => bannerController.añadirBanner(req, res));
router.put('/edit/:id', upload.none(), auth.presidente, (req, res) => bannerController.editarBanner(req, res));
router.delete('/delete/:id', auth.presidente, (req, res) => bannerController.eliminarBanner(req, res));
router.get('/list', (req, res) => bannerController.getBanners(req, res));
router.get('/:id', (req, res) => bannerController.getBanner(req, res));

module.exports = router;
