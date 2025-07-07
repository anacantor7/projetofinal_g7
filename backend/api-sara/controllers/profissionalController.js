const { Op, literal, where, fn, col } = require("sequelize");
const Profissional = require("../models/profissionalModel");

// Función para normalizar acentos y minúsculas en JS (solo para strings locales)
function normalize(field) {
  return field
    .normalize("NFD") // separa acento del carácter
    .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
    .replace(/ç/g, "c") // reemplaza 'ç' por 'c'
    .replace(/[^a-z0-9\s]/g, "") // elimina caracteres no alfanuméricos
    .replace(/\s+/g, " ") // reemplaza múltiples espacios por uno solo
    .toLowerCase();
}


// GET /profissionais
async function listarProfissionais(req, res) {
  const { ativo, especialidade } = req.query;

  const whereObj = {};

  if (ativo !== undefined) {
    whereObj.ativo = ativo === "true";
  }

  try {
    let profissionais;
    console.log('[BACKEND] Filtro whereObj:', whereObj, '| especialidade:', especialidade, '| Normalizado:', especialidade !== undefined ? normalize(especialidade) : null);
    if (especialidade !== undefined && especialidade !== null && especialidade !== "") {
      try {
        // Busca todos profissionais ativos e filtra por especialidade em JS (normalizando)
        let todos = await Profissional.findAll({ where: whereObj });
        profissionais = todos.filter(p => normalize(p.especialidade).includes(normalize(especialidade)));
        if (!profissionais || profissionais.length === 0) {
          // Se não encontrar, retorna todos ativos para depuração
          profissionais = todos;
          console.log('[BACKEND] Nenhum profissional encontrado para especialidade. Listando todos ativos:', profissionais);
        }
      } catch (err) {
        console.error('[BACKEND] Erro no filtro de especialidade:', err);
        profissionais = [];
      }
    } else {
      profissionais = await Profissional.findAll({ where: whereObj });
    }
    console.log('[BACKEND] Profissionais retornados:', profissionais);
    res.status(200).json(Array.isArray(profissionais) ? profissionais : []);
  } catch (error) {
    console.error('Erro ao buscar profissionais:', error);
    res.status(200).json([]); // Nunca retornar 500 para este caso, solo array vacío
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
    // تحقق من وجود مصفف بنفس الاسم + الهاتف
    const profissionalExistente = await Profissional.findOne({
      where: {
        nome: req.body.nome,
        telefone: req.body.telefone,
      },
    });

    if (profissionalExistente) {
      return res.status(400).json({
        erro: "Já existe um profissional cadastrado com esse nome e telefone.",
      });
    }

    // إنشاء المصفف الجديد
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
