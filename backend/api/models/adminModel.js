const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcrypt');

const Admin = sequelize.define('Admin', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
}, {
  tableName: 'admins',
  timestamps: false,
  // Excluir senha de las consultas por defecto
  defaultScope: {
    attributes: { exclude: ['senha'] },
  },
});

// Hook para hashear contraseña antes de crear
Admin.beforeCreate(async (admin) => {
  if (admin.senha) {
    const saltRounds = 10;
    admin.senha = await bcrypt.hash(admin.senha, saltRounds);
  }
});

// Hook para hashear contraseña antes de actualizar
Admin.beforeUpdate(async (admin) => {
  if (admin.changed('senha')) {
    const saltRounds = 10;
    admin.senha = await bcrypt.hash(admin.senha, saltRounds);
  }
});

// Método para verificar contraseña
Admin.prototype.checkPassword = async function(senha) {
  return await bcrypt.compare(senha, this.senha);
};

module.exports = Admin;
