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

module.exports = {
    getUserByUsername
}