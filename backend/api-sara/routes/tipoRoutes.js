const express = require('express');
const router = express.Router();

const {
  listarTipos,
  criarTipo,
  buscarTipoPorId,
} = require('../controllers/tipoController');

// GET /tipos
router.get('/', listarTipos);

// GET /tipos/:id
router.get('/:id', buscarTipoPorId);

// POST /tipos
router.post('/', criarTipo);

module.exports = router;
