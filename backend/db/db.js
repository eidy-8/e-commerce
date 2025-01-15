const { Pool } = require('pg');
const dotenv = require("dotenv");

dotenv.config();

const env = process.env;

const pool = new Pool({
    user: env.DB_USER,
    password: env.DB_PASSWD,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};