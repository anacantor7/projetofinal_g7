// Script para verificar usuarios en la base de datos y limpiar localStorage
console.log('=== VERIFICACIÓN DE USUARIOS ===');

// Función para consultar usuarios en la base de datos
async function verificarUsuarios() {
  try {
    console.log('Consultando usuarios en la base de datos...');
    const response = await fetch('http://localhost:3000/clientes');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const usuarios = await response.json();
    console.log('Usuarios encontrados:', usuarios.length);
    
    usuarios.forEach(usuario => {
      console.log(`ID: ${usuario.id}, Nome: ${usuario.nome}, Email: ${usuario.email}`);
    });
    
    // Buscar específicamente Pedro Ojeda
    const pedroOjeda = usuarios.find(u => 
      u.nome.toLowerCase().includes('pedro') && 
      u.nome.toLowerCase().includes('ojeda')
    );
    
    if (pedroOjeda) {
      console.log('✅ Pedro Ojeda encontrado:', pedroOjeda);
    } else {
      console.log('❌ Pedro Ojeda não encontrado na base de dados');
      console.log('Usuarios disponibles:');
      usuarios.forEach(u => console.log(`- ${u.nome} (${u.email})`));
    }
    
  } catch (error) {
    console.error('Erro ao consultar usuarios:', error);
  }
}

// Función para limpiar localStorage
function limpiarLocalStorage() {
  console.log('\n=== LIMPANDO LOCALSTORAGE ===');
  const usuarioLogado = localStorage.getItem('usuarioLogado');
  
  if (usuarioLogado) {
    console.log('Usuario atual no localStorage:', JSON.parse(usuarioLogado));
    localStorage.removeItem('usuarioLogado');
    console.log('✅ localStorage limpo. Faça login novamente.');
  } else {
    console.log('Nenhum usuario no localStorage');
  }
}

// Executar verificações
verificarUsuarios();

// Descomentar a linha abaixo se quiser limpar o localStorage
// limpiarLocalStorage();

console.log('\n=== INSTRUÇÕES ===');
console.log('1. Verifique se Pedro Ojeda está na lista de usuarios');
console.log('2. Se não estiver, registre-se novamente');
console.log('3. Se estiver, execute limpiarLocalStorage() e faça login novamente');
