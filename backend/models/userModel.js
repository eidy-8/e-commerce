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
        const query = "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING id";
        db.query(
            query,
            [data.username, data.email, data.password],
            (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.rows[0]);
                }
            }
        );
    });
}

async function updateLastLogin(email) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE Users SET lastlogin = NOW() WHERE email = ($1)";
        db.query(
            query,
            [email],
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
    postUser,
    updateLastLogin
}