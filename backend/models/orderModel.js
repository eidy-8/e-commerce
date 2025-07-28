const pool = require('../db/db');

exports.getOrderByBuyerId = async (buyerId) => {
    const query = `
        SELECT * FROM Orders
        WHERE buyer_id = $1;
    `;

    try {
        const result = await pool.query(query, [buyerId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar pedido.', err);
        throw err;
    }
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
            p.imageUrl AS imagem_produto
        FROM Order_Product wp
        JOIN Product p ON wp.product_id = p.id
        WHERE wp.order_id = $1
        ORDER BY p.name;
    `;

    try {
        const result = await pool.query(query, [orderId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao adicionar produto ao pedido.', err);
        throw err;
    }
};