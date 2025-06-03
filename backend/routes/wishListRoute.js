const express = require('express');
const router = express.Router();
const wishListController = require('../controllers/wishListController');

router.get('/:buyerId', wishListController.listWishlist)
router.post('/:buyerId', wishListController.addToWishlist);
router.delete('/:buyerId', wishListController.deleteToWishlist);

module.exports = router;