const pool = require('../db/db');

exports.getCartByBuyerId = async (buyerId) => {
    const query = `
        SELECT * FROM Cart
        WHERE buyer_id = $1;
    `;

    try {
        const result = await pool.query(query, [buyerId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar carrinho de compras.', err);
        throw err;
    }
};

exports.createCart = async (buyerId) => {
    const query = `
        INSERT INTO Cart (buyer_id)
        VALUES ($1)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [buyerId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao criar carrinho de compras.', err);
        throw err;
    }
};

exports.addCartItem = async ( cartId, productId ) => {
    const query = `
        INSERT INTO cart_Product (cart_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [cartId, productId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao adicionar produto ao carrinho de compras.', err);
        throw err;
    }
};

exports.getCart_ProductRelation = async (cartId, productId) => {
    const query = `
        SELECT * FROM cart_Product
        WHERE cart_id = $1 AND product_id = $2;
    `;

    try {
        const result = await pool.query(query, [cartId, productId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar carrinho de compras.', err);
        throw err;
    }
};

exports.getCartItem = async ( cartId ) => {
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS nome_produto,
            p.price AS preco,
            p.imageUrl AS imagem_produto
        FROM Cart_Product wp
        JOIN Product p ON wp.product_id = p.id
        WHERE wp.cart_id = $1
        ORDER BY p.name;
    `;

    try {
        const result = await pool.query(query, [cartId]);
        
        const rowsWithCartId = result.rows.map(item => ({
            ...item,
            cart_id: cartId
        }));

        return rowsWithCartId;
    } catch (err) {
        console.error('Erro ao adicionar produto ao carrinho de compras.', err);
        throw err;
    }
};

exports.deleteCartItem = async (cartId, productId) => {
    return pool.query('DELETE FROM Cart_Product WHERE cart_id = $1 AND product_id = $2', [cartId, productId]);
};