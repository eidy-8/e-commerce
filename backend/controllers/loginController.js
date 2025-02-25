const jsonWebToken = require("jsonwebtoken");
const userService = require("../services/userService");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {        
        const user = await userService.findUserByEmail(email);    
                
        if (!user) {
            return res.status(401).json({ message: "Preencha o campo E-mail." });
        }

        if (!password) {
            return res.status(401).json({ message: "Insira a sua senha." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);       
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        const token = jsonWebToken.sign(
            { user: JSON.stringify(user) },
            PRIVATE_KEY,
            { expiresIn: "60m" }
        );

        return res.status(200).json({ data: { token } });
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
            valid: true,
            token: token
        });
    });
};