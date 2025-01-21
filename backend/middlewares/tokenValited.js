const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;

exports.tokenValited = (request, response, next) => {    
    const [, token] = request.headers.authorization?.split(' ') || [' ', ' '];

    if (!token) return response.status(401).send('Access denied. No token provided.');

    try {
        const payload = jsonwebtoken.verify(token, PRIVATE_KEY);
        const userIdFromToken = typeof payload !== 'string' && payload.user;

        if (!userIdFromToken) {
            return response.send(404).json({ message: 'User not found' });
        }

        request.headers['user'] = payload.user;
        return next();
    } catch (error) {
        console.log(error);
        return response.status(401).json({ message: 'Invalid token' });
    }
}