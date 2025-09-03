const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Tipo = require("./tipoModel");

const Subcategoria = sequelize.define("Subcategoria", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Tipo,
      key: 'id',
    },
  },
});

module.exports = Subcategoria;
