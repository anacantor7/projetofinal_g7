const Profissional = require("../models/profissionalModel");

// GET /profissionais
async function listarProfissionais(req, res) {
  const { ativo, especialidade } = req.query;

  const where = {};

  if (ativo !== undefined) {
    where.ativo = ativo === "true";
  }

  if (especialidade !== undefined) {
    where.especialidade = especialidade;
  }

  try {
    const profissionais = await Profissional.findAll({ where });
    res.status(200).json(profissionais);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar profissionais",
    });
  }
}

// GET /profissionais/:id
async function buscarProfissionalPorId(req, res) {
  const { id } = req.params;
  try {
    const profissional = await Profissional.findByPk(id);

    if (!profissional || profissional.ativo === false) {
      return res.status(404).json({ erro: "Profissional não encontrado" });
    }

    res.status(200).json(profissional);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar profissional",
    });
  }
}

// POST /profissionais
async function criarProfissional(req, res) {
  try {
    const novo = await Profissional.create(req.body);
    res.status(201).json(novo);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao criar profissional",
    });
  }
}

// PUT /profissionais/:id
async function atualizarProfissional(req, res) {
  const { id } = req.params;
  try {
    const profissional = await Profissional.findByPk(id);
    if (!profissional) {
      return res.status(404).json({ erro: "Profissional não encontrado" });
    }

    await profissional.update(req.body);
    res.status(200).json(profissional);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar profissional",
    });
  }
}

// PUT /profissionais/:id/ativo
async function toggleAtivo(req, res) {
  const { id } = req.params;
  try {
    const profissional = await Profissional.findByPk(id);
    if (!profissional) {
      return res.status(404).json({ erro: "Profissional não encontrado" });
    }

    profissional.ativo = !profissional.ativo;
    await profissional.save();

    res.status(200).json({
      mensagem: `Profissional ${profissional.ativo ? "ativado" : "desativado"}`,
    });
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar status de ativação",
    });
  }
}

module.exports = {
  listarProfissionais,
  buscarProfissionalPorId,
  criarProfissional,
  atualizarProfissional,
  toggleAtivo,
};
