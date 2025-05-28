const categoryModel = require("../models/categoryModel")

exports.listAllCategories = async () => {
    try {
    
        const categories = await categoryModel.getAllCategories();

        return {
            data: categories
        }
   
    } catch (err) {
        console.error('Erro ao listar categorias', err);
        throw err;
    }
};

exports.listSpecificCategory = async (id) => {
    try {
        const categorie = await categoryModel.listSpecificCategory(id);

        return {
            data: categorie
        }
    } catch (err) {
        console.error('Erro ao listar a categoria', err);
        throw err;
    }
};