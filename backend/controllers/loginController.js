const jsonWebToken = require("jsonwebtoken");
const loginModel = require("../models/loginModel")
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.login = async (req, res) => {
    const { username, email, password } = req.body;

    try {        
        const user = await loginModel.getUserByUsername(username);

        if (user.length > 0) {
            const isEmailValid = await bcrypt.compare(email, user[0].email);
            const isPasswordValid = await bcrypt.compare(password, user[0].password);

            if (!isEmailValid || !isPasswordValid) {
                return res.status(401).json({message: 'Credencais inválidas. Verifique o usuário e a senha.'})
            }

            const token = jsonWebToken.sign(
                { user: JSON.stringify(user[0]) },
                PRIVATE_KEY,
                { expiresIn: '60m' }
            );

            return res.status(200).json({ data: { token, isLogged: true }});
        } else {
            return res.json({ data: { isLogged: false } });
        }
    } catch (error) {
        console.log(error);
        return res.send(error);
    }
};

exports.verifyToken = async (req, res) => {
    const token = req.body.token;

    if (!token) return res.status(403).send({ message: 'Nenhum token fornecido.' });

    jsonWebToken.verify(token, PRIVATE_KEY, (err) => {
        if (err) {
            return res.status(401).send({ message: 'Token inválido ou expirado.' });
        }

        res.status(200).send({
            valid: true
        });
    });
};