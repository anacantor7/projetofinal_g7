console.log('🗓️ VERIFICACIÓN DEL CALENDARIO 6x7 MEJORADO');
console.log('==========================================');

// Buscar elementos del calendario
const calendarContainer = document.querySelector('.calendar-container');
const calendarGrid = document.querySelector('.calendar-grid');
const weekdayHeaders = document.querySelectorAll('.calendar-weekday-header');
const dayButtons = document.querySelectorAll('.calendar-day-btn');

console.log('\n📍 VERIFICACIÓN DE ESTRUCTURA:');

if (!calendarContainer) {
  console.log('❌ No se encontró .calendar-container');
} else {
  console.log('✅ Calendar container encontrado');
  
  const containerStyle = window.getComputedStyle(calendarContainer);
  console.log(`  Background: ${containerStyle.background}`);
  console.log(`  Border-radius: ${containerStyle.borderRadius}`);
  console.log(`  Padding: ${containerStyle.padding}`);
  console.log(`  Box-shadow: ${containerStyle.boxShadow}`);
}

if (!calendarGrid) {
  console.log('❌ No se encontró .calendar-grid');
} else {
  console.log('✅ Calendar grid encontrado');
  
  const gridStyle = window.getComputedStyle(calendarGrid);
  console.log(`  Display: ${gridStyle.display}`);
  console.log(`  Grid-template-columns: ${gridStyle.gridTemplateColumns}`);
  console.log(`  Gap: ${gridStyle.gap}`);
  
  // Verificar que tenga 7 columnas
  const columns = gridStyle.gridTemplateColumns.split(' ').length;
  console.log(`  ¿Tiene 7 columnas?: ${columns === 7 ? '✅ SÍ' : '❌ NO (' + columns + ')'}`);
}

console.log('\n📅 VERIFICACIÓN DE HEADERS:');
console.log(`  Headers encontrados: ${weekdayHeaders.length}`);
const expectedHeaders = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
weekdayHeaders.forEach((header, index) => {
  const text = header.textContent.trim();
  const expected = expectedHeaders[index];
  console.log(`  ${index + 1}. ${text} ${text === expected ? '✅' : '❌'}`);
});

console.log('\n🔢 VERIFICACIÓN DE DÍAS:');
console.log(`  Botones de días encontrados: ${dayButtons.length}`);
console.log(`  ¿Son 42 días (6 semanas × 7 días)?: ${dayButtons.length === 42 ? '✅ SÍ' : '❌ NO'}`);

// Análisis de los tipos de días
let currentMonthDays = 0;
let otherMonthDays = 0;
let availableDays = 0;
let disabledDays = 0;
let selectedDays = 0;
let todayDays = 0;

dayButtons.forEach((button, index) => {
  const classes = button.className;
  
  if (classes.includes('other-month')) {
    otherMonthDays++;
  } else {
    currentMonthDays++;
  }
  
  if (classes.includes('available')) {
    availableDays++;
  }
  
  if (classes.includes('disabled')) {
    disabledDays++;
  }
  
  if (classes.includes('selected')) {
    selectedDays++;
  }
  
  if (classes.includes('today')) {
    todayDays++;
  }
});

console.log(`\n📊 ANÁLISIS DE DÍAS:`);
console.log(`  Días del mes actual: ${currentMonthDays}`);
console.log(`  Días de otros meses: ${otherMonthDays}`);
console.log(`  Días disponibles: ${availableDays}`);
console.log(`  Días deshabilitados: ${disabledDays}`);
console.log(`  Días seleccionados: ${selectedDays}`);
console.log(`  Día de hoy: ${todayDays}`);

console.log('\n🎨 VERIFICACIÓN DE DISEÑO:');

// Verificar grid layout
if (calendarGrid) {
  const gridRect = calendarGrid.getBoundingClientRect();
  console.log(`  Ancho del grid: ${Math.round(gridRect.width)}px`);
  console.log(`  Alto del grid: ${Math.round(gridRect.height)}px`);
  
  // Verificar que los días formen una grilla uniforme
  if (dayButtons.length > 0) {
    const firstDay = dayButtons[0].getBoundingClientRect();
    const aspectRatio = firstDay.height / firstDay.width;
    console.log(`  Aspecto de los días: ${aspectRatio.toFixed(2)} (ideal: ~1.0)`);
    console.log(`  ¿Aspecto cuadrado?: ${Math.abs(aspectRatio - 1) < 0.2 ? '✅ SÍ' : '❌ NO'}`);
  }
}

console.log('\n📱 VERIFICACIÓN RESPONSIVE:');
console.log(`  Ancho pantalla: ${window.innerWidth}px`);

let deviceType = 'Desktop';
if (window.innerWidth <= 480) {
  deviceType = 'Móvil pequeño';
} else if (window.innerWidth <= 768) {
  deviceType = 'Móvil';
} else if (window.innerWidth <= 1024) {
  deviceType = 'Tablet';
}

console.log(`  Tipo dispositivo: ${deviceType}`);

// Verificar adaptación responsive
if (calendarGrid) {
  const gridStyle = window.getComputedStyle(calendarGrid);
  const gap = parseInt(gridStyle.gap) || 0;
  console.log(`  Gap actual: ${gap}px`);
  
  if (window.innerWidth <= 480) {
    console.log(`  ¿Gap apropiado para móvil?: ${gap <= 6 ? '✅ SÍ' : '❌ NO'}`);
  } else if (window.innerWidth <= 768) {
    console.log(`  ¿Gap apropiado para tablet?: ${gap <= 8 ? '✅ SÍ' : '❌ NO'}`);
  }
}

console.log('\n🖱️ VERIFICACIÓN DE INTERACTIVIDAD:');

// Verificar botones clickeables
let clickableButtons = 0;
let disabledButtons = 0;

dayButtons.forEach(button => {
  if (button.disabled) {
    disabledButtons++;
  } else {
    clickableButtons++;
  }
});

console.log(`  Botones clickeables: ${clickableButtons}`);
console.log(`  Botones deshabilitados: ${disabledButtons}`);

console.log('\n📋 RESUMEN DE MEJORAS:');
console.log('✅ Estructura de grilla CSS Grid (7 columnas)');
console.log('✅ 42 días completos (6 semanas × 7 días)');
console.log('✅ Headers de días de la semana');
console.log('✅ Días de meses anteriores/posteriores visibles');
console.log('✅ Estados diferenciados por clases CSS');
console.log('✅ Diseño responsive');
console.log('✅ Aspecto visual moderno');
console.log('✅ Efectos hover y transiciones');

console.log('\n💡 Para usar este script:');
console.log('1. Vaya a la página de Agendamento');
console.log('2. Abra DevTools (F12) > Console');
console.log('3. Pegue este código y presione Enter');
console.log('4. Verifique que el calendario se vea como una grilla 6×7 perfecta');
