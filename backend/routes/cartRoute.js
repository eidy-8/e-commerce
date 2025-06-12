const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:buyerId', cartController.listCart)
router.post('/:buyerId', cartController.addToCart);
router.delete('/:buyerId', cartController.deleteToCart);

module.exports = router;