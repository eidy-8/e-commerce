const paymentMethodModel = require("../models/paymentMethodModel")

exports.listAllPaymentMethod = async () => {
    try {
    
        const paymentMethod = await paymentMethodModel.getAllPaymentMethod();

        return {
            data: paymentMethod
        }
   
    } catch (err) {
        console.error('Erro ao listar métodos de pagamento', err);
        throw err;
    }
};

exports.listSpecificPaymentMethod = async (id) => {
    try {
        const paymentMethod = await paymentMethodModel.listSpecificPaymentMethod(id);

        return {
            data: paymentMethod
        }
    } catch (err) {
        console.error('Erro ao listar métodos de pagamento', err);
        throw err;
    }
};