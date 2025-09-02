const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const bcrypt = require('bcrypt');

const Cliente = sequelize.define("Cliente", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  // Excluir senha de las consultas por defecto
  defaultScope: {
    attributes: { exclude: ['senha'] },
  },
});

// Hook para hashear contraseña antes de crear
Cliente.beforeCreate(async (cliente) => {
  if (cliente.senha) {
    const saltRounds = 10;
    cliente.senha = await bcrypt.hash(cliente.senha, saltRounds);
  }
});

// Hook para hashear contraseña antes de actualizar
Cliente.beforeUpdate(async (cliente) => {
  if (cliente.changed('senha')) {
    const saltRounds = 10;
    cliente.senha = await bcrypt.hash(cliente.senha, saltRounds);
  }
});

// Método para verificar contraseña
Cliente.prototype.checkPassword = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = Cliente;
