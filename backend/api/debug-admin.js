const Admin = require('./models/adminModel');
const bcrypt = require('bcrypt');
const sequelize = require('./database/db');

async function debugAdmin() {
  try {
    await sequelize.sync();

    // Buscar el admin existente
    const admin = await Admin.findOne({
      where: { email: 'admin@salao.com' },
      attributes: { include: ['senha'] }
    });

    if (!admin) {
      console.log('Admin no encontrado');
      return;
    }

    console.log('Admin encontrado:');
    console.log('ID:', admin.id);
    console.log('Nome:', admin.nome);
    console.log('Email:', admin.email);
    console.log('Ativo:', admin.ativo);
    console.log('Senha hash:', admin.senha);
    console.log('Hash length:', admin.senha.length);

    // Probar la comparación con bcrypt
    const testPassword = 'admin123';
    const isValid = await bcrypt.compare(testPassword, admin.senha);
    console.log(`Comparación bcrypt con '${testPassword}':`, isValid);

    // Crear un nuevo hash para verificar
    const newHash = await bcrypt.hash(testPassword, 10);
    console.log('Nuevo hash para admin123:', newHash);
    const newHashValid = await bcrypt.compare(testPassword, newHash);
    console.log('Comparación con nuevo hash:', newHashValid);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

debugAdmin();
