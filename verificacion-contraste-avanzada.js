/**
 * VERIFICACIÓN AVANZADA DE CONTRASTE
 * =================================
 * 
 * Script para detectar y reportar problemas de contraste en el CSS
 */

console.log('🔍 === VERIFICACIÓN AVANZADA DE CONTRASTE ===');

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'vite-app', 'src', 'App.css');

if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  console.log('\n🎨 Analizando problemas potenciales de contraste...');
  
  // Dividir CSS en bloques de reglas
  const rules = cssContent.split(/\}[\s\n]*/).filter(rule => rule.trim());
  
  let problemsFound = 0;
  let warningsFound = 0;
  let elementsChecked = 0;
  
  // Patrones problemáticos
  const whiteTextPattern = /color:\s*(white|#fff|#ffffff)/i;
  const whiteBackgroundPattern = /background[^:]*:\s*[^;]*(white|#fff|#ffffff)/i;
  const transparentBackgroundPattern = /background[^:]*:\s*[^;]*transparent/i;
  
  rules.forEach((rule, index) => {
    const selectorMatch = rule.match(/^([^{]+)\{/);
    if (!selectorMatch) return;
    
    const selector = selectorMatch[1].trim();
    const properties = rule.substring(rule.indexOf('{') + 1);
    
    elementsChecked++;
    
    const hasWhiteText = whiteTextPattern.test(properties);
    const hasWhiteBackground = whiteBackgroundPattern.test(properties);
    const hasTransparentBackground = transparentBackgroundPattern.test(properties);
    
    // Detectar problemas críticos
    if (hasWhiteText && (hasWhiteBackground || hasTransparentBackground)) {
      console.log(`❌ PROBLEMA CRÍTICO: ${selector}`);
      console.log(`   - Texto blanco sobre fondo blanco/transparente`);
      problemsFound++;
    }
    
    // Detectar advertencias
    if (hasWhiteText && !hasWhiteBackground && !hasTransparentBackground) {
      // Verificar si tiene un fondo apropiado
      const hasAppropriateBackground = 
        /background[^:]*:\s*[^;]*(linear-gradient|rgba.*[0-9].*[0-9].*[0-9]|#[0-9a-f]{3,6})/i.test(properties) ||
        /background[^:]*:\s*[^;]*rgb/i.test(properties);
      
      if (!hasAppropriateBackground) {
        console.log(`⚠️  ADVERTENCIA: ${selector}`);
        console.log(`   - Texto blanco sin fondo específico claramente definido`);
        warningsFound++;
      }
    }
    
    // Verificar elementos específicos problemáticos
    if (selector.includes('text-white') && hasWhiteBackground) {
      console.log(`❌ CONFLICTO: ${selector}`);
      console.log(`   - Clase .text-white en elemento con fondo blanco`);
      problemsFound++;
    }
  });
  
  console.log('\n📊 Resultados del análisis:');
  console.log(`• Elementos analizados: ${elementsChecked}`);
  console.log(`• Problemas críticos: ${problemsFound}`);
  console.log(`• Advertencias: ${warningsFound}`);
  
  console.log('\n🎯 Verificaciones específicas:');
  
  // Verificar clases conocidas problemáticas
  const problematicClasses = [
    'page-title',
    'section-title', 
    'servico-header',
    'titulo',
    'admin-brand',
    'admin-nav-item',
    'nav-label',
    'user-info .userinfo'
  ];
  
  let fixedClasses = 0;
  problematicClasses.forEach(className => {
    const classPattern = new RegExp(`\\.${className.replace(/\s/g, '\\s')}[^{]*\\{[^}]*`, 'g');
    const matches = cssContent.match(classPattern);
    
    if (matches) {
      const hasWhiteColor = matches.some(match => /color:\s*(white|#fff)/i.test(match));
      const hasAppropriateBackground = matches.some(match => 
        /background[^:]*:\s*[^;]*(#[0-9a-f]{3,6}|rgba|rgb|linear-gradient)/i.test(match) &&
        !/background[^:]*:\s*[^;]*(white|#fff|transparent)/i.test(match)
      );
      
      if (hasWhiteColor && hasAppropriateBackground) {
        console.log(`✅ ${className} - Corregido (texto blanco con fondo apropiado)`);
        fixedClasses++;
      } else if (hasWhiteColor && !hasAppropriateBackground) {
        console.log(`❌ ${className} - Aún problemático`);
      } else {
        console.log(`✅ ${className} - OK (sin texto blanco problemático)`);
        fixedClasses++;
      }
    }
  });
  
  console.log('\n🚀 Verificación de mejoras implementadas:');
  
  // Verificar fondos blancos sólidos en sections
  const sections = ['agendamento-form-section', 'agendamento-calendar-section', 'agendamento-schedule-section', 'agendamento-actions-section'];
  let sectionsFixed = 0;
  
  sections.forEach(section => {
    if (cssContent.includes(`.${section}`) && cssContent.includes('background: #ffffff')) {
      console.log(`✅ ${section} - Fondo blanco sólido implementado`);
      sectionsFixed++;
    } else {
      console.log(`❌ ${section} - Fondo no corregido`);
    }
  });
  
  // Verificar calendario
  const calendarClasses = ['calendar-container', 'calendar-grid', 'calendar-day-btn'];
  let calendarClassesOK = 0;
  
  calendarClasses.forEach(className => {
    if (cssContent.includes(`.${className}`)) {
      console.log(`✅ ${className} - Implementado correctamente`);
      calendarClassesOK++;
    } else {
      console.log(`❌ ${className} - Faltante`);
    }
  });
  
  console.log('\n📈 Puntuación de contraste:');
  const totalChecks = problematicClasses.length + sections.length + calendarClasses.length;
  const passedChecks = fixedClasses + sectionsFixed + calendarClassesOK;
  const score = Math.round((passedChecks / totalChecks) * 100);
  
  console.log(`🎯 Puntuación: ${score}% (${passedChecks}/${totalChecks} verificaciones pasadas)`);
  
  if (score >= 90) {
    console.log('🌟 ¡EXCELENTE! El contraste está muy bien optimizado');
  } else if (score >= 75) {
    console.log('✅ BUENO - La mayoría de problemas están corregidos');
  } else if (score >= 50) {
    console.log('⚠️  REGULAR - Necesita más mejoras');
  } else {
    console.log('❌ CRÍTICO - Muchos problemas de contraste por corregir');
  }
  
  console.log('\n💡 Recomendaciones:');
  console.log('• Usar color: #333333 para texto principal');
  console.log('• Usar color: #e75480 para acentos');
  console.log('• Usar background: #ffffff para fondos');
  console.log('• Evitar color: white sin fondo específico');
  console.log('• Probar en modo alto contraste del navegador');
  
} else {
  console.log('❌ Archivo CSS no encontrado');
}

console.log('\n🔍 === VERIFICACIÓN COMPLETADA ===');
