const express = require('express');
const router = express.Router();
const Cliente = require('../models/clienteModel');

// Obtener todos los administradores
router.get('/', async (req, res) => {
  try {
    const admins = await Cliente.findAll({ where: { role: 'admin' } });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar administradores' });
  }
});

// Crear un nuevo administrador
router.post('/', async (req, res) => {
  try {
    const { nome, telefone, email, senha } = req.body;
    const [admin, created] = await Cliente.findOrCreate({
      where: { email },
      defaults: {
        nome,
        telefone,
        email,
        senha,
        ativo: true,
        role: 'admin',
      },
    });
    if (created) {
      res.status(201).json(admin);
    } else {
      res.status(409).json({ error: 'Administrador já existe' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar administrador' });
  }
});

// Actualizar administrador
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, telefone, email, senha, ativo } = req.body;
    const admin = await Cliente.findByPk(id);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ error: 'Administrador não encontrado' });
    }
    await admin.update({ nome, telefone, email, senha, ativo });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar administrador' });
  }
});

// Eliminar administrador
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Cliente.findByPk(id);
    if (!admin || admin.role !== 'admin') {
      return res.status(404).json({ error: 'Administrador não encontrado' });
    }
    await admin.destroy();
    res.json({ message: 'Administrador removido com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover administrador' });
  }
});

module.exports = router;
