const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.get('/:id?', paymentController.listAllPayment);
router.post('/', paymentController.addNewPayment);
router.put('/:id', paymentController.updatePayment);

module.exports = router;