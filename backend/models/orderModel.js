const pool = require('../db/db');

exports.getOrderByBuyerId = async (buyerId, offset, limit) => {
    const query = `
        SELECT * FROM Orders
        WHERE buyer_id = $1
        ORDER BY orderdate DESC
        OFFSET $2 LIMIT $3
    `;
    const result = await pool.query(query, [buyerId, offset, limit]);
    return result.rows;
};

exports.getOrderBySellerId = async (sellerId, offset, limit) => {
    const query = `
        SELECT DISTINCT
            o.id AS order_id,
            o.orderDate,
            o.status,
            b.id AS buyer_id,
            u.username AS buyer_username
        FROM Product p
        JOIN Seller s ON p.seller_id = s.id
        JOIN Order_Product op ON p.id = op.product_id
        JOIN Orders o ON op.order_id = o.id
        JOIN Buyer b ON o.buyer_id = b.id
        JOIN Users u ON b.user_id = u.id
        WHERE s.id = $1
        ORDER BY o.orderDate DESC
        OFFSET $2 LIMIT $3;
    `;
    const result = await pool.query(query, [sellerId, offset, limit]);
    return result.rows;
};

exports.getOrderById = async (orderId) => {
    const query = `
        SELECT * FROM Orders
        WHERE id = $1;
    `;
    const result = await pool.query(query, [orderId]);
    return result.rows;
};

exports.countOrdersByBuyerId = async (buyerId) => {
    const query = `SELECT COUNT(*) FROM Orders WHERE buyer_id = $1`;
    const result = await pool.query(query, [buyerId]);
    return parseInt(result.rows[0].count, 10);
};

exports.countOrdersBySellerId = async (sellerId) => {
    const query = `
        SELECT COUNT(*)
        FROM (
            SELECT
                p.id AS product_id,
                p.name AS product_name,
                p.price,
                p.quantity AS stock_quantity,
                o.id AS order_id,
                o.orderDate,
                o.status,
                b.id AS buyer_id,
                u.username AS buyer_username
            FROM Product p
            JOIN Seller s ON p.seller_id = s.id
            JOIN Order_Product op ON p.id = op.product_id
            JOIN Orders o ON op.order_id = o.id
            JOIN Buyer b ON o.buyer_id = b.id
            JOIN Users u ON b.user_id = u.id
            WHERE s.id = $1
        ) AS sub;
    `;
    const result = await pool.query(query, [sellerId]);
    return parseInt(result.rows[0].count, 10);
};

exports.createOrder = async (status, buyer_id, payment_id) => {
    const query = `
        INSERT INTO Orders (orderDate, status, buyer_id, payment_id)
        VALUES (NOW(), $1, $2, $3)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [status, buyer_id, payment_id]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao criar pedido.', err);
        throw err;
    }
};

exports.addOrderItem = async ( orderId, productId ) => {
    const query = `
        INSERT INTO order_Product (order_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [orderId, productId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao adicionar produto ao pedido.', err);
        throw err;
    }
};

exports.getOrderItem = async ( orderId ) => {
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS nome_produto,
            p.price AS preco,
            p.imageUrl AS imagem_produto,
            p.seller_id AS seller_id
        FROM Order_Product wp
        JOIN Product p ON wp.product_id = p.id
        WHERE wp.order_id = $1
        ORDER BY p.name;
    `;

    try {
        const result = await pool.query(query, [orderId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao listar produtos do pedido.', err);
        throw err;
    }
};