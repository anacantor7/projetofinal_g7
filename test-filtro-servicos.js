// Script para testar o filtro de serviços
// Execute: node test-filtro-servicos.js

const servicosTest = [
  { id: 1, nome: "Corte de Cabelo", ativo: true },
  { id: 2, nome: "Manicure", ativo: true },
  { id: 3, nome: "TestService", ativo: true },
  { id: 4, nome: "teste abc", ativo: true },
  { id: 5, nome: "demo service", ativo: true },
  { id: 6, nome: "Massagem", ativo: true },
  { id: 7, nome: "exemplo temp", ativo: true },
  { id: 8, nome: "aa", ativo: true },
  { id: 9, nome: "service111", ativo: true },
  { id: 10, nome: "Pedicure", ativo: true }
];

function filtrarServicos(servicos) {
  return servicos.filter(s => {
    const nomeServico = s.nome.toLowerCase();
    const isTestService = nomeServico.includes('test') || 
                          nomeServico.includes('teste') || 
                          nomeServico.includes('temp') || 
                          nomeServico.includes('exemplo') ||
                          nomeServico.includes('demo') ||
                          nomeServico.startsWith('aa') ||
                          nomeServico.includes('111') ||
                          nomeServico.includes('222') ||
                          nomeServico.includes('333') ||
                          nomeServico.includes('xxx') ||
                          nomeServico.length < 3;
    return !isTestService;
  });
}

console.log('🔍 Testando filtro de serviços...\n');

console.log('📋 Serviços originais:');
servicosTest.forEach(s => console.log(`  - ${s.nome}`));

console.log('\n✅ Serviços filtrados (apenas válidos):');
const servicosValidos = filtrarServicos(servicosTest);
servicosValidos.forEach(s => console.log(`  - ${s.nome}`));

console.log('\n❌ Serviços removidos (testes):');
const servicosRemovidos = servicosTest.filter(s => !servicosValidos.includes(s));
servicosRemovidos.forEach(s => console.log(`  - ${s.nome}`));

console.log(`\n📊 Resumo:`);
console.log(`  Total original: ${servicosTest.length}`);
console.log(`  Válidos: ${servicosValidos.length}`);
console.log(`  Removidos: ${servicosRemovidos.length}`);
console.log(`  % de limpeza: ${((servicosRemovidos.length / servicosTest.length) * 100).toFixed(1)}%`);
