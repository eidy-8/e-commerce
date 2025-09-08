const dotenv = require("dotenv");

const orderModel = require("../models/orderModel")

const productModel = require('../models/productModel');

dotenv.config();

exports.listOrder = async (req, res) => {
    const { orderId } = req.params;
    const { buyerId, page, pageSize, sellerId } = req.query; 
    const offset = (page - 1) * pageSize;

    try {
        if (buyerId) {
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
        } 

        if (orderId) {
            const order = await orderModel.getOrderById(orderId);
            const items = await orderModel.getOrderItem(orderId);
            return res.status(200).json({
                order: order,
                products: items
            });
        }

        if (sellerId) {            
            const totalOrders = await orderModel.countOrdersBySellerId(sellerId);       
            let orders = await orderModel.getOrderBySellerId(sellerId, offset, pageSize); 
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
        }
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
