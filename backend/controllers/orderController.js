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
    const { status, buyer_id, payment_id, products } = req.body;

    try {

        const order = await orderModel.createOrder(status, buyer_id, payment_id);

        if (Array.isArray(products)) {
            for (const item of products) {
                await orderModel.addOrderItem(order.id, item.product_id);
            }
        }

        return res.status(201).json({
            message: 'Pedido criado com sucesso.',
            orderId: order.id
        });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};
