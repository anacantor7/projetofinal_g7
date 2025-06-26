const { DataTypes } = require("sequelize");
const sequelize = require("../database/db_bkp");

const Tipo = sequelize.define("Tipo", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Tipo;
