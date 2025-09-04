const express = require('express');
const router = express.Router();
const Admin = require('../models/adminModel');
const { authenticateAdmin, requirePermission } = require('../middlewares/adminAuth');

// Aplicar middleware de autenticação para todas as rotas admin
router.use(authenticateAdmin);

// Obtener todos los administradores - requer autenticação de admin
router.get('/', requirePermission('view_admins'), async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error('Erro ao buscar administradores:', error);
    res.status(500).json({ error: 'Erro ao buscar administradores' });
  }
});

// Crear un nuevo administrador - requer autenticação de admin
router.post('/', requirePermission('create_admin'), async (req, res) => {
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

// Buscar um administrador por ID - requer autenticação de admin
router.get('/:id', requirePermission('view_admin'), async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Administrador não encontrado' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Erro ao buscar administrador:', error);
    res.status(500).json({ error: 'Erro ao buscar administrador' });
  }
});

// Actualizar un administrador - requer autenticação de admin
router.put('/:id', requirePermission('update_admin'), async (req, res) => {
  try {
    const { nome, email, senha, ativo } = req.body;
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    await admin.update({ nome, email, senha, ativo });
    res.json(admin);
  } catch (error) {
    console.error('Erro ao atualizar administrador:', error);
    res.status(500).json({ error: 'Erro ao atualizar admin' });
  }
});

// Eliminar un administrador - requer autenticação de admin
router.delete('/:id', requirePermission('delete_admin'), async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin não encontrado' });
    }
    await admin.destroy();
    res.json({ message: 'Admin eliminado com sucesso' });
  } catch (error) {
    console.error('Erro ao eliminar administrador:', error);
    res.status(500).json({ error: 'Erro ao eliminar admin' });
  }
});

module.exports = router;
