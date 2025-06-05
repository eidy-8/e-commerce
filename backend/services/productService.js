const productModel = require('../models/productModel');

exports.addNewProduct = async (productData) => {
    let { name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id } = productData;

    if (quantity <= 0) {
        isActive = 'F';
    }

    const result = await productModel.createProduct(name, price, isUsed, isActive, imageUrl, description, quantity, seller_id, category_id);
    
    return result.rows[0];
};

exports.updateProduct = async (id, name, price, isUsed, isActive, imageUrl, description, quantity) => {    
    if (quantity <= 0) {
        isActive = 'F';
    }

    const updatedAt = new Date();
    updatedAt.setHours(updatedAt.getHours() - 6); 
    const formattedDate = updatedAt.toISOString();

    await productModel.updateProduct(id, name, price, isUsed, isActive, imageUrl, description, quantity, formattedDate);
};

exports.listAllProducts = async (page, pageSize, sellerId) => {
    const offset = (page - 1) * pageSize; 
    const limit = parseInt(pageSize, 10); 
    
    try {
        if (!pageSize) {
            const products = await productModel.getAllProducts();

            return {
                data: products
            }
        } else {
            const products = await productModel.getPagedProducts(offset, limit, sellerId);
            const totalProducts = await productModel.countAllProducts(sellerId);
            const hasNext = (page * pageSize) < totalProducts;
    
            return {
                data: products,
                hasNext
            };
        }
    } catch (err) {
        console.error('Erro ao listar produtos com paginação:', err);
        throw err;
    }
};

exports.searchProductsByKeyword = async (keyword, page, pageSize, sellerId) => {
    const searchKeyword = `%${keyword}%`;
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize, 10);

    try {        
        const products = await productModel.searchProductsByKeyword(searchKeyword, offset, limit, sellerId);

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

exports.listSpecificProduct = async (id, sellerId) => {
    try {
        const products = await productModel.getSpecificProduct(id, sellerId);

        return {
            data: products
        }
    } catch (err) {
        console.error('Erro ao listar produtos com paginação:', err);
        throw err;
    }
};