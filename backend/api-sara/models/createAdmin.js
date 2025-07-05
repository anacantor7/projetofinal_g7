const Admin = require('./adminModel');
const sequelize = require('../database/db');

async function createAdmin() {
  try {
    await sequelize.sync();
    const [admin, created] = await Admin.findOrCreate({
      where: { email: 'admin@salao.com' },
      defaults: {
        nome: 'Administrador',
        email: 'admin@salao.com',
        senha: 'admin123', // Cambia esta senha después de crear el admin
        ativo: true,
      },
    });
    if (created) {
      console.log('Usuario admin criado com sucesso na tabela Admin.');
    } else {
      console.log('O usuário admin já existe na tabela Admin.');
    }
    process.exit();
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
    process.exit(1);
  }
}

createAdmin();
