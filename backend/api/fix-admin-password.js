const Admin = require('./models/adminModel');
const bcrypt = require('bcrypt');
const sequelize = require('./database/db');

async function fixAdminPassword() {
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

    console.log('Admin actual - Hash length:', admin.senha.length);

    // Si la contraseña no está hasheada (longitud menor a 50), hashearla
    if (admin.senha.length < 50) {
      console.log('Contraseña no está hasheada, aplicando hash...');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      // Actualizar directamente sin trigger el hook
      await sequelize.query(
        'UPDATE admins SET senha = ? WHERE email = ?',
        {
          replacements: [hashedPassword, 'admin@salao.com'],
          type: sequelize.QueryTypes.UPDATE
        }
      );

      console.log('Contraseña actualizada correctamente');
      console.log('Nuevo hash:', hashedPassword);

      // Verificar que funciona
      const updatedAdmin = await Admin.findOne({
        where: { email: 'admin@salao.com' },
        attributes: { include: ['senha'] }
      });

      const isValid = await bcrypt.compare('admin123', updatedAdmin.senha);
      console.log('Verificación exitosa:', isValid);
    } else {
      console.log('Contraseña ya está hasheada');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(0);
  }
}

fixAdminPassword();
