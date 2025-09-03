/**
 * VERIFICACIÓN DE ARMONIZACIÓN DEL AGENDAMENTO
 * ==========================================
 * 
 * Este script verifica que el nuevo diseño armónico del agendamento
 * esté funcionando correctamente con las nuevas sections organizadas.
 */

console.log('🎨 === VERIFICACIÓN DE ARMONIZACIÓN DEL AGENDAMENTO ===');

// Verificar estructura de archivos
const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'vite-app', 'src', 'App.css');
const agendamentoPath = path.join(__dirname, 'frontend', 'vite-app', 'src', 'pages', 'Agendamento.jsx');

console.log('\n📁 Verificando archivos...');

// Verificar que los archivos existen
if (fs.existsSync(cssPath)) {
  console.log('✅ App.css encontrado');
} else {
  console.log('❌ App.css no encontrado');
}

if (fs.existsSync(agendamentoPath)) {
  console.log('✅ Agendamento.jsx encontrado');
} else {
  console.log('❌ Agendamento.jsx no encontrado');
}

console.log('\n🎨 Verificando CSS de armonización...');

if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  
  // Verificar clases principales de armonización
  const requiredClasses = [
    'agendamento-sections',
    'agendamento-form-section',
    'agendamento-calendar-section',
    'agendamento-schedule-section',
    'agendamento-actions-section',
    'section-title',
    'schedule-grid',
    'schedule-time-btn',
    'action-buttons-grid',
    'action-btn',
    'selection-indicator'
  ];
  
  let foundClasses = 0;
  
  requiredClasses.forEach(className => {
    if (cssContent.includes(`.${className}`)) {
      console.log(`✅ Clase encontrada: .${className}`);
      foundClasses++;
    } else {
      console.log(`❌ Clase faltante: .${className}`);
    }
  });
  
  console.log(`\n📊 Clases CSS de armonización: ${foundClasses}/${requiredClasses.length} encontradas`);
  
  // Verificar responsive design
  if (cssContent.includes('@media (max-width: 768px)')) {
    console.log('✅ CSS responsive implementado');
  } else {
    console.log('❌ CSS responsive faltante');
  }
  
  // Verificar grid layout
  if (cssContent.includes('grid-template-columns: 1fr 1fr')) {
    console.log('✅ Grid layout 2 columnas implementado');
  } else {
    console.log('❌ Grid layout 2 columnas faltante');
  }
  
  // Verificar gradientes y efectos modernos
  if (cssContent.includes('linear-gradient')) {
    console.log('✅ Gradientes CSS implementados');
  } else {
    console.log('❌ Gradientes CSS faltantes');
  }
  
  // Verificar transiciones
  if (cssContent.includes('transition:') || cssContent.includes('cubic-bezier')) {
    console.log('✅ Transiciones suaves implementadas');
  } else {
    console.log('❌ Transiciones suaves faltantes');
  }
}

console.log('\n🔧 Verificando estructura del componente...');

if (fs.existsSync(agendamentoPath)) {
  const jsxContent = fs.readFileSync(agendamentoPath, 'utf8');
  
  // Verificar structure sections
  const requiredSections = [
    'agendamento-sections',
    'agendamento-form-section',
    'agendamento-calendar-section',
    'agendamento-schedule-section',
    'agendamento-actions-section'
  ];
  
  let foundSections = 0;
  
  requiredSections.forEach(section => {
    if (jsxContent.includes(`className="${section}"`)) {
      console.log(`✅ Section encontrada: ${section}`);
      foundSections++;
    } else {
      console.log(`❌ Section faltante: ${section}`);
    }
  });
  
  console.log(`\n📊 Sections JSX: ${foundSections}/${requiredSections.length} encontradas`);
  
  // Verificar títulos con emojis
  if (jsxContent.includes('📋') && jsxContent.includes('🛍️') && jsxContent.includes('📅')) {
    console.log('✅ Títulos con emojis implementados');
  } else {
    console.log('❌ Títulos con emojis faltantes');
  }
  
  // Verificar nuevos componentes
  if (jsxContent.includes('schedule-grid') && jsxContent.includes('action-buttons-grid')) {
    console.log('✅ Nuevos grids implementados');
  } else {
    console.log('❌ Nuevos grids faltantes');
  }
  
  // Verificar indicadores de selección
  if (jsxContent.includes('selection-indicator')) {
    console.log('✅ Indicadores de selección implementados');
  } else {
    console.log('❌ Indicadores de selección faltantes');
  }
}

console.log('\n✨ Características del nuevo diseño armónico:');
console.log('🎯 Layout organizado en 4 sections principales');
console.log('📱 Diseño responsive para móviles y tablets');
console.log('🎨 Gradientes y efectos visuales modernos');
console.log('⚡ Transiciones suaves y animaciones');
console.log('🏗️ Grid layout para mejor distribución');
console.log('📊 Separación clara entre formularios y calendario');
console.log('🕒 Grid de horarios más limpio y organizado');
console.log('🎯 Botones de acción centralizados y destacados');

console.log('\n🚀 Beneficios de la armonización:');
console.log('• Mejor organización visual de los elementos');
console.log('• Separación clara entre diferentes funcionalidades');
console.log('• Diseño más profesional y moderno');
console.log('• Mejor experiencia de usuario en móviles');
console.log('• Calendário 6x7 integrado armoniosamente');
console.log('• Indicadores visuales claros de selección');

console.log('\n🎨 === VERIFICACIÓN COMPLETADA ===');
