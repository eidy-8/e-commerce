const pool = require('../db/db');

exports.getAllPayment = async () => {
  const query = `SELECT * FROM Payment`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
      console.error('Erro ao listar pagamentos no banco de dados.', err);
      throw err;
  }
}

exports.listSpecificPayment = async (id) => {
    const query = `SELECT * FROM Payment WHERE id = $1`;
  
    try {
      const result = await pool.query(query, [id]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao listar pagamentos no banco de dados.', err);
        throw err;
    }
}

exports.createPayment = async (payType_id, totalPrice) => {
  return pool.query(
    'INSERT INTO Payment (purchaseDate, payType_id, totalPrice) VALUES (NOW(), $1, $2) RETURNING *',
    [payType_id, totalPrice]
  );
};

exports.updatePayment = async (id, orderId) => { 
  return pool.query(
    `UPDATE Payment 
     SET order_id = $1
     WHERE id = $2 RETURNING *`,
    [orderId, id]
  );
};