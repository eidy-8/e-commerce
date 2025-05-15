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

exports.getPagedProducts = async (offset, limit) => {
  const query = `
      SELECT * 
      FROM Product
      OFFSET $1 LIMIT $2
  `;

  try {
      const result = await pool.query(query, [offset, limit]);
      return result.rows;
  } catch (err) {
      console.error('Erro ao listar produtos no banco de dados.', err);
      throw err;
  }
};

exports.getSpecificProduct = async (id) => {
  const query = `SELECT * FROM Product WHERE id = $1`;

  try {
    const result = await pool.query(query, [id]);
      return result.rows;
  } catch (err) {
      console.error('Erro ao listar produtos no banco de dados.', err);
      throw err;
  }
}

exports.countAllProducts = async () => {
  const query = `
      SELECT COUNT(*) AS total
      FROM Product
  `;

  try {
      const result = await pool.query(query);
      return parseInt(result.rows[0].total, 10);
  } catch (err) {
      console.error('Erro ao contar produtos no banco de dados.', err);
      throw err;
  }
};

exports.searchProductsByKeyword = async (keyword, offset, limit) => {
  const query = `
        SELECT * 
        FROM Product
        WHERE name ILIKE $1
        OFFSET $2 LIMIT $3
  `;

  try {
      const result = await pool.query(query, [keyword, offset, limit]);
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