const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/:id?', productController.listAllProduct);
router.post('/', productController.addNewProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;