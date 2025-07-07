const express = require('express');
const router = express.Router();
const { registrarAcao, listarLogs } = require('../controllers/logController');

// POST /api/log-acao
router.post('/log-acao', registrarAcao);
// GET /api/log-acao
router.get('/log-acao', listarLogs);

module.exports = router;
