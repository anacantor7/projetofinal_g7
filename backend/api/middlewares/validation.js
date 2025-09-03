// middlewares/validation.js - Middleware de validação de dados
const { body, validationResult } = require('express-validator');

// Middleware para verificar resultados de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      erro: 'Dados inválidos',
      detalhes: errors.array()
    });
  }
  next();
};

// Validações para Cliente
const validateCliente = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim()
    .escape(),
  
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail()
    .isLength({ max: 150 })
    .withMessage('Email muito longo'),
  
  body('telefone')
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/)
    .withMessage('Formato de telefone inválido'),
  
  body('senha')
    .isLength({ min: 6, max: 50 })
    .withMessage('Senha deve ter entre 6 e 50 caracteres'),
  
  handleValidationErrors
];

// Validações para Profissional
const validateProfissional = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim()
    .escape(),
  
  body('telefone')
    .notEmpty()
    .withMessage('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$|^\d{10,11}$/)
    .withMessage('Formato de telefone inválido'),
  
  body('especialidade')
    .notEmpty()
    .withMessage('Especialidade é obrigatória')
    .isLength({ min: 2, max: 50 })
    .withMessage('Especialidade deve ter entre 2 e 50 caracteres')
    .trim()
    .escape(),
  
  handleValidationErrors
];

// Validações para Serviço
const validateServico = [
  body('nome')
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 100 })
    .withMessage('Nome deve ter entre 2 e 100 caracteres')
    .trim()
    .escape(),
  
  body('duracao')
    .isInt({ min: 1, max: 480 })
    .withMessage('Duração deve ser entre 1 e 480 minutos'),
  
  body('preco')
    .isFloat({ min: 0 })
    .withMessage('Preço deve ser um valor positivo'),
  
  body('tipoId')
    .isInt({ min: 1 })
    .withMessage('Tipo ID deve ser um número inteiro positivo'),
  
  handleValidationErrors
];

// Validações para Agendamento
const validateAgendamento = [
  body('clienteId')
    .isInt({ min: 1 })
    .withMessage('Cliente ID deve ser um número inteiro positivo'),
  
  body('servicoId')
    .isInt({ min: 1 })
    .withMessage('Serviço ID deve ser um número inteiro positivo'),
  
  body('profissionalId')
    .isInt({ min: 1 })
    .withMessage('Profissional ID deve ser um número inteiro positivo'),
  
  body('data')
    .isDate()
    .withMessage('Data inválida')
    .custom((value) => {
      const agendamentoDate = new Date(value);
      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);
      
      if (agendamentoDate < hoje) {
        throw new Error('Data do agendamento não pode ser no passado');
      }
      return true;
    }),
  
  body('hora')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage('Formato de hora inválido (HH:MM)'),
  
  handleValidationErrors
];

// Validações para Login
const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail(),
  
  body('senha')
    .notEmpty()
    .withMessage('Senha é obrigatória'),
  
  handleValidationErrors
];

module.exports = {
  validateCliente,
  validateProfissional,
  validateServico,
  validateAgendamento,
  validateLogin,
  handleValidationErrors
};
