const express = require('express');
const router = express.Router();
const { listarSubcategorias, criarSubcategoria } = require('../controllers/subcategoriaController');

// GET /subcategorias
router.get('/', listarSubcategorias);
// POST /subcategorias
router.post('/', criarSubcategoria);
// DELETE /subcategorias/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await require('../models/subcategoriaModel').destroy({ where: { id } });
    if (deleted) {
      res.json({ mensagem: 'Subcategoria excluída com sucesso.' });
    } else {
      res.status(404).json({ erro: 'Subcategoria não encontrada.' });
    }
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao excluir subcategoria.' });
  }
});

// PUT /subcategorias/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, tipoId } = req.body;
    const subcategoria = await require('../models/subcategoriaModel').findByPk(id);
    if (!subcategoria) {
      return res.status(404).json({ erro: 'Subcategoria não encontrada.' });
    }
    subcategoria.nome = nome || subcategoria.nome;
    subcategoria.tipoId = tipoId || subcategoria.tipoId;
    await subcategoria.save();
    res.json(subcategoria);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar subcategoria.' });
  }
});

module.exports = router;
