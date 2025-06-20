const Tipo = require("../models/tipoModel");

// GET /tipos
async function listarTipos(req, res) {
  try {
    const tipos = await Tipo.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao listar tipos de serviço",
    });
  }
}

// GET /tipos/:id
async function buscarTipoPorId(req, res) {
  const { id } = req.params;

  try {
    const tipo = await Tipo.findByPk(id);

    if (!tipo) {
      return res.status(404).json({ erro: "Tipo de serviço não encontrado" });
    }

    res.status(200).json(tipo);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar tipo de serviço",
    });
  }
}

// POST /tipos
async function criarTipo(req, res) {
  try {
    const novoTipo = await Tipo.create(req.body);
    res.status(201).json(novoTipo);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao criar tipo de serviço",
    });
  }
}

module.exports = {
  listarTipos,
  buscarTipoPorId,
  criarTipo,
};
