// const Cliente = require("../models/clienteModel");

// GET /clientes
async function listarClientes(req, res) {
  const { ativo } = req.query;

  try {
    const where = {};

    // إذا تم إرسال ?ativo=true أو false
    if (ativo !== undefined) {
      where.ativo = ativo === "true";
    }

    const clientes = await Cliente.findAll({ where });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar clientes",
    });
  }
}

// GET /clientes/:id
async function buscarClientePorId(req, res) {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar cliente",
    });
  }
}

// POST /clientes
async function criarCliente(req, res) {
  const { nome, telefone, observacoes } = req.body;

  try {
    // التحقق إن كان العميل مسجل مسبقًا بنفس الاسم ورقم الهاتف
    const clienteExistente = await Cliente.findOne({
      where: { nome, telefone },
    });

    if (clienteExistente) {
      return res.status(400).json({
        erro: "Já existe um cliente cadastrado com esse nome e telefone.",
      });
    }

    // إنشاء العميل إذا لم يكن موجودًا
    const novoCliente = await Cliente.create({ nome, telefone, observacoes });

    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao criar cliente",
    });
  }
}

// PUT /clientes/:id
async function atualizarCliente(req, res) {
  const { id } = req.params;
  const { nome, telefone, observacoes } = req.body;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente)
      return res.status(404).json({ erro: "Cliente não encontrado" });

    cliente.nome = nome;
    cliente.telefone = telefone;
    cliente.observacoes = observacoes;
    cliente.ativo =
      req.body.ativo !== undefined ? req.body.ativo : cliente.ativo;
    await cliente.save();

    res.status(200).json(cliente);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar cliente",
    });
  }
}

// PUT /clientes/:id/ativo
async function toggleClienteAtivo(req, res) {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ erro: "Cliente não encontrado" });
    }

    cliente.ativo = !cliente.ativo;
    await cliente.save();

    res.status(200).json({
      mensagem: `Cliente ${cliente.ativo ? "ativado" : "desativado"}`,
    });
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar status do cliente",
    });
  }
}

// DELETE /clientes/:id
async function deletarCliente(req, res) {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (!cliente)
      return res.status(404).json({ erro: "Cliente não encontrado" });

    await cliente.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao deletar cliente",
    });
  }
}

module.exports = {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  toggleClienteAtivo,
  deletarCliente,
};
