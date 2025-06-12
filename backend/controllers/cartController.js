const dotenv = require("dotenv");

const cartModel = require("../models/cartModel")

dotenv.config();

exports.listCart = async (req, res) => {
    const { buyerId } = req.params;

    try {        
        let cart = await cartModel.getCartByBuyerId(buyerId);

        let result = await cartModel.getCartItem(cart.id);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.addToCart = async (req, res) => {
    const { buyerId } = req.params;
    const { productId } = req.body;

    try {
        let cart = await cartModel.getCartByBuyerId(buyerId);

        const cart_ProductRelation = await cartModel.getCart_ProductRelation(cart.id, productId);

        if (cart_ProductRelation.length > 0) {
            throw new Error('Produto já adicionado no carrinho.');
        } else {
            await cartModel.addCartItem(
                cart.id,
                productId
            );
        }
        

        return res.status(201).json({
            message: 'Produto adicionado ao carrinho de compras com sucesso.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.deleteToCart = async (req, res) => {
    const { buyerId } = req.params;
    const { productId } = req.body;

    try {
        let cart = await cartModel.getCartByBuyerId(buyerId);
        
        await cartModel.deleteCartItem(cart.id, productId);
    
        res.status(200).json({ message: 'Item deletado do carrinho de compras com sucesso' });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar o item' });
      }
};
