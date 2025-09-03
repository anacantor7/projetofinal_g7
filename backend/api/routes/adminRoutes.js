const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');

// Obtener todos los administradores
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar administradores' });
  }
});

// Crear un nuevo administrador
router.post('/', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const [admin, created] = await Admin.findOrCreate({
      where: { email },
      defaults: { nome, email, senha, ativo: true }
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

// Actualizar un administrador
router.put('/:id', async (req, res) => {
  try {
    const { nome, email, senha, ativo } = req.body;
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    await admin.update({ nome, email, senha, ativo });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar admin' });
  }
});

// Eliminar un administrador
router.delete('/:id', async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    await admin.destroy();
    res.json({ message: 'Admin eliminado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao eliminar admin' });
  }
});

module.exports = router;
