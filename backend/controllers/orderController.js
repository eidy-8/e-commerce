const dotenv = require("dotenv");

const orderModel = require("../models/orderModel")

dotenv.config();

exports.listOrder = async (req, res) => {
    const { buyerId } = req.params;

    try {        

        let result = await orderModel.getOrderByBuyerId(buyerId);

        // para buscar os produtos do pedido: let result = await orderModel.getOrderItem(order.id);

        return res.status(200).json(result);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.addOrder = async (req, res) => {
    const { status, buyer_id, payment_id } = req.body;

    try {

        await orderModel.createOrder(status, buyer_id, payment_id);

        return res.status(201).json({
            message: 'Produto adicionado ao pedido com sucesso.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.addToOrder = async (req, res) => {
    const { order_id, product_id } = req.body;

    try {

        await orderModel.addOrderItem(order_id, product_id);

        return res.status(201).json({
            message: 'Produto adicionado ao pedido com sucesso.'
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};
