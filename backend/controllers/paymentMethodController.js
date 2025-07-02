const paymentMethodService = require('../services/paymentMethodService');

exports.listAllPaymentMethod = async (req, res) => {
  const { id } = req.params;

  try {
    let result;

    if (id === undefined) {
        result = await paymentMethodService.listAllPaymentMethod();
    } else {        
        result = await paymentMethodService.listSpecificPaymentMethod(id);
    }

    return res.status(200).json(result);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar métodos de pagamento.' });
  }
};