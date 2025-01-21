const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const middlewares = require('./middlewares/tokenValited');

dotenv.config();

const env = process.env;
const port = env.EX_PORT;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.status(200).json( {
    message: 'Isso é uma router pública...'
}));

app.use('/register', registerRoute);

app.use('/login', loginRoute);

app.use('*', middlewares.tokenValited);

app.use('/private', (req, res) => {
    const { user } = req.headers
    const currentUser = JSON.parse(user);
    return res.status(200).json({
        message: 'Isso é uma router privada...',
        data: {
            userLogged: currentUser
        }
    })
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
});