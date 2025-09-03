const Tipo = require("../models/tipoModel");

// GET /tipos
async function listarTipos(req, res) {
  try {
    const tipos = await Tipo.findAll();
    res.status(200).json(tipos);
  } catch (error) {
    console.error('Erro ao listar tipos de serviço:', error);
    res.status(500).json({
      erro: error.message || String(error),
      stack: error.stack
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
    // التحقق من وجود نوع خدمة بنفس الاسم
    const tipoExistente = await Tipo.findOne({
      where: { nome: req.body.nome },
    });

    if (tipoExistente) {
      return res.status(400).json({
        erro: "Já existe um tipo de serviço cadastrado com esse nome.",
      });
    }

    // إنشاء النوع الجديد
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
