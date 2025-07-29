const dotenv = require("dotenv");

const orderModel = require("../models/orderModel")

dotenv.config();

exports.listOrder = async (req, res) => {
    const { buyerId } = req.params;
    const { search, page, pageSize } = req.query; 
    const offset = (page - 1) * pageSize;

    try {
        // if (buyerId === undefined) {
        //     if (search) {
        //         result = await orderModel.searchOrdersByKeyword(search, page, pageSize, buyerId);
        //     } else {
        //         result = await orderModel.listAllOrders(page, pageSize, buyerId);
        //     }
        // } else {
        //     result = await orderModel.getOrderByBuyerId(buyerId);
        // }

        const totalOrders = await orderModel.countOrdersByBuyerId(buyerId);

        let orders = await orderModel.getOrderByBuyerId(buyerId, offset, pageSize);

        const ordersWithItems = await Promise.all(
            orders.map(async (order) => {
                const items = await orderModel.getOrderItem(order.id);
                return {
                    ...order,
                    products: items
                };
            })
        );

        const hasNext = (page * pageSize) < totalOrders;

        return res.status(200).json({
            orders: ordersWithItems,
            hasNext
        });
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
