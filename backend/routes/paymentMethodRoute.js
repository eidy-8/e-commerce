const express = require('express');
const router = express.Router();
const paymentMethodController = require('../controllers/paymentMethodController');

router.get('/:id?', paymentMethodController.listAllPaymentMethod);

module.exports = router;