const path = require('path');
const { Sequelize } = require('sequelize');

// Configurar conexión a la base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'backend/api/database.sqlite'),
  logging: false
});

async function debugPedro() {
  try {
    // Conectar a la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos exitosa');

    // Consultar cliente Pedro Ojeda
    const [results] = await sequelize.query(
      "SELECT * FROM clientes WHERE email = 'juan@mail.com'"
    );

    console.log('\n📋 RESULTADO DE LA BÚSQUEDA:');
    if (results.length > 0) {
      console.log('✅ Cliente encontrado:');
      console.log(JSON.stringify(results[0], null, 2));
    } else {
      console.log('❌ Cliente NO encontrado con email juan@mail.com');
    }

    // También verificar todos los clientes
    const [allClients] = await sequelize.query(
      "SELECT id, nome, email, ativo FROM clientes"
    );

    console.log('\n📋 TODOS LOS CLIENTES:');
    allClients.forEach(client => {
      console.log(`ID: ${client.id}, Nome: ${client.nome}, Email: ${client.email}, Ativo: ${client.ativo}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

debugPedro();
