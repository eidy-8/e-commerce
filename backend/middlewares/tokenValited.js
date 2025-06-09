const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.tokenValited = (request, response, next) => {    
    const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];
    
    if (token == 0) {        
        return response.status(401).send('Nenhum token fornecido.');  
    } 

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;

        if (!userIdFromToken) {
            return response.send(404).json({ message: 'Usuário não encontrado.' });
        }

        request.headers['user'] = payload.user;
        return next();
    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Token inválido ou expirado.' });
    }
}