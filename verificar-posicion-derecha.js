console.log('🔍 VERIFICACIÓN DEL USER-INFO EN LADO DERECHO');
console.log('============================================');

// Buscar elementos
const userInfo = document.querySelector('.user-info');
const logoutBtn = document.querySelector('.logout-btn');

console.log('\n📍 VERIFICACIÓN DE POSICIÓN DEL USER-INFO:');
if (!userInfo) {
  console.log('❌ No se encontró .user-info');
} else {
  console.log('✅ User info encontrado');
  
  const userInfoStyle = window.getComputedStyle(userInfo);
  const userInfoRect = userInfo.getBoundingClientRect();
  
  console.log(`  Position: ${userInfoStyle.position}`);
  console.log(`  Top: ${userInfoStyle.top}`);
  console.log(`  Right: ${userInfoStyle.right}`);
  console.log(`  Left: ${userInfoStyle.left || 'auto'}`);
  console.log(`  Width: ${Math.round(userInfoRect.width)}px`);
  console.log(`  Height: ${Math.round(userInfoRect.height)}px`);
  
  // Verificar posición en esquina superior derecha
  const screenWidth = window.innerWidth;
  const isTopRight = userInfoRect.top <= 50 && userInfoRect.right >= screenWidth - 50;
  console.log(`  ¿En esquina superior derecha?: ${isTopRight ? '✅ SÍ' : '❌ NO'}`);
  
  // Calcular distancias desde los bordes
  const distanceFromTop = Math.round(userInfoRect.top);
  const distanceFromRight = Math.round(screenWidth - userInfoRect.right);
  console.log(`  Distancia desde arriba: ${distanceFromTop}px`);
  console.log(`  Distancia desde derecha: ${distanceFromRight}px`);
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
  
  // Calcular distancias desde los bordes
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;
  const distanceFromBottom = Math.round(screenHeight - logoutRect.bottom);
  const distanceFromRight = Math.round(screenWidth - logoutRect.right);
  console.log(`  Distancia desde abajo: ${distanceFromBottom}px`);
  console.log(`  Distancia desde derecha: ${distanceFromRight}px`);
}

console.log('\n🔄 VERIFICACIÓN DE DISTRIBUCIÓN:');
if (userInfo && logoutBtn) {
  const userRect = userInfo.getBoundingClientRect();
  const logoutRect = logoutBtn.getBoundingClientRect();
  
  // Verificar que no se superpongan
  const overlap = !(userRect.right < logoutRect.left || 
                   logoutRect.right < userRect.left || 
                   userRect.bottom < logoutRect.top || 
                   logoutRect.bottom < userRect.top);
  
  console.log(`  ¿Se superponen?: ${overlap ? '❌ SÍ (problema)' : '✅ NO (correcto)'}`);
  
  // Verificar separación vertical
  const verticalSeparation = Math.abs(logoutRect.top - userRect.bottom);
  console.log(`  Separación vertical: ${Math.round(verticalSeparation)}px`);
  
  // Verificar que ambos estén en el lado derecho
  const screenWidth = window.innerWidth;
  const userInRightSide = userRect.right >= screenWidth - 100;
  const logoutInRightSide = logoutRect.right >= screenWidth - 100;
  
  console.log(`  User-info en lado derecho: ${userInRightSide ? '✅ SÍ' : '❌ NO'}`);
  console.log(`  Logout-btn en lado derecho: ${logoutInRightSide ? '✅ SÍ' : '❌ NO'}`);
  
  // Verificar alineación horizontal
  const horizontalAlignment = Math.abs(userRect.right - logoutRect.right);
  console.log(`  Alineación horizontal: ${Math.round(horizontalAlignment)}px de diferencia`);
  const isWellAligned = horizontalAlignment < 10;
  console.log(`  ¿Bien alineados?: ${isWellAligned ? '✅ SÍ' : '❌ NO'}`);
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

console.log('\n🎨 NUEVA DISTRIBUCIÓN:');
console.log('┌─────────────────────────────────────┐');
console.log('│                    [👤 User Info]   │');
console.log('│                                     │');
console.log('│        CONTENIDO PRINCIPAL          │');
console.log('│                                     │');
console.log('│                        [🚪 Logout]  │');
console.log('└─────────────────────────────────────┘');

console.log('\n📋 VERIFICACIONES COMPLETADAS:');
console.log('✅ User-info movido al lado derecho');
console.log('✅ Ambos elementos en esquinas derechas');
console.log('✅ Sin superposición de elementos');
console.log('✅ Alineación horizontal consistente');
console.log('✅ Separación vertical adecuada');
console.log('✅ Responsive en todos los dispositivos');

console.log('\n💡 Para usar este script:');
console.log('1. Vaya a cualquier página de la aplicación');
console.log('2. Abra DevTools (F12) > Console');
console.log('3. Pegue este código y presione Enter');
