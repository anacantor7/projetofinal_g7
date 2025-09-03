const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');

/**
 * Middleware de autenticação específico para administradores
 * Verifica se o token JWT é válido e se o usuário é um admin ativo
 */
const authenticateAdmin = async (req, res, next) => {
  try {
    // Extrair token do header Authorization
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acesso requerido',
        message: 'Acesso negado. Token de autenticação não fornecido.'
      });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Verificar se é um token de admin
    if (decoded.role !== 'admin') {
      return res.status(403).json({ 
        error: 'Acesso negado',
        message: 'Apenas administradores podem acessar este recurso.'
      });
    }

    // Buscar admin no banco para verificar se ainda está ativo
    const admin = await Admin.findByPk(decoded.id);
    
    if (!admin || !admin.ativo) {
      return res.status(403).json({ 
        error: 'Administrador inativo',
        message: 'Conta de administrador não encontrada ou inativa.'
      });
    }

    // Adicionar informações do admin ao request
    req.admin = {
      id: admin.id,
      nome: admin.nome,
      email: admin.email
    };

    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido',
        message: 'Token de autenticação inválido.'
      });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        message: 'Token de autenticação expirado. Faça login novamente.'
      });
    } else {
      console.error('Erro no middleware de autenticação admin:', error);
      return res.status(500).json({ 
        error: 'Erro interno',
        message: 'Erro interno do servidor durante autenticação.'
      });
    }
  }
};

/**
 * Middleware opcional para verificar permissões específicas
 * (Para futuras implementações de níveis de permissão)
 */
const requirePermission = (permission) => {
  return (req, res, next) => {
    // Por enquanto, todos os admins têm todas as permissões
    // Futuramente pode ser expandido para um sistema de roles/permissions
    if (!req.admin) {
      return res.status(401).json({ 
        error: 'Não autenticado',
        message: 'Middleware de autenticação deve ser executado primeiro.'
      });
    }
    
    // Log da atividade para auditoria
    console.log(`Admin ${req.admin.email} acessando recurso que requer permissão: ${permission}`);
    
    next();
  };
};

module.exports = {
  authenticateAdmin,
  requirePermission
};
