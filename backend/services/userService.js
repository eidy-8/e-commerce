const userModel = require("../models/userModel");

async function findUserByEmail(email) {
    try {
        const user = await userModel.getUserByEmail(email);
        return user;
    } catch (error) {
        throw new Error("Erro ao buscar usuário por e-mail.");
    }
};

async function findUserByUsername(username) {
    try {
        const user = await userModel.getUserByUsername(username);
        return user;
    } catch (error) {
        throw new Error("Erro ao buscar usuário por username.");
    }
};

async function createUser({ username, email, password }) {
    try {
        return await userModel.postUser({ username, email, password });
    } catch (error) {
        throw new Error("Erro ao criar usuário.");
    }
};

module.exports = {
    findUserByEmail,
    findUserByUsername,
    createUser
};