// Teste para validar o filtro de profissionais melhorado
const profissionaisExemplo = [
  { id: 1, nome: 'Maria Silva', especialidade: 'cabelo', ativo: true },
  { id: 2, nome: 'João Santos', especialidade: 'unhas', ativo: true },
  { id: 3, nome: 'Ana profissional 1756909765219', especialidade: 'cabelo', ativo: true },
  { id: 4, nome: 'Ana profissional 1756909817055', especialidade: 'cabelo', ativo: true },
  { id: 5, nome: 'Ana profissional 1756909851779', especialidade: 'cabelo', ativo: true },
  { id: 6, nome: 'Profissional manicure 1756909853191', especialidade: 'manicure', ativo: true },
  { id: 7, nome: 'Ana profissional 1756909865962', especialidade: 'cabelo', ativo: true },
  { id: 8, nome: 'Profissional manicure 1756909867533', especialidade: 'manicure', ativo: true },
  { id: 9, nome: 'Ana Costa', especialidade: 'massagem', ativo: true },
  { id: 10, nome: 'Carlos Pereira', especialidade: 'cabelo', ativo: true }
];

// Função de filtro (copiada do componente)
function filtrarProfissionaisValidos(profissionais) {
  return profissionais.filter(p => {
    const nomeProfissional = p.nome.toLowerCase().trim();
    
    // Padrões básicos de teste
    const isTestProfessional = nomeProfissional.includes('test') || 
                               nomeProfissional.includes('teste') || 
                               nomeProfissional.includes('temp') || 
                               nomeProfissional.includes('exemplo') ||
                               nomeProfissional.includes('demo') ||
                               nomeProfissional.startsWith('aa') ||
                               nomeProfissional.includes('111') ||
                               nomeProfissional.includes('222') ||
                               nomeProfissional.includes('333') ||
                               nomeProfissional.includes('xxx') ||
                               nomeProfissional.length < 3 ||
                               nomeProfissional === 'admin' ||
                               nomeProfissional === 'user';
    
    // Verificar se contém timestamps (sequências longas de números)
    const contemTimestamp = /\d{10,}/.test(nomeProfissional);
    
    // Verificar se é um padrão de profissional genérico com números
    const profissionalGenerico = /^(ana profissional|profissional manicure|profissional)\s*\d+/i.test(nomeProfissional);
    
    // Verificar se contém "cabelo teste" ou "manicure" seguido de números no nome
    const servicoComNumeros = /(cabelo teste|manicure)\s*\d+/i.test(nomeProfissional);
    
    // Verificar padrão específico "Ana profissional [números]"
    const anaComNumeros = /^ana profissional\s+\d+/i.test(nomeProfissional);
    
    // Verificar padrão "Profissional manicure [números]"
    const manicureComNumeros = /^profissional manicure\s+\d+/i.test(nomeProfissional);
    
    return !isTestProfessional && !contemTimestamp && !profissionalGenerico && 
           !servicoComNumeros && !anaComNumeros && !manicureComNumeros;
  });
}

// Testar o filtro
const profissionaisValidos = filtrarProfissionaisValidos(profissionaisExemplo);

console.log('=== TESTE DO FILTRO DE PROFISSIONAIS ===');
console.log('Total de profissionais:', profissionaisExemplo.length);
console.log('Profissionais válidos após filtro:', profissionaisValidos.length);
console.log('\nProfissionais válidos:');
profissionaisValidos.forEach(p => {
  console.log(`- ${p.nome} (${p.especialidade})`);
});

console.log('\nProfissionais filtrados (removidos):');
const profissionaisRemovidos = profissionaisExemplo.filter(p => 
  !profissionaisValidos.find(pv => pv.id === p.id)
);
profissionaisRemovidos.forEach(p => {
  console.log(`- ${p.nome} (${p.especialidade})`);
});

console.log('\n=== RESULTADO ESPERADO ===');
console.log('Devem permanecer apenas:');
console.log('- Maria Silva');
console.log('- João Santos');
console.log('- Ana Costa');
console.log('- Carlos Pereira');
