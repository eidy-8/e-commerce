const db = require("../db/db");

async function getUserByUsername(data) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM Users WHERE username = $1';        
        db.query(
            query, 
            [data], 
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
    getUserByUsername
}