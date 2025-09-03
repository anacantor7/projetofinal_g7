const bcrypt = require('bcrypt');
const { Sequelize } = require('sequelize');
const path = require('path');

// Configurar conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false
});

async function fixPedroPassword() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');

    // Verificar contraseña actual de Pedro
    const [results] = await sequelize.query(
      "SELECT id, nome, email, senha FROM clientes WHERE email = 'juan@mail.com'"
    );

    if (results.length === 0) {
      console.log('❌ Pedro Ojeda no encontrado');
      return;
    }

    const pedro = results[0];
    console.log(`\n📋 Pedro encontrado: ${pedro.nome} (${pedro.email})`);
    console.log(`🔐 Contraseña actual: ${pedro.senha}`);

    // Verificar si la contraseña ya está hasheada
    if (pedro.senha.startsWith('$2b$') || pedro.senha.startsWith('$2a$')) {
      console.log('✅ La contraseña ya está hasheada');
      return;
    }

    // Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(pedro.senha, saltRounds);
    
    console.log(`🔄 Hasheando contraseña "${pedro.senha}"...`);

    // Actualizar en la base de datos
    await sequelize.query(
      "UPDATE clientes SET senha = ? WHERE id = ?",
      {
        replacements: [hashedPassword, pedro.id],
        type: sequelize.QueryTypes.UPDATE
      }
    );

    console.log('✅ Contraseña actualizada correctamente');

    // Verificar que se actualizó
    const [updatedResults] = await sequelize.query(
      "SELECT id, nome, email, senha FROM clientes WHERE email = 'juan@mail.com'"
    );

    console.log(`🔐 Nueva contraseña hasheada: ${updatedResults[0].senha.substring(0, 20)}...`);

    // Probar bcrypt.compare
    const isValid = await bcrypt.compare('123456', updatedResults[0].senha);
    console.log(`🧪 Prueba de bcrypt.compare('123456', hash): ${isValid ? '✅ ÉXITO' : '❌ FALLO'}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

fixPedroPassword();
