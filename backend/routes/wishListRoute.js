const express = require('express');
const router = express.Router();
const wishListController = require('../controllers/wishListController');

router.get('/:id', wishListController.listWishlist)
router.post('/:id', wishListController.addToWishlist);
router.delete('/:id', wishListController.deleteToWishlist);

module.exports = router;