const Subcategoria = require('../models/subcategoriaModel');

// Listar todas las subcategorias
async function listarSubcategorias(req, res) {
  try {
    const subcategorias = await Subcategoria.findAll();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar subcategorias.' });
  }
}

// Crear una nueva subcategoria
async function crearSubcategoria(req, res) {
  const { nome, tipoId } = req.body;
  try {
    if (!nome || !tipoId) {
      return res.status(400).json({ erro: 'Nome e tipoId são obrigatórios.' });
    }
    const subcategoria = await Subcategoria.create({ nome, tipoId });
    res.status(201).json(subcategoria);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar subcategoria.' });
  }
}

module.exports = { listarSubcategorias, criarSubcategoria: crearSubcategoria };
