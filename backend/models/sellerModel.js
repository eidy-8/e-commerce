const db = require("../db/db");

async function postSeller(data) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Seller (user_id) VALUES ($1)";
        db.query(
            query,
            [data],
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

async function getSellerByUserId(data) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Seller WHERE user_id = $1';        
        db.query(
            query, 
            [data], 
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

module.exports = {
    postSeller,
    getSellerByUserId
}