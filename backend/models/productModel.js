const pool = require('../db/db');

exports.getAllProducts = async () => {
    return pool.query('SELECT * FROM Product');
}

exports.createProduct = async (name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id) => {
    return pool.query(
      'INSERT INTO Product (name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id]
    );
};