// ← أولاً: تحميل المتغيرات البيئية
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const agendamentoRoutes = require("./routes/agendamentoRoutes");
const servicoRoutes = require("./routes/servicoRoutes");
const clienteRoutes = require("./routes/clienteRoutes");
const profissionalRoutes = require("./routes/profissionalRoutes");
const tipoRoutes = require("./routes/tipoRoutes");

const app = express();
const sequelize = require("./database/db");

// تحميل النماذج (Models)
const Cliente = require("./models/clienteModel");
const Servico = require("./models/servicoModel");
const Tipo = require("./models/tipoModel");
const Profissional = require("./models/profissionalModel");
const Agendamento = require("./models/agendamentoModel");

//  علاقات Sequelize
// Cliente 1:N Agendamento
Cliente.hasMany(Agendamento, { foreignKey: "clienteId" });
Agendamento.belongsTo(Cliente, { foreignKey: "clienteId" });
// Servico 1:N Agendamento
Servico.hasMany(Agendamento, { foreignKey: "servicoId" });
Agendamento.belongsTo(Servico, { foreignKey: "servicoId" });

// علاقة مصفف مع حجز || Profissional 1:N Agendamento
Profissional.hasMany(Agendamento, { foreignKey: "profissionalId" });
Agendamento.belongsTo(Profissional, { foreignKey: "profissionalId" });

// Tipo (One-to-Many)Servico || "Tipo 1 : N Servicos"
Tipo.hasMany(Servico, { foreignKey: "tipoId" });
Servico.belongsTo(Tipo, { foreignKey: "tipoId" });

// مزامنة قاعدة البيانات Sequelize مع SQLite
sequelize
  .sync()
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso!");

    app.use(cors());
    app.use(express.json());

    app.use("/clientes", clienteRoutes);
    app.use("/servicos", servicoRoutes);
    app.use("/tipos", tipoRoutes);
    app.use("/profissionais", profissionalRoutes);
    app.use("/agendamentos", agendamentoRoutes);

    const PORT = process.env.PORT || 3000;
    console.log("Ambiente:", process.env.NODE_ENV);
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao sincronizar o banco de dados:", err);
  });
