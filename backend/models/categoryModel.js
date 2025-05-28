const pool = require('../db/db');

exports.getAllCategories = async () => {
  const query = `SELECT * FROM Category`;

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
      console.error('Erro ao listar categorias no banco de dados.', err);
      throw err;
  }
}

exports.listSpecificCategory = async (id) => {
    const query = `SELECT * FROM Category WHERE id = $1`;
  
    try {
      const result = await pool.query(query, [id]);
        return result.rows;
    } catch (err) {
        console.error('Erro ao listar a categoria no banco de dados.', err);
        throw err;
    }
  }