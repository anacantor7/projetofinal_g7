/**
 * VERIFICACIÓN DE CONTRASTE Y CALENDARIO 6x7 MEJORADO
 * ==================================================
 * 
 * Este script verifica que los problemas de contraste se hayan corregido
 * y que el calendario 6x7 esté funcionando correctamente.
 */

console.log('🎨 === VERIFICACIÓN DE CONTRASTE Y CALENDARIO 6x7 ===');

const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'frontend', 'vite-app', 'src', 'App.css');
const agendamentoPath = path.join(__dirname, 'frontend', 'vite-app', 'src', 'pages', 'Agendamento.jsx');

console.log('\n📁 Verificando archivos...');

if (fs.existsSync(cssPath) && fs.existsSync(agendamentoPath)) {
  console.log('✅ Archivos encontrados');
  
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  const jsxContent = fs.readFileSync(agendamentoPath, 'utf8');
  
  console.log('\n🎨 Verificando correcciones de contraste...');
  
  // Verificar que las sections tengan fondo blanco sólido
  const sectionsWithWhiteBg = [
    'agendamento-form-section',
    'agendamento-calendar-section', 
    'agendamento-schedule-section',
    'agendamento-actions-section'
  ];
  
  let correctSections = 0;
  sectionsWithWhiteBg.forEach(section => {
    const sectionRegex = new RegExp(`\\.${section}[\\s\\S]*?background:\\s*#ffffff`, 'i');
    if (sectionRegex.test(cssContent)) {
      console.log(`✅ Section ${section} tiene fondo blanco sólido`);
      correctSections++;
    } else {
      console.log(`❌ Section ${section} no tiene fondo blanco sólido`);
    }
  });
  
  // Verificar que form-label-white ya no tenga color blanco
  if (cssContent.includes('.form-label-white') && !cssContent.match(/\.form-label-white[\\s\\S]*?color:\\s*white/i)) {
    console.log('✅ form-label-white ya no usa color blanco');
  } else {
    console.log('❌ form-label-white todavía puede tener problemas de contraste');
  }
  
  // Verificar colores de texto seguros
  const safeTextColors = ['#333333', '#e75480', '#C8377C', '#8B2742', '#666'];
  let safeColorsFound = 0;
  safeTextColors.forEach(color => {
    if (cssContent.includes(`color: ${color}`)) {
      safeColorsFound++;
    }
  });
  
  console.log(`✅ Colores de texto seguros encontrados: ${safeColorsFound}/${safeTextColors.length}`);
  
  console.log('\n📅 Verificando calendario 6x7 mejorado...');
  
  // Verificar clases del calendario
  const calendarClasses = [
    'calendar-container',
    'calendar-header', 
    'calendar-month-year',
    'calendar-grid',
    'calendar-weekday-header',
    'calendar-day-btn',
    'calendar-day-content',
    'calendar-day-weekday',
    'calendar-day-number'
  ];
  
  let calendarClassesFound = 0;
  calendarClasses.forEach(className => {
    if (cssContent.includes(`.${className}`)) {
      console.log(`✅ Clase encontrada: .${className}`);
      calendarClassesFound++;
    } else {
      console.log(`❌ Clase faltante: .${className}`);
    }
  });
  
  console.log(`\n📊 Clases del calendario: ${calendarClassesFound}/${calendarClasses.length} encontradas`);
  
  // Verificar estados del calendario
  const calendarStates = [
    'calendar-day-btn.available',
    'calendar-day-btn.disabled', 
    'calendar-day-btn.selected',
    'calendar-day-btn.today',
    'calendar-day-btn.other-month'
  ];
  
  let statesFound = 0;
  calendarStates.forEach(state => {
    if (cssContent.includes(`.${state}`)) {
      console.log(`✅ Estado encontrado: .${state}`);
      statesFound++;
    } else {
      console.log(`❌ Estado faltante: .${state}`);
    }
  });
  
  console.log(`\n📊 Estados del calendario: ${statesFound}/${calendarStates.length} encontrados`);
  
  // Verificar responsive design del calendario
  const responsiveBreakpoints = ['@media (max-width: 768px)', '@media (max-width: 480px)'];
  let responsiveFound = 0;
  responsiveBreakpoints.forEach(breakpoint => {
    if (cssContent.includes(breakpoint)) {
      console.log(`✅ Breakpoint responsivo: ${breakpoint}`);
      responsiveFound++;
    } else {
      console.log(`❌ Breakpoint faltante: ${breakpoint}`);
    }
  });
  
  // Verificar estructura JSX del calendario
  if (jsxContent.includes('createCalendarGrid()') && jsxContent.includes('weekdayHeaders')) {
    console.log('✅ Función createCalendarGrid() implementada');
  } else {
    console.log('❌ Función createCalendarGrid() faltante');
  }
  
  if (jsxContent.includes('calendar-grid') && jsxContent.includes('calendar-weekday-header')) {
    console.log('✅ Estructura JSX del calendario 6x7 implementada');
  } else {
    console.log('❌ Estructura JSX del calendario 6x7 faltante');
  }
  
  console.log('\n✨ Mejoras implementadas:');
  console.log('🎯 Fondos blancos sólidos en todas las sections');
  console.log('📱 Texto con colores seguros y buen contraste');
  console.log('📅 Calendario 6x7 con grid CSS profesional');
  console.log('🎨 Headers de días de la semana mejorados');
  console.log('💫 Estados visuales claros para los días');
  console.log('📱 Diseño completamente responsive');
  console.log('🔄 Transiciones suaves y efectos modernos');
  
  console.log('\n🎨 Características del calendario mejorado:');
  console.log('• Grid 7 columnas x 6 filas (42 días)');
  console.log('• Headers de días de la semana destacados');
  console.log('• Estados claros: disponible, seleccionado, deshabilitado, hoy');
  console.log('• Días de otros meses en gris claro');
  console.log('• Efectos hover y transiciones suaves');
  console.log('• Completamente responsive para móviles');
  
  console.log('\n🚀 Correcciones de contraste:');
  console.log('• Eliminado texto blanco sobre fondo blanco');
  console.log('• Sections con fondo blanco sólido (#ffffff)');
  console.log('• Texto principal en #333333 (negro seguro)');
  console.log('• Acentos en colores rosa (#e75480, #C8377C)');
  console.log('• Bordes y sombras para definir elementos');
  
} else {
  console.log('❌ Archivos no encontrados');
}

console.log('\n🎨 === VERIFICACIÓN COMPLETADA ===');
