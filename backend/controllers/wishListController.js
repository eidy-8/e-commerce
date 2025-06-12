const dotenv = require("dotenv");

const wishlistModel = require("../models/wishListModel")

dotenv.config();

exports.listWishlist = async (req, res) => {
    const { buyerId } = req.params;

    try {        
        let wishlist = await wishlistModel.getWishlistByBuyerId(buyerId);

        let result = await wishlistModel.getWishListItem(wishlist.id);

        return res.status(200).json(result);
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

        const wishlist_ProductRelation = await wishlistModel.getWishlist_ProductRelation(wishlist.id, productId);

        if (wishlist_ProductRelation.length > 0) {
            throw new Error('Produto já adicionado no carrinho.');
        } else {
            await wishlistModel.addWishlistItem(
                wishlist.id,
                productId
            );
        }
        

        return res.status(201).json({
            message: 'Produto adicionado à lista de desejos com sucesso.'
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
        let wishlist = await wishlistModel.getWishlistByBuyerId(buyerId);
        
        await wishlistModel.deleteWishlistItem(wishlist.id, productId);
    
        res.status(200).json({ message: 'Item deletado da lista de desejos com sucesso' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar o item' });
      }
};
