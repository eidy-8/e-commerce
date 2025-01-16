const bcrypt = require("bcryptjs");
const registerModel = require("../models/registerModel");
const userModel = require("../models/userModel");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const usersUsername = await userModel.getUserByUsername(username);
        const usersEmail = await userModel.getUserByEmail(email);

        if (usersUsername.length > 0) {
            return res.status(400).json({
                message: 'O username inserido já está associado a uma conta.'
            });
        } else if (usersEmail.length > 0) {
            return res.status(400).json({
                message: 'O e-mail inserido já está associado a uma conta.'
            });
        } else {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);

            const newUserData = {
                username,
                email: email,
                password: hashPassword
            };

            registerModel.postUser(newUserData);

            return res.status(200).json({
                message: 'Usuário incluído com sucesso.'
            });
        } 
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: 'Erro ao criar o usuário'
        })
    }
}