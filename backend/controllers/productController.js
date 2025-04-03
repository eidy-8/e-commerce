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
  
      res.status(201).json({ message: `Produto adicionado com sucesso!`});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar o produto' });
    }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id } = req.body;

  try {
      await productModel.updateProduct(id, name, price, isUsed, isActive, imageUrl, description, quantity);

      res.json({ message: `Produto atualizado com sucesso!` });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao atualizar o produto' });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {

    const result = await productModel.deleteProduct(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar o produto' });
  }
};