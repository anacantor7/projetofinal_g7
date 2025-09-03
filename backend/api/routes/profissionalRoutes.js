// routes/profissionalRoutes.js

const express = require('express');
const router = express.Router();

const {
  listarProfissionais,
  buscarProfissionalPorId,
  criarProfissional,
  atualizarProfissional,
  toggleAtivo,
  deletarProfissional,
} = require('../controllers/profissionalController');

// GET /profissionais
router.get('/', listarProfissionais);

// GET /profissionais/:id
router.get('/:id', buscarProfissionalPorId);

// POST /profissionais
router.post('/', criarProfissional);

// PUT /profissionais/:id
router.put('/:id', atualizarProfissional);

// PUT /profissionais/:id/ativo
router.put('/:id/ativo', toggleAtivo);

// DELETE /profissionais/:id
router.delete('/:id', deletarProfissional);

module.exports = router;
