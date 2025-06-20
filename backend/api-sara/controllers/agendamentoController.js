const Agendamento = require("../models/agendamentoModel");
const Cliente = require("../models/clienteModel");
const Servico = require("../models/servicoModel");
const Tipo = require("../models/tipoModel");
const Profissional = require("../models/profissionalModel");

// GET /agendamentos
async function listarAgendamentos(req, res) {
  try {
    const { data, clienteId, profissionalId, hora } = req.query;

    const where = {};

    if (data) where.data = data;
    if (clienteId) where.clienteId = clienteId;
    if (profissionalId) where.profissionalId = profissionalId;
    if (data && hora) {
      where.data = data;
      where.hora = hora;
    }

    const agendamentos = await Agendamento.findAll({
      where,
      include: [
        {
          model: Cliente,
          attributes: ["id", "nome", "telefone"],
        },
        {
          model: Servico,
          attributes: ["id", "nome", "duracao", "preco"],
        },
        {
          model: Profissional,
          attributes: ["id", "nome", "especialidade"],
        },
      ],
    });

    res.status(200).json(agendamentos);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar agendamentos",
    });
  }
}

// GET /agendamentos/:id
async function buscarAgendamentoPorId(req, res) {
  const { id } = req.params;
  try {
    const agendamento = await Agendamento.findByPk(id, {
      include: [Cliente, Servico, Profissional],
    });
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }
    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao buscar agendamento",
    });
  }
}

// POST /agendamentos
async function criarAgendamento(req, res) {
  const { clienteId, servicoId, profissionalId, data, hora } = req.body;

  try {
    // التحقق من ساعات العمل
    const horarioAbertura = "09:00";
    const horarioFechamento = "18:00";

    if (hora < horarioAbertura || hora >= horarioFechamento) {
      return res.status(400).json({
        erro: `O salão atende das ${horarioAbertura} às ${horarioFechamento}`,
      });
    }

    // التحقق من العميل نشط
    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente || !cliente.ativo) {
      return res.status(400).json({ erro: "Cliente inativo ou inexistente" });
    }

    // التحقق من الخدمة نشطة
    const servico = await Servico.findByPk(servicoId);
    if (!servico || !servico.ativo) {
      return res.status(400).json({ erro: "Serviço inativo ou inexistente" });
    }

    // التحقق من المصفف نشط
    const profissional = await Profissional.findByPk(profissionalId);
    if (!profissional || !profissional.ativo) {
      return res
        .status(400)
        .json({ erro: "Profissional inativo ou inexistente" });
    }

    // التحقق من التوافق بين نوع الخدمة واختصاص المصفف
    const tipoServico = await Tipo.findByPk(servico.tipoId);
    if (!tipoServico) {
      return res.status(400).json({ erro: "Tipo de serviço inválido" });
    }

    if (profissional.especialidade !== tipoServico.nome) {
      return res.status(400).json({
        erro: "Profissional não corresponde à especialidade do serviço",
      });
    }

    // منع الحجز المكرر للمصفف بنفس الوقت
    const agendamentoExistente = await Agendamento.findOne({
      where: { profissionalId, data, hora },
    });

    if (agendamentoExistente) {
      return res.status(400).json({
        erro: "Já existe um agendamento para esse profissional nesse horário",
      });
    }

    // إنشاء الحجز
    const novoAgendamento = await Agendamento.create({
      clienteId,
      servicoId,
      profissionalId,
      data,
      hora,
    });

    res.status(201).json(novoAgendamento);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao criar agendamento",
    });
  }
}

// PUT /agendamentos/:id
async function atualizarAgendamento(req, res) {
  const { id } = req.params;
  const { clienteId, servicoId, profissionalId, data, hora } = req.body;
  try {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }

    agendamento.clienteId = clienteId;
    agendamento.servicoId = servicoId;
    agendamento.profissionalId = profissionalId;
    agendamento.data = data;
    agendamento.hora = hora;
    await agendamento.save();

    res.status(200).json(agendamento);
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao atualizar agendamento",
    });
  }
}

// DELETE /agendamentos/:id
async function deletarAgendamento(req, res) {
  const { id } = req.params;
  try {
    const agendamento = await Agendamento.findByPk(id);
    if (!agendamento) {
      return res.status(404).json({ erro: "Agendamento não encontrado" });
    }

    await agendamento.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({
      erro:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Erro ao deletar agendamento",
    });
  }
}

module.exports = {
  listarAgendamentos,
  buscarAgendamentoPorId,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
};
