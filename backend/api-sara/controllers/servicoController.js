const Servico = require("../models/servicoModel");
const Tipo = require("../models/tipoModel");

// GET /servicos
async function listarServicos(req, res) {
  const { ativo } = req.query;

  try {
    const where = {};

    // إذا تم إرسال ?ativo=true أو false
    if (ativo !== undefined) {
      where.ativo = ativo === "true";
    }

    const servicos = await Servico.findAll({
      where,
      include: {
        model: Tipo,
        attributes: ["id", "nome"], // فقط عرض اسم النوع المرتبط
      },
    });

    res.status(200).json(servicos);
  } catch (error) {
    console.error('Erro ao listar serviços:', error);
    res.status(500).json({
      erro: error.message || String(error),
      stack: error.stack
    });
  }
}

// GET /servicos/:id
async function buscarServicoPorId(req, res) {
  const { id } = req.params;
  try {
    const servico = await Servico.findByPk(id);
    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }
    res.status(200).json(servico);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar serviço",
    });
  }
}

// POST /servicos
async function criarServico(req, res) {
  const { nome, duracao, preco, tipoId } = req.body;

  try {
    // التحقق من وجود خدمة بنفس الاسم
    const servicoExistente = await Servico.findOne({
      where: { nome },
    });

    if (servicoExistente) {
      return res.status(400).json({
        erro: "Já existe um serviço cadastrado com esse nome.",
      });
    }

    // إنشاء الخدمة الجديدة
    const novoServico = await Servico.create({
      nome,
      duracao,
      preco,
      tipoId,
    });

    res.status(201).json(novoServico);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao criar serviço",
    });
  }
}

// PUT /servicos/:id
async function atualizarServico(req, res) {
  const { id } = req.params;
  const { nome, duracao, preco, tipoId, ativo } = req.body;
  try {
    const servico = await Servico.findByPk(id);
    if (!servico)
      return res.status(404).json({ erro: "Serviço não encontrado" });

    servico.nome = nome;
    servico.duracao = duracao;
    servico.preco = preco;
    servico.tipoId = tipoId;
    servico.ativo = ativo !== undefined ? ativo : servico.ativo;

    await servico.save();

    res.status(200).json(servico);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar serviço",
    });
  }
}

// PUT /servicos/:id/ativo
async function toggleServicoAtivo(req, res) {
  const { id } = req.params;

  try {
    const servico = await Servico.findByPk(id);
    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }

    servico.ativo = !servico.ativo;
    await servico.save();

    res.status(200).json({
      mensagem: `Serviço ${servico.ativo ? "ativado" : "desativado"}`,
    });
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar status do serviço",
    });
  }
}

// DELETE /servicos/:id
async function deletarServico(req, res) {
  const { id } = req.params;
  try {
    const servico = await Servico.findByPk(id);
    if (!servico)
      return res.status(404).json({ erro: "Serviço não encontrado" });

    await servico.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao deletar serviço",
    });
  }
}

module.exports = {
  listarServicos,
  buscarServicoPorId,
  criarServico,
  atualizarServico,
  toggleServicoAtivo,
  deletarServico,
};
