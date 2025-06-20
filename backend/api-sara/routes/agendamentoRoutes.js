const express = require("express");
const router = express.Router();

const {
  listarAgendamentos,
  buscarAgendamentoPorId,
  criarAgendamento,
  atualizarAgendamento,
  deletarAgendamento,
} = require("../controllers/agendamentoController");

// ROTA: GET /agendamentos
router.get("/", listarAgendamentos);

// ROTA: GET /id
router.get("/:id", buscarAgendamentoPorId);

// ROTA: POST /agendamentos
router.post("/", criarAgendamento);

// ROTA: PUT /agendamentos/:id
router.put("/:id", atualizarAgendamento);

// ROTA: DELETE /agendamentos/:id
router.delete("/:id", deletarAgendamento);

module.exports = router;
