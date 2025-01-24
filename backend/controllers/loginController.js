const jsonWebToken = require("jsonwebtoken");
const userModel = require("../models/userModel");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {        
        const usersEmail = await userModel.getUserByEmail(email);

        if (usersEmail.length > 0) {
            const isPasswordValid = await bcrypt.compare(password, usersEmail[0].password);

            if (!isPasswordValid) {
                return res.status(401).json({
                    message: 'Credencais inválidas.'
                });
            }

            const token = jsonWebToken.sign(
                { user: JSON.stringify(usersEmail[0]) },
                PRIVATE_KEY,
                { expiresIn: '60m' }
            );

            return res.status(200).json({ 
                data: { token }
            });
        } else {
            return res.status(401).json({
                message: 'Credencais inválidas.'
            });
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