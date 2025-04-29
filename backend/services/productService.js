const productModel = require('../models/productModel');

exports.addNewProduct = async (productData) => {
    let { name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id } = productData;

    if (quantity <= 0) {
        isActive = 'F';
    }

    await productModel.createProduct(name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id);
};

exports.updateProduct = async (id, name, price, isUsed, isActive, imageUrl, description, quantity) => {    
    if (quantity <= 0) {
        isActive = 'F';
    }

    await productModel.updateProduct(id, name, price, isUsed, isActive, imageUrl, description, quantity);
};