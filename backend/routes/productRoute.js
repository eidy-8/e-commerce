const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.listAllProduct);
router.post('/', productController.addNewProduct);

module.exports = router;