const { LogAcao } = require('../models/logAcaoModel');

// Controlador para registrar ação
async function registrarAcao(req, res) {
  const { usuario, acao } = req.body;
  try {
    if (!usuario || !acao) {
      return res.status(400).json({ erro: 'Usuário e ação são obrigatórios.' });
    }
    // Salvar no banco de dados
    await LogAcao.create({ usuario, acao });
    res.status(201).json({ mensagem: 'Ação registrada com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao registrar ação.' });
  }
}

// Controlador para listar logs
async function listarLogs(req, res) {
  try {
    const logs = await LogAcao.findAll({ order: [['dataHora', 'DESC']] });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar logs.' });
  }
}

module.exports = { registrarAcao, listarLogs };
