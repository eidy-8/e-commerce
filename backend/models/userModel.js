const db = require("../db/db");

async function getUserByUsername(data) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE username = $1';        
        db.query(
            query, 
            [data], 
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
}

async function getUserByEmail(data) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE email = $1';        
        db.query(
            query, 
            [data], 
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows);
                }
            }
        );
    });
}

async function postUser(data) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)";
        db.query(
            query,
            [data.username, data.email, data.password],
            (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            }
        );
    });
}

module.exports = {
    getUserByUsername,
    getUserByEmail,
    postUser
}