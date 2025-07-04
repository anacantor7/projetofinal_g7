const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Tipo = require("./tipoModel");

const Servico = sequelize.define("Servico", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duracao: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  preco: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Servico;
