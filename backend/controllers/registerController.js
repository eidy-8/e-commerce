const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const buyerModel = require("../models/buyerModel");
const sellerModel = require("../models/sellerModel");
const wishListModel = require("../models/wishListModel");

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const usersUsername = await userModel.getUserByUsername(username);
        const usersEmail = await userModel.getUserByEmail(email);

        if (usersUsername.length > 0) {
            throw new Error('O username inserido já está associado a uma conta.');
        } else if (usersEmail.length > 0) {
            throw new Error('O e-mail inserido já está associado a uma conta.');
        } else {
            const saltRounds = 10;
            const hashPassword = await bcrypt.hash(password, saltRounds);

            const newUserData = {
                username: username,
                email: email,
                password: hashPassword
            };            

            const createdUser = await userModel.postUser(newUserData);

            const buyerId = await buyerModel.postBuyer(createdUser.id);

            await wishListModel.createWishlist(buyerId);

            await sellerModel.postSeller(createdUser.id);

            return res.status(200).json({
                message: 'Usuário incluído com sucesso.'
            });
        } 
    } catch (error) {
        console.error(error.message); 
        res.status(400).json({  
            message: error.message 
        });
    }
}