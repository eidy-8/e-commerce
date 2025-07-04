const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/:id?', paymentController.listAllPayment);
router.post('/', paymentController.addNewPayment);

module.exports = router;