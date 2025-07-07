const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Cliente = sequelize.define("Cliente", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  observacoes: {
    type: DataTypes.TEXT,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Cliente;
