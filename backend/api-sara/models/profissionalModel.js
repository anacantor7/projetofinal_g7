const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Profissional = sequelize.define("Profissional", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Profissional;
