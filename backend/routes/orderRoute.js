const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/:orderId?', orderController.listOrder);
router.post('/', orderController.addOrder);

module.exports = router;