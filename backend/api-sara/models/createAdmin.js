const Admin = require('./adminModel');
const sequelize = require('../database/db');

async function createAdmin() {
  try {
    await sequelize.sync();

    // Verificar si ya existe un admin
    const existingAdmin = await Admin.findOne({ where: { email: 'admin@salao.com' } });

    if (existingAdmin) {
      console.log('Admin já existe:', existingAdmin.email);
      console.log('Nome:', existingAdmin.nome);
      console.log('Ativo:', existingAdmin.ativo);
      return;
    }

    // Crear nuevo admin
    const admin = await Admin.create({
      nome: 'Administrador',
      email: 'admin@salao.com',
      senha: 'admin123', // Esta será hasheada automáticamente por el hook
      ativo: true,
    });

    console.log('Usuario admin criado com sucesso!');
    console.log('Email: admin@salao.com');
    console.log('Senha: admin123');
    console.log('ID:', admin.id);

  } catch (error) {
    console.error('Erro ao criar/verificar usuário admin:', error);
  }
}

createAdmin();
