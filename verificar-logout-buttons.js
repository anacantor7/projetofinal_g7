console.log('🔍 VERIFICACIÓN DE BOTONES LOGOUT');
console.log('=====================================');

// Buscar todos los botones de logout en el DOM
const logoutButtons = document.querySelectorAll('.logout-btn, .admin-logout-btn, .mobile-logout-btn');

console.log(`\n📊 RESUMEN:`);
console.log(`Total de botones logout encontrados: ${logoutButtons.length}`);

if (logoutButtons.length === 0) {
  console.log('❌ No se encontraron botones de logout');
} else {
  logoutButtons.forEach((btn, index) => {
    const computedStyle = window.getComputedStyle(btn);
    console.log(`\n🔘 BOTÓN ${index + 1}:`);
    console.log(`  Clase: ${btn.className}`);
    console.log(`  Texto: "${btn.textContent.trim()}"`);
    console.log(`  Position: ${computedStyle.position}`);
    console.log(`  Display: ${computedStyle.display}`);
    console.log(`  Width: ${computedStyle.width}`);
    console.log(`  Height: ${computedStyle.height}`);
    console.log(`  Top: ${computedStyle.top}`);
    console.log(`  Left: ${computedStyle.left}`);
    console.log(`  Bottom: ${computedStyle.bottom}`);
    console.log(`  Right: ${computedStyle.right}`);
    
    // Verificar si está ocupando toda la pantalla
    const rect = btn.getBoundingClientRect();
    const isFullScreen = rect.width >= window.innerWidth * 0.8 || rect.height >= window.innerHeight * 0.8;
    console.log(`  Dimensiones reales: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
    console.log(`  ¿Ocupa pantalla completa?: ${isFullScreen ? '❌ SÍ' : '✅ NO'}`);
  });
}

// Verificar CSS conflictivo
console.log(`\n🎨 VERIFICACIÓN DE CSS:`);
const stylesheets = document.styleSheets;
let conflictingRules = 0;

for (let i = 0; i < stylesheets.length; i++) {
  try {
    const rules = stylesheets[i].cssRules || stylesheets[i].rules;
    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];
      if (rule.selectorText && rule.selectorText.includes('.logout-btn')) {
        console.log(`  Regla encontrada: ${rule.selectorText}`);
        if (rule.style.position === 'fixed' || rule.style.position === 'absolute') {
          console.log(`    ⚠️  Position: ${rule.style.position} (puede causar problemas)`);
          conflictingRules++;
        }
      }
    }
  } catch (e) {
    // Ignorar errores de CORS
  }
}

console.log(`\n📋 RESULTADO FINAL:`);
if (conflictingRules === 0) {
  console.log('✅ No se detectaron reglas CSS conflictivas');
} else {
  console.log(`❌ Se detectaron ${conflictingRules} reglas CSS potencialmente problemáticas`);
}

console.log('\n💡 Para usar este script:');
console.log('1. Abra las DevTools del navegador (F12)');
console.log('2. Vaya a la pestaña Console');
console.log('3. Pegue este código y presione Enter');
console.log('4. Revise los resultados para identificar problemas');
