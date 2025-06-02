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

exports.addWishlistItem = async ({ wishlistId, productId }) => {
    const query = `
        INSERT INTO WishlistItem (wishlist_id, product_id)
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

// SELECT wi.id AS wishlist_item_id, p.id AS product_id, p.name, p.price, p.imageUrl
// FROM WishlistItem wi
// JOIN Product p ON wi.product_id = p.id
// WHERE wi.wishlist_id = $1;