const express = require("express");
const router = express.Router();
const {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  toggleClienteAtivo,
  deletarCliente,
} = require("../controllers/clienteController");

router.get("/", listarClientes);
router.get("/:id", buscarClientePorId);
router.post("/", criarCliente);
router.put("/:id", atualizarCliente);
router.put("/:id/ativo", toggleClienteAtivo);
router.delete("/:id", deletarCliente);

module.exports = router;
