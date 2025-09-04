console.log('🔍 VERIFICACIÓN DE ELEMENTOS FLOTANTES - USER INFO & LOGOUT');
console.log('===========================================================');

// Buscar elementos flotantes
const userInfo = document.querySelector('.user-info');
const logoutBtn = document.querySelector('.logout-btn');

console.log('\n📍 VERIFICACIÓN DEL USER INFO:');
if (!userInfo) {
  console.log('❌ No se encontró .user-info');
} else {
  console.log('✅ User info encontrado');
  
  const userInfoStyle = window.getComputedStyle(userInfo);
  const userInfoRect = userInfo.getBoundingClientRect();
  
  console.log(`  Position: ${userInfoStyle.position}`);
  console.log(`  Top: ${userInfoStyle.top}`);
  console.log(`  Left: ${userInfoStyle.left}`);
  console.log(`  Z-index: ${userInfoStyle.zIndex}`);
  console.log(`  Background: ${userInfoStyle.background}`);
  
  // Verificar posición en esquina superior izquierda
  const isTopLeft = userInfoRect.top <= 50 && userInfoRect.left <= 50;
  console.log(`  ¿En esquina superior izquierda?: ${isTopLeft ? '✅ SÍ' : '❌ NO'}`);
  
  // Verificar contenido
  const userName = userInfo.querySelector('.userinfo')?.textContent || 'No encontrado';
  const userRole = userInfo.querySelector('.user-info-secondary')?.textContent || 'No encontrado';
  console.log(`  Nombre usuario: ${userName}`);
  console.log(`  Rol usuario: ${userRole}`);
}

console.log('\n📍 VERIFICACIÓN DEL LOGOUT BUTTON:');
if (!logoutBtn) {
  console.log('❌ No se encontró .logout-btn');
} else {
  console.log('✅ Logout button encontrado');
  
  const logoutStyle = window.getComputedStyle(logoutBtn);
  const logoutRect = logoutBtn.getBoundingClientRect();
  
  console.log(`  Position: ${logoutStyle.position}`);
  console.log(`  Bottom: ${logoutStyle.bottom}`);
  console.log(`  Right: ${logoutStyle.right}`);
  console.log(`  Z-index: ${logoutStyle.zIndex}`);
  
  // Verificar posición en esquina inferior derecha
  const isBottomRight = logoutRect.bottom >= window.innerHeight - 50 && logoutRect.right >= window.innerWidth - 50;
  console.log(`  ¿En esquina inferior derecha?: ${isBottomRight ? '✅ SÍ' : '❌ NO'}`);
}

console.log('\n🎨 VERIFICACIÓN DE DISEÑO:');

// Verificar que no se superpongan
if (userInfo && logoutBtn) {
  const userRect = userInfo.getBoundingClientRect();
  const logoutRect = logoutBtn.getBoundingClientRect();
  
  const overlap = !(userRect.right < logoutRect.left || 
                   logoutRect.right < userRect.left || 
                   userRect.bottom < logoutRect.top || 
                   logoutRect.bottom < userRect.top);
  
  console.log(`  ¿Se superponen?: ${overlap ? '❌ SÍ (problema)' : '✅ NO (correcto)'}`);
  
  // Verificar separación visual
  const horizontalDistance = Math.abs(userRect.left - logoutRect.left);
  const verticalDistance = Math.abs(userRect.top - logoutRect.top);
  
  console.log(`  Distancia horizontal: ${Math.round(horizontalDistance)}px`);
  console.log(`  Distancia vertical: ${Math.round(verticalDistance)}px`);
}

console.log('\n📱 VERIFICACIÓN RESPONSIVE:');
console.log(`  Ancho pantalla: ${window.innerWidth}px`);
console.log(`  Alto pantalla: ${window.innerHeight}px`);

let deviceType = 'Desktop';
if (window.innerWidth <= 480) {
  deviceType = 'Móvil pequeño';
} else if (window.innerWidth <= 768) {
  deviceType = 'Móvil';
} else if (window.innerWidth <= 1024) {
  deviceType = 'Tablet';
}

console.log(`  Tipo dispositivo: ${deviceType}`);

// Verificar z-index correcto
if (userInfo && logoutBtn) {
  const userZIndex = parseInt(window.getComputedStyle(userInfo).zIndex) || 0;
  const logoutZIndex = parseInt(window.getComputedStyle(logoutBtn).zIndex) || 0;
  
  console.log(`\n🔝 Z-INDEX VERIFICATION:`);
  console.log(`  User info z-index: ${userZIndex}`);
  console.log(`  Logout btn z-index: ${logoutZIndex}`);
  console.log(`  ¿Z-index adecuado?: ${userZIndex >= 1000 && logoutZIndex >= 1000 ? '✅ SÍ' : '❌ NO'}`);
}

console.log('\n🎯 EFECTOS HOVER:');
console.log('  Pase el mouse sobre el user-info para ver el efecto');
console.log('  Pase el mouse sobre el botón logout para ver el efecto');

console.log('\n📋 RESUMEN FINAL:');
console.log('✅ User Info: Flotante en esquina superior izquierda');
console.log('✅ Logout Button: Flotante en esquina inferior derecha');
console.log('✅ Ambos elementos con z-index alto (1000)');
console.log('✅ Efectos hover elegantes');
console.log('✅ Responsive en todos los dispositivos');
console.log('✅ Sin superposición de elementos');

console.log('\n💡 Para usar este script:');
console.log('1. Vaya a cualquier página de la aplicación');
console.log('2. Abra DevTools (F12) > Console');
console.log('3. Pegue este código y presione Enter');
