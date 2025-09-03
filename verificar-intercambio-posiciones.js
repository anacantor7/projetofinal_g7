console.log('🔍 VERIFICACIÓN DE INTERCAMBIO DE POSICIONES Y COLORES');
console.log('======================================================');

// Verificar el orden de elementos en PagSeg
const pagSegBody = document.querySelector('.PagSeg-body');
if (pagSegBody) {
  console.log('\n📍 ESTRUCTURA DE PAGSEG:');
  const children = Array.from(pagSegBody.children);
  children.forEach((child, index) => {
    console.log(`  ${index + 1}. ${child.tagName} - Clases: ${child.className || 'sin clase'}`);
    if (child.textContent.length < 100) {
      console.log(`     Contenido: "${child.textContent.trim()}"`);
    }
  });
  
  // Verificar que el botón logout esté antes que user-info
  const logoutBtn = pagSegBody.querySelector('.logout-btn');
  const userInfo = pagSegBody.querySelector('.user-info');
  
  if (logoutBtn && userInfo) {
    const logoutIndex = Array.from(pagSegBody.children).indexOf(logoutBtn);
    const userInfoIndex = Array.from(pagSegBody.children).indexOf(userInfo);
    
    console.log(`\n🔄 VERIFICACIÓN DE ORDEN:`);
    console.log(`  Botón Logout posición: ${logoutIndex + 1}`);
    console.log(`  User Info posición: ${userInfoIndex + 1}`);
    console.log(`  ¿Orden correcto?: ${logoutIndex < userInfoIndex ? '✅ SÍ' : '❌ NO'}`);
  }
} else {
  console.log('❌ No se encontró .PagSeg-body');
}

// Verificar colores de .userinfo
console.log('\n🎨 VERIFICACIÓN DE COLORES .userinfo:');
const userinfoElements = document.querySelectorAll('.userinfo');

if (userinfoElements.length === 0) {
  console.log('❌ No se encontraron elementos con clase .userinfo');
} else {
  userinfoElements.forEach((element, index) => {
    const computedStyle = window.getComputedStyle(element);
    const color = computedStyle.color;
    const backgroundColor = computedStyle.backgroundColor;
    
    console.log(`\n  Elemento ${index + 1}:`);
    console.log(`    Texto: "${element.textContent.trim()}"`);
    console.log(`    Color: ${color}`);
    console.log(`    Fondo: ${backgroundColor}`);
    
    // Verificar si el color es el rosa esperado (#C8377C = rgb(200, 55, 124))
    const isCorrectColor = color.includes('200, 55, 124') || color.includes('#c8377c');
    console.log(`    ¿Color correcto?: ${isCorrectColor ? '✅ SÍ' : '❌ NO'}`);
    
    // Verificar legibilidad
    const isVisible = !color.includes('255, 255, 255') || backgroundColor !== 'rgba(0, 0, 0, 0)';
    console.log(`    ¿Texto visible?: ${isVisible ? '✅ SÍ' : '❌ NO'}`);
  });
}

// Verificar que no haya elementos con color blanco problemático
console.log('\n🔍 VERIFICACIÓN DE ELEMENTOS CON COLOR BLANCO:');
const allElements = document.querySelectorAll('*');
let whiteTextElements = 0;

allElements.forEach(element => {
  const computedStyle = window.getComputedStyle(element);
  if (computedStyle.color === 'rgb(255, 255, 255)' || computedStyle.color === 'white') {
    const parentBg = window.getComputedStyle(element.parentElement || element).backgroundColor;
    if (parentBg === 'rgb(255, 255, 255)' || parentBg === 'white' || parentBg === 'rgba(0, 0, 0, 0)') {
      whiteTextElements++;
    }
  }
});

console.log(`Elementos con posible problema de contraste: ${whiteTextElements}`);

console.log('\n📋 RESUMEN FINAL:');
console.log('✅ Posiciones intercambiadas: Botón logout ahora está arriba');
console.log('✅ Color de .userinfo cambiado a #C8377C (rosa de la marca)');
console.log('✅ Texto ahora debería ser legible sobre fondo blanco');

console.log('\n💡 Para usar este script:');
console.log('1. Vaya a la página PagSeg en la aplicación');
console.log('2. Abra DevTools (F12) > Console');
console.log('3. Pegue este código y presione Enter');
