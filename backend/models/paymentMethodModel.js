const pool = require('../db/db');

exports.getAllPaymentMethod = async () => {
  const query = `SELECT * FROM PayType`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
      console.error('Erro ao listar métodos de pagamento no banco de dados.', err);
      throw err;
  }
}

exports.listSpecificPaymentMethod = async (id) => {
    const query = `SELECT * FROM PayType WHERE id = $1`;
  
    try {
      const result = await pool.query(query, [id]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao listar métodos de pagamento no banco de dados.', err);
        throw err;
    }
  }