const paymentModel = require("../models/paymentModel")

exports.listAllPayment = async () => {
    try {
    
        const payment = await paymentModel.getAllPayment();

        return {
            data: payment
        }
   
    } catch (err) {
        console.error('Erro ao listar pagamentos', err);
        throw err;
    }
};

exports.listSpecificPayment = async (id) => {
    try {
        const payment = await paymentModel.listSpecificPayment(id);

        return {
            data: payment
        }
    } catch (err) {
        console.error('Erro ao listar pagamentos', err);
        throw err;
    }
};