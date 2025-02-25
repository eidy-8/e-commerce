const userModel = require("../models/userModel");

async function findUserByEmail(email) {
    try {
        const user = await userModel.getUserByEmail(email);
        return user.length > 0 ? user[0] : null;
    } catch (error) {
        throw new Error("Erro ao buscar usuário por e-mail.");
    }
};

async function findUserByUsername(username) {
    try {
        const user = await userModel.getUserByUsername(username);
        return user.length > 0 ? user[0] : null;
    } catch (error) {
        throw new Error("Erro ao buscar usuário por username.");
    }
};

async function createUser({ username, email, password }) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await userModel.postUser({ username, email, password: hashedPassword });
    } catch (error) {
        throw new Error("Erro ao criar usuário.");
    }
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    createUser
};