const bcrypt = require("bcryptjs");
const registerModel = require("../models/registerModel");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const hashEmail = await bcrypt.hash(email, saltRounds);

        const newUserData = {
            username,
            email: hashEmail,
            password: hashPassword
        };

        registerModel.postUser(newUserData);

        return res.status(200).json({
            message: 'Usuário incluído com sucesso!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao criar o usuário'})
    }
}