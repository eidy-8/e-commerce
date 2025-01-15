const db = require("../db/db");

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
    postUser
};