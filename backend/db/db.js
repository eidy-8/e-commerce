const { Pool } = require('pg');
const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWD,
    database: env.DB_NAME
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro ao conectar ao banco de dados:', err.stack);
    }

    console.log('Conexão com PostgreSQL bem-sucedida.');
    release();
    
})

module.exports = pool;