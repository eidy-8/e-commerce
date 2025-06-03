const pool = require('../db/db');

exports.getWishlistByBuyerId = async (buyerId) => {
    const query = `
        SELECT * FROM Wishlist
        WHERE buyer_id = $1;
    `;

    try {
        const result = await pool.query(query, [buyerId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao buscar lista de desejos.', err);
        throw err;
    }
};

exports.createWishlist = async (buyerId) => {
    const query = `
        INSERT INTO Wishlist (buyer_id)
        VALUES ($1)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [buyerId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao criar lista de desejos.', err);
        throw err;
    }
};

exports.addWishlistItem = async ( wishlistId, productId ) => {
    const query = `
        INSERT INTO Wishlist_Product (wishlist_id, product_id)
        VALUES ($1, $2)
        RETURNING *;
    `;

    try {
        const result = await pool.query(query, [wishlistId, productId]);
        return result.rows[0];
    } catch (err) {
        console.error('Erro ao adicionar produto à lista de desejos.', err);
        throw err;
    }
};

exports.getWishlist_ProductRelation = async (wishlistId, productId) => {
    const query = `
        SELECT * FROM Wishlist_Product
        WHERE wishlist_id = $1 AND product_id = $2;
    `;

    try {
        const result = await pool.query(query, [wishlistId, productId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao buscar lista de desejos.', err);
        throw err;
    }
};

exports.getWishListItem = async ( wishlistId ) => {
    const query = `
        SELECT 
            p.id AS product_id,
            p.name AS nome_produto,
            p.price AS preco,
            p.imageUrl AS imagem_produto
        FROM Wishlist_Product wp
        JOIN Product p ON wp.product_id = p.id
        WHERE wp.wishlist_id = $1
        ORDER BY p.name;
    `;

    try {
        const result = await pool.query(query, [wishlistId]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao adicionar produto à lista de desejos.', err);
        throw err;
    }
};

exports.deleteWishlistItem = async (wishlistId, productId) => {
    return pool.query('DELETE FROM Wishlist_Product WHERE wishlist_id = $1 AND product_id = $2', [wishlistId, productId]);
};