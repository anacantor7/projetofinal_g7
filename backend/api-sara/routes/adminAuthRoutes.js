const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

// Login de admin
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    // Buscar admin incluyendo la contraseña (ignorar defaultScope)
    const admin = await Admin.findOne({
      where: { email, ativo: true },
      attributes: { include: ['senha'] } // Forzar incluir contraseña
    });

    if (!admin) {
      console.log('Admin no encontrado para email:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    console.log('Admin encontrado:', admin.email);
    console.log('Contraseña en BD (primeros 10 chars):', admin.senha.substring(0, 10) + '...');

    // Verificar contraseña - comparación directa temporal para debug
    let senhaValida = false;
    if (admin.senha === senha) {
      senhaValida = true;
      console.log('Contraseña verificada directamente (sin hash)');
    } else {
      console.log('Contraseña no coincide. Esperado:', senha, 'Encontrado:', admin.senha);
    }

    if (!senhaValida) {
      console.log('Contraseña inválida para admin:', admin.email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
        nome: admin.nome,
        role: 'admin'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('Login exitoso para admin:', admin.email);
    res.json({
      token: token,
      admin: {
        id: admin.id,
        nome: admin.nome,
        email: admin.email
      }
    });
  } catch (error) {
    console.error('Error en login de admin:', error);
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

// Debug endpoint temporal - REMOVER EN PRODUCCIÓN
router.get('/debug-admin', async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: { email: 'admin@salao.com' },
      attributes: { include: ['senha'] }
    });

    if (!admin) {
      return res.json({ error: 'Admin no encontrado' });
    }

    res.json({
      id: admin.id,
      nome: admin.nome,
      email: admin.email,
      senha_hash: admin.senha,
      senha_length: admin.senha.length,
      ativo: admin.ativo
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
