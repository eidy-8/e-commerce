const categoryService = require('../services/categoryService');

exports.listAllCategories = async (req, res) => {
  const { id } = req.params;

  try {
    let result;

    if (id === undefined) {
        result = await categoryService.listAllCategories();
    } else {
        console.log("com id");
        
        result = await categoryService.listSpecificCategory(id);
    }

    return res.status(200).json(result);
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar categorias.' });
  }
};