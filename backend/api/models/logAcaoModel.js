const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const LogAcao = sequelize.define('LogAcao', {
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  acao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataHora: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = { LogAcao };
