const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');
const registerRoute = require('./routes/registerRoute')

// const db = require('./db/db')

// app.get('/', async (req, res) => {
//     try {
//         const result = await db.query('SELECT * FROM Users');
//         res.json(result.rows);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Internal Server Error');
//     }
// });

dotenv.config();
const env = process.env;
const port = env.EX_PORT;

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.status(200).json( {
    message: 'Isso é uma router pública...'
}));

app.use('/register', registerRoute)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})