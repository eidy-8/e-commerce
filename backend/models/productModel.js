const pool = require('../db/db');

exports.getAllProducts = async () => {
  const query = `SELECT * FROM Product`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
      console.error('Erro ao listar produtos no banco de dados.', err);
      throw err;
  }
}

exports.getPagedProducts = async (offset, limit, sellerId) => {
  const query = `
      SELECT * 
      FROM Product
      WHERE seller_id = $1
      OFFSET $2 LIMIT $3
  `;

  try {
      const result = await pool.query(query, [sellerId, offset, limit]);
      return result.rows;
  } catch (err) {
      console.error('Erro ao listar produtos no banco de dados.', err);
      throw err;
  }
};

exports.getSpecificProduct = async (id, sellerId) => {
  const query = `SELECT * FROM Product WHERE id = $1 AND seller_id = $2`;

  try {
    const result = await pool.query(query, [id, sellerId]);
      return result.rows;
  } catch (err) {
      console.error('Erro ao listar produtos no banco de dados.', err);
      throw err;
  }
}

exports.countAllProducts = async (sellerId) => {
  const query = `
      SELECT COUNT(*) AS total
      FROM Product 
      WHERE seller_id = $1
  `;

  try {
      const result = await pool.query(query, [sellerId]);
      return parseInt(result.rows[0].total, 10);
  } catch (err) {
      console.error('Erro ao contar produtos no banco de dados.', err);
      throw err;
  }
};

exports.searchProductsByKeyword = async (keyword, offset, limit, sellerId) => {
  const query = `
        SELECT * 
        FROM Product
        WHERE name ILIKE $1
        AND seller_id = $2
        OFFSET $3 LIMIT $4
  `;

  try {
      const result = await pool.query(query, [keyword, sellerId, offset, limit]);
      return result.rows;
  } catch (err) {
      console.error('Erro ao buscar produtos no banco de dados.', err);
      throw err;
  }
};

exports.countProductsByKeyword = async (keyword) => {
  const query = `
      SELECT COUNT(*) AS total
      FROM Product
      WHERE name ILIKE $1
  `;

  try {
      const result = await pool.query(query, [keyword]);
      return parseInt(result.rows[0].total, 10);
  } catch (err) {
      console.error('Erro ao contar produtos por palavra-chave no banco de dados.', err);
      throw err;
  }
};

exports.createProduct = async (name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id) => {
    return pool.query(
      'INSERT INTO Product (name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      [name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id]
    );
};

exports.updateProduct = async (id, name, price, isUsed, isActive, imageUrl, description, quantity, updatedAt) => { 
  return pool.query(
    `UPDATE Product 
     SET name = COALESCE($1, name), 
         price = COALESCE($2, price),
         isUsed = COALESCE($3, isUsed),
         isActive = COALESCE($4, isActive),
         imageUrl = COALESCE($5, imageUrl),
         description = COALESCE($6, description),
         quantity = COALESCE($7, quantity),
         updatedAt = COALESCE($8, updatedAt)
     WHERE id = $9 RETURNING *`,
    [name, price, isUsed, isActive, imageUrl, description, quantity, updatedAt, id]
  );
};

exports.deleteProduct = async (id) => {
  return pool.query('DELETE FROM Product WHERE id = $1', [id]);
};