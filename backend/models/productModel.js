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

exports.updateProduct = async (id, name, price, isUsed, isActive, imageUrl, description, quantity) => {
  return pool.query(
    `UPDATE Product 
     SET name = COALESCE($1, name), 
         price = COALESCE($2, price),
         isUsed = COALESCE($3, isUsed),
         isActive = COALESCE($4, isActive),
         imageUrl = COALESCE($5, imageUrl),
         description = COALESCE($6, description),
         quantity = COALESCE($7, quantity)
     WHERE id = $8 RETURNING *`,
    [name, price, isUsed, isActive, imageUrl, description, quantity, id]
  );
};

exports.deleteProduct = async (id) => {
  return pool.query('DELETE FROM Product WHERE id = $1', [id]);
};