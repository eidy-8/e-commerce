const express = require('express');
const app = express();
const dotenv = require("dotenv");
const cors = require('cors');

const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const productRoute = require('./routes/productRoute');
const categoryRoute = require('./routes/categoryRoute');
const wishListRoute = require('./routes/wishListRoute');
const cartRoute = require('./routes/cartRoute');
const paymentMethodRoute = require('./routes/paymentMethodRoute');
const paymentRoute = require('./routes/paymentRoute')
const orderRoute = require('./routes/orderRoute');

const middlewares = require('./middlewares/tokenValited');

dotenv.config();

const env = process.env;
const port = env.EX_PORT;

const sellerModel = require('./models/sellerModel');
const buyerModel = require('./models/buyerModel');

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => res.status(200).json( {
    message: 'Isso é uma router pública...'
}));

app.use('/register', registerRoute);

app.use('/login', loginRoute);

app.use('/product', productRoute);

app.use('/category', categoryRoute);

app.use('*', middlewares.tokenValited);

app.use('/paymentMethod', paymentMethodRoute);

app.use('/payment', paymentRoute);

app.use('/cart', cartRoute);

app.use('/wishList', wishListRoute);

app.use('/order', orderRoute);

app.use('/private', async (req, res) => {
    try {
        const { user } = req.headers;
        
        const currentUser = JSON.parse(user);

        const seller = await sellerModel.getSellerByUserId(currentUser[0].id);
        const buyer = await buyerModel.getBuyerByUserId(currentUser[0].id);

        return res.status(200).json({
            message: 'Isso é uma router privada...',
            data: {
                userLogged: currentUser,
                sellerId: seller ? seller.id : null,
                buyerId: buyer ? buyer.id : null  
            }
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Erro interno no servidor.',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
});