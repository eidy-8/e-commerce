const dotenv = require("dotenv");

const productModel = require("../models/productModel")

dotenv.config();

exports.listAllProduct = async (req, res) => {
    try {
        const result = await productModel.getAllProducts();
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao buscar os jogos' });
    }
};

exports.addNewProduct = async (req, res) => {
    const { name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id } = req.body;
    if (!name || !price || !isUsed || !isActive || !imageUrl || !description || !quantity || !seller_id || !category_id) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
  
    try {
      const result = await productModel.createProduct(name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id);
  
      res.status(201).json({ message: 'Produto adicionado com sucesso!'});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar o produto' });
    }
};