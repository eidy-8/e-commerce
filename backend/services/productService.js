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

exports.listAllProducts = async (page, pageSize) => {
    const offset = (page - 1) * pageSize; 
    const limit = parseInt(pageSize, 10); 

    try {
        const products = await productModel.getAllProducts(offset, limit);

        const totalProducts = await productModel.countAllProducts();
        const hasNext = (page * pageSize) < totalProducts;

        return {
            data: products,
            hasNext
        };
    } catch (err) {
        console.error('Erro ao listar produtos com paginação:', err);
        throw err;
    }
};

exports.searchProductsByKeyword = async (keyword, page, pageSize) => {
    const searchKeyword = `%${keyword}%`;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize, 10);

    try {        
        const products = await productModel.searchProductsByKeyword(searchKeyword, offset, limit);

        const totalProducts = await productModel.countProductsByKeyword(searchKeyword);
        const hasNext = (page * pageSize) < totalProducts;

        return {
            data: products,
            hasNext
        };
    } catch (err) {
        console.error('Erro ao buscar produtos por palavra-chave com paginação:', err);
        throw err;
    }
};