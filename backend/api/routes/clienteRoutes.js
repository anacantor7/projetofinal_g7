const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middlewares/auth");
const {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  toggleClienteAtivo,
  deletarCliente,
  loginCliente,
} = require("../controllers/clienteController");

router.get("/", listarClientes);
router.get("/:id", buscarClientePorId);
router.post("/", criarCliente);
router.put("/:id", atualizarCliente);
router.put("/:id/ativo", toggleClienteAtivo);
router.delete("/:id", deletarCliente);
router.post("/login", loginCliente);

// Endpoint protegido para obtener perfil del cliente autenticado
router.get("/profile/me", authenticateToken, async (req, res) => {
  try {
    const Cliente = require("../models/clienteModel");
    const cliente = await Cliente.findByPk(req.user.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    res.json({
      id: cliente.id,
      nome: cliente.nome,
      email: cliente.email,
      telefone: cliente.telefone,
      ativo: cliente.ativo
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar perfil" });
  }
});

module.exports = router;
