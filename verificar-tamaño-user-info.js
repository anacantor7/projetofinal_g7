console.log('🔍 VERIFICACIÓN DE TAMAÑO REDUCIDO DEL USER-INFO');
console.log('==============================================');

// Buscar el elemento user-info
const userInfo = document.querySelector('.user-info');

if (!userInfo) {
  console.log('❌ No se encontró .user-info');
} else {
  console.log('✅ User info encontrado');
  
  const computedStyle = window.getComputedStyle(userInfo);
  const rect = userInfo.getBoundingClientRect();
  
  console.log('\n📐 DIMENSIONES ACTUALES:');
  console.log(`  Ancho real: ${Math.round(rect.width)}px`);
  console.log(`  Alto real: ${Math.round(rect.height)}px`);
  console.log(`  Min-width CSS: ${computedStyle.minWidth}`);
  console.log(`  Max-width CSS: ${computedStyle.maxWidth}`);
  console.log(`  Padding: ${computedStyle.padding}`);
  console.log(`  Font-size: ${computedStyle.fontSize}`);
  
  console.log('\n📍 POSICIÓN:');
  console.log(`  Top: ${computedStyle.top}`);
  console.log(`  Left: ${computedStyle.left}`);
  console.log(`  Position: ${computedStyle.position}`);
  
  console.log('\n📊 ANÁLISIS DE TAMAÑO:');
  
  // Verificar si el tamaño es apropiado
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const widthPercentage = (rect.width / screenWidth * 100).toFixed(1);
  const heightPercentage = (rect.height / screenHeight * 100).toFixed(1);
  
  console.log(`  Ocupa ${widthPercentage}% del ancho de pantalla`);
  console.log(`  Ocupa ${heightPercentage}% del alto de pantalla`);
  
  // Verificar si es discreto (debe ser < 10% del ancho)
  const isDiscreet = parseFloat(widthPercentage) < 10;
  console.log(`  ¿Es discreto?: ${isDiscreet ? '✅ SÍ' : '❌ NO'}`);
  
  // Verificar contenido
  console.log('\n📝 CONTENIDO:');
  const userName = userInfo.querySelector('.userinfo')?.textContent || 'No encontrado';
  const userRole = userInfo.querySelector('.user-info-secondary')?.textContent || 'No encontrado';
  console.log(`  Usuario: ${userName}`);
  console.log(`  Rol: ${userRole}`);
  
  // Verificar si se lee bien
  const userNameElement = userInfo.querySelector('.userinfo');
  const userRoleElement = userInfo.querySelector('.user-info-secondary');
  
  if (userNameElement) {
    const nameStyle = window.getComputedStyle(userNameElement);
    console.log(`  Font-size nombre: ${nameStyle.fontSize}`);
    console.log(`  Font-weight nombre: ${nameStyle.fontWeight}`);
  }
  
  if (userRoleElement) {
    const roleStyle = window.getComputedStyle(userRoleElement);
    console.log(`  Font-size rol: ${roleStyle.fontSize}`);
    console.log(`  Opacity rol: ${roleStyle.opacity}`);
  }
  
  console.log('\n🎨 DISEÑO VISUAL:');
  console.log(`  Background: ${computedStyle.background}`);
  console.log(`  Border-radius: ${computedStyle.borderRadius}`);
  console.log(`  Box-shadow: ${computedStyle.boxShadow}`);
  console.log(`  Z-index: ${computedStyle.zIndex}`);
  
  console.log('\n📱 RESPONSIVE CHECK:');
  let deviceType = 'Desktop';
  if (window.innerWidth <= 480) {
    deviceType = 'Móvil pequeño';
  } else if (window.innerWidth <= 768) {
    deviceType = 'Móvil';
  } else if (window.innerWidth <= 1024) {
    deviceType = 'Tablet';
  }
  
  console.log(`  Dispositivo: ${deviceType}`);
  console.log(`  Pantalla: ${screenWidth}x${screenHeight}px`);
  
  // Verificar que no interfiera con el contenido
  console.log('\n🚫 VERIFICACIÓN DE INTERFERENCIA:');
  const elementsBelow = document.elementsFromPoint(rect.left + rect.width/2, rect.top + rect.height/2);
  const interferingElements = elementsBelow.filter(el => 
    el !== userInfo && 
    !userInfo.contains(el) &&
    el.tagName !== 'HTML' && 
    el.tagName !== 'BODY'
  );
  
  console.log(`  Elementos debajo: ${interferingElements.length}`);
  if (interferingElements.length > 0) {
    console.log('  ⚠️ Posible interferencia con:', interferingElements.map(el => el.tagName.toLowerCase()).join(', '));
  } else {
    console.log('  ✅ No interfiere con otros elementos');
  }
}

console.log('\n📋 CRITERIOS DE TAMAÑO IDEAL:');
console.log('✅ Ancho: < 10% de la pantalla');
console.log('✅ Alto: < 8% de la pantalla');
console.log('✅ Font-size: 0.75-0.85rem');
console.log('✅ Padding: 5-8px');
console.log('✅ Min-width: 90-120px');
console.log('✅ No interfiere con contenido');

console.log('\n💡 Para usar este script:');
console.log('1. Vaya a cualquier página con user-info');
console.log('2. Abra DevTools (F12) > Console');
console.log('3. Pegue este código y presione Enter');
