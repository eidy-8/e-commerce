const dotenv = require("dotenv");

const wishlistModel = require("../models/wishListModel")

dotenv.config();

exports.listWishlist = async (req, res) => {
    const { buyerId } = req.params;
    const { productId } = req.body;

    try {
        
        // list

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.addToWishlist = async (req, res) => {
    const { buyerId } = req.params;
    const { productId } = req.body;

    try {
        let wishlist = await wishlistModel.getWishlistByBuyerId(buyerId);

        const wishlistItem = await wishlistModel.addWishlistItem({
            wishlistId: wishlist.id,
            productId
        });

        return res.status(201).json({
            message: 'Produto adicionado à lista de desejos com sucesso.',
            wishlistItem
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteToWishlist = async (req, res) => {
    const { buyerId } = req.params;
    const { productId } = req.body;

    try {
        
        // delete

    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};
