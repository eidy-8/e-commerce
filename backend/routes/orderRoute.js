const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:buyerId', orderController.listOrder);
router.post('/', orderController.addOrder);
router.post('/productToOrder', orderController.addToOrder);

module.exports = router;