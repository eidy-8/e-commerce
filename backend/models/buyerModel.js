const db = require("../db/db");

async function postBuyer(data) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Buyer (user_id) VALUES ($1)";
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

async function getBuyerByUserId(userId) {
    return new Promise((resolve, reject) => {
        const query = "SELECT id FROM Buyer WHERE user_id = $1";
        db.query(query, [userId], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.rows[0]); 
            }
        });
    });
}

module.exports = {
    postBuyer,
    getBuyerByUserId
}