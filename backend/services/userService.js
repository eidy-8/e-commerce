const userModel = require("../models/userModel");
const db = require("../db/db");

// async function findUserByEmail(email) {
//     try {
//         const user = await userModel.getUserByEmail(email);
//         return user.length > 0 ? user[0] : null;
//     } catch (error) {
//         throw new Error("Erro ao buscar usuário por e-mail.");
//     }
// }

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

module.exports = {
    // findUserByEmail,
    getUserByEmail
};