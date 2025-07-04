const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');

// Login de admin
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email, senha, ativo: true } });
    if (!admin) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    res.json({ id: admin.id, nome: admin.nome, email: admin.email });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

// Crear admin (solo para pruebas, eliminar en producción)
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: { nome, senha, ativo: true }
    });
    if (created) {
      res.status(201).json(admin);
    } else {
      res.status(409).json({ error: 'Admin já existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar admin' });
  }
});

module.exports = router;
