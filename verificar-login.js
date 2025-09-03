// Script para limpiar localStorage y verificar datos actuales
console.log('=== VERIFICACIÓN DE LOCALSTORAGE ===');

// Verificar usuario atual
const usuarioLogado = localStorage.getItem('usuarioLogado');

if (usuarioLogado) {
  const userData = JSON.parse(usuarioLogado);
  console.log('Usuario actual no localStorage:');
  console.log('ID:', userData.id);
  console.log('Nome:', userData.nome);
  console.log('Email:', userData.email);
  
  if (userData.nome !== 'Pedro Ojeda') {
    console.log('\n❌ El usuario logueado NO es Pedro Ojeda');
    console.log('Limpiando localStorage...');
    localStorage.removeItem('usuarioLogado');
    console.log('✅ localStorage limpo. Haga login con Pedro Ojeda (juan@mail.com)');
  } else {
    console.log('✅ Pedro Ojeda está correctamente logueado');
  }
} else {
  console.log('❌ Ningún usuario logueado en localStorage');
  console.log('Por favor, haga login con Pedro Ojeda (juan@mail.com)');
}

// Instrucciones
console.log('\n=== INSTRUCCIONES ===');
console.log('1. Si se limpió el localStorage, vaya a la página de login');
console.log('2. Use las credenciales:');
console.log('   Email: juan@mail.com');
console.log('   Usuario: Pedro Ojeda');
console.log('3. Después del login, el nombre correcto debería aparecer');
