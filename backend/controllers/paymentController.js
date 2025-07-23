const paymentService = require('../services/paymentService');
const paymentModel = require('../models/paymentModel');

exports.listAllPayment = async (req, res) => {
  const { id } = req.params;

  try {
    let result;

    if (id === undefined) {
        result = await paymentService.listAllPayment();
    } else {        
        result = await paymentService.listSpecificPayment(id);
    }

    return res.status(200).json(result);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar pagamentos.' });
  }
};

exports.addNewPayment = async (req, res) => {    
    const { payType_id, totalPrice } = req.body;
    
    try {           
        const payment = await paymentModel.createPayment(payType_id, totalPrice);

        return res.status(200).json({
            message: 'Pagamento realizado com sucesso.',
            payment: payment.rows[0].id
        });
    } catch (error) {
        console.error(error.message); 
        res.status(400).json({  
            message: error.message 
        });
    }
}