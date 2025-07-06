const express = require('express');
const router = express.Router();

// Lista todos os horários (inicialmente retorna array vazio)
router.get('/', async (req, res) => {
  res.json([]);
});

// Cria um novo horário (apenas retorna o corpo enviado)
router.post('/', async (req, res) => {
  res.status(201).json(req.body);
});

// Deleta um horário (fake, só retorna sucesso)
router.delete('/:id', async (req, res) => {
  res.status(204).send();
});

module.exports = router;
