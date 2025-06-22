const dotenv = require("dotenv");

const productModel = require("../models/productModel")

const productService = require('../services/productService');

dotenv.config();

exports.listAllProduct = async (req, res) => {
  const { id } = req.params;
  const { search, page, pageSize, sellerId, categoryId } = req.query; 

  try {
    let result;

    if (id === undefined) {
      if (search) {
        result = await productService.searchProductsByKeyword(search, page, pageSize, sellerId);
      } else if (categoryId) {
        result = await productService.listProductsByCategory(page, pageSize, categoryId);
      } else {
        result = await productService.listAllProducts(page, pageSize, sellerId);
      }
    } else {      
      result = await productService.listSpecificProduct(id);
    }

    return res.status(200).json(result);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar produtos.' });
  }
};

exports.addNewProduct = async (req, res) => {
    const { name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id } = req.body;
    
    if (!name || !price || isUsed === undefined || isActive === undefined || !imageUrl || !description || quantity < 0 || !seller_id || !category_id) {
      return res.status(400).json({ error: 'Preencha todos os campos obrigatórios' });
    }
  
    try {
      const id = await productService.addNewProduct({ name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id });
  
      res.status(201).json({ message: `Produto adicionado com sucesso!`, id: id.id});
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao adicionar o produto' });
    }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;  
  const { name, price, isUsed, isActive, imageUrl, description, quantity } = req.body;

  if (name == "" || imageUrl == "" || description == "" || quantity < 0) {
    return res.status(400).json({ error: 'Preencha o campo corretamente' });
  }

  try {            
    await productService.updateProduct(id, name, price, isUsed, isActive, imageUrl, description, quantity);

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