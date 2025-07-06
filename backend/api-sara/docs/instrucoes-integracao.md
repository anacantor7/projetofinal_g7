# Instruções Importantes para Integração do Front-End com o Back-End

## 1. Consumo correto da API

Utilize o link da API em produção:
👉 [https://agenda-inteligente-backend.onrender.com](https://agenda-inteligente-backend.onrender.com)

**Exemplos de rotas:**

- `/clientes`
- `/servicos`
- `/profissionais`
- `/agendamentos`

As rotas suportam operações `GET`, `POST`, `PUT` e `DELETE`.

📌 **Nota:** A versão atual da API **não exige login ou autenticação**.
O acesso às rotas está livre para facilitar os testes e a integração com o front-end.

---

## 2. Campos esperados por entidade

**Clientes:**

- id, nome, telefone, observacoes, ativo

**Serviços:**

- id, nome, duracao (minutos), preco, tipoId, ativo

**Tipos de serviço:**

- id, nome

**Profissionais:**

- id, nome, telefone, especialidade, ativo

**Agendamentos:**

- id, clienteId, servicoId, profissionalId, data, hora

⚠ **Importante para o desenvolvimento do Front-End com React:**
Estes campos representam a estrutura esperada pelo back-end para cada entidade.
Ao criar formulários ou exibir dados na interface, é fundamental usar exatamente os mesmos nomes dos campos (ex: `nome`, `telefone`, `especialidade`) para garantir que a comunicação com a API funcione corretamente.

Qualquer diferença nos nomes dos campos pode causar falhas ao enviar ou receber informações do servidor.

**Exemplo – envio ao cadastrar um profissional:**

```json
{
  "nome": "Maria",
  "telefone": "999999999",
  "especialidade": "Cabelereira"
}
```

---

## 3. Regras de funcionamento implementadas no back-end

- Agendamentos permitidos apenas entre 09:00 e 18:00
- Sistema bloqueia horários sobrepostos para o mesmo profissional
- Apenas registros com ativo = true devem ser exibidos ou utilizados
- O profissional precisa ter a especialidade compatível com o tipo do serviço (tipoId)
- Todos os relacionamentos são baseados em IDs, e não nomes

---

## 4. Mensagens de erro e feedback no front-end

O back-end retorna mensagens claras em caso de erro, como:

- "Cliente já cadastrado com este telefone"
- "Horário já ocupado para este profissional"

Essas mensagens devem ser exibidas para o usuário na interface.

---

## 5. Tela obrigatória de cadastro de profissional

A interface deve permitir cadastrar profissionais com os seguintes campos obrigatórios:

- nome
- telefone
- especialidade

Essa tela é essencial para que o sistema funcione corretamente.

---

## 6. Filtros suportados para buscar agendamentos

A rota `/agendamentos` aceita os seguintes parâmetros de filtro:

- `?data=2025-06-20` → Lista agendamentos do dia
- `?clienteId=2` → Lista agendamentos de um cliente específico
- `?profissionalId=1` → Lista agendamentos de um profissional específico
- `?data=2025-06-20&hora=10:00` → Verifica se há agendamento no horário exato

Se não houver resultados, a API retorna uma lista vazia (`[]`).
Neste caso, a interface pode mostrar algo como:
**"Não há agendamentos para este filtro."**

📌 Todas as entidades principais também possuem rotas `GET /:id` para buscar dados individuais, úteis para formulários de edição e detalhes.

---

## 7. Campos visuais opcionais

Elementos como ícones, etiquetas ou campos extras que não impactam o banco de dados podem ser usados livremente no design.
Eles são considerados visuais e não afetam a comunicação com a API.

---

## 8. Separação entre ações de edição e exclusão

Recomenda-se que os botões de **Editar** e **Excluir** sejam separados na interface.
Isso evita cliques acidentais e melhora a usabilidade para o usuário.

---

## 9. Tela para cadastrar tipos de serviço

Deve existir uma tela dedicada para cadastrar Tipos de Serviço, com campo obrigatório:

- nome

📌 A API também valida nomes repetidos nesse cadastro.
Essa funcionalidade é essencial porque cada Serviço precisa ter um tipoId vinculado.
Sem essa tela, não será possível cadastrar serviços de forma completa.

---

## 10. Botão 'Novo Cliente' e formulário na mesma tela

Notei que há um botão 'Novo Cliente', mas os campos de nome, telefone e observações já estão na mesma tela.
Só pra confirmar: a ideia é abrir outro formulário separado?
Ou talvez possamos deixar o botão fora e manter o formulário direto, pra facilitar o uso.

---

## 🔍 Observação final

Nem tudo consigo verificar apenas pelo Figma, então é importante revisar também os códigos do React para garantir que tudo esteja em conformidade com as estruturas e regras do back-end (nomes dos campos, validações, filtros etc.).
