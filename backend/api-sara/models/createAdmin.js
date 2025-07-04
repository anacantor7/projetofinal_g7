const Cliente = require('./clienteModel');
const sequelize = require('../database/db');

async function createAdmin() {
  try {
    await sequelize.sync();
    const [admin, created] = await Cliente.findOrCreate({
      where: { email: 'admin@salao.com' },
      defaults: {
        nome: 'Administrador',
        telefone: '000000000',
        email: 'admin@salao.com',
        senha: 'admin123', // Cambia esta contraseña después de crear el admin
        ativo: true,
        role: 'admin',
      },
    });
    if (created) {
      console.log('Usuario admin creado con éxito.');
    } else {
      console.log('El usuario admin ya existe.');
    }
    process.exit();
  } catch (error) {
    console.error('Error al crear usuario admin:', error);
    process.exit(1);
  }
}

createAdmin();
