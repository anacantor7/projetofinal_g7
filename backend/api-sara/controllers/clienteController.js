const Cliente = require("../models/clienteModel");

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
    console.error('Erro ao buscar clientes:', error);
    res.status(500).json({
      erro: error.message || String(error),
      stack: error.stack
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
  const { nome, telefone, email, senha } = req.body;

  try {
    // Verificar si ya existe un cliente con el mismo email
    const clienteExistente = await Cliente.findOne({
      where: { email },
    });

    if (clienteExistente) {
      return res.status(400).json({
        erro: "Já existe um cliente cadastrado com esse email.",
      });
    }

    // Crear el cliente si no existe
    const novoCliente = await Cliente.create({ nome, telefone, email, senha });

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

// POST /clientes/login
const jwt = require('jsonwebtoken');

async function loginCliente(req, res) {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios." });
    }
    // Buscar cliente incluyendo la contraseña (ignorar defaultScope)
    const cliente = await Cliente.findOne({
      where: { email, ativo: true },
      attributes: { include: ['senha'] } // Forzar incluir contraseña
    });
    if (!cliente) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
    }

    // Verificar contraseña - comparación directa temporal para debug
    let senhaValida = false;
    if (cliente.senha === senha) {
      senhaValida = true;
      console.log('Contraseña de cliente verificada directamente (sin hash)');
    } else {
      console.log('Contraseña de cliente no coincide. Esperado:', senha, 'Encontrado:', cliente.senha);
    }

    if (!senhaValida) {
      return res.status(401).json({ erro: "Email ou senha inválidos." });
    }

    // Generar token JWT
    const token = jwt.sign(
      {
        id: cliente.id,
        email: cliente.email,
        nome: cliente.nome,
        role: 'cliente'
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      mensagem: "Login bem-sucedido",
      token: token,
      cliente: {
        id: cliente.id,
        nome: cliente.nome,
        email: cliente.email
      },
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao realizar login" });
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
  loginCliente,
};
