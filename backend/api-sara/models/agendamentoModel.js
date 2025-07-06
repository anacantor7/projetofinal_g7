const { DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // الاتصال بقاعدة البيانات

const Agendamento = sequelize.define("Agendamento", {
  profissionalId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  //  المفاتيح الخارجية
  clienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  servicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Agendamento;
