// tests/agendamentos.test.js - Testes para CRUD de agendamentos
const request = require('supertest');
const app = require('../app');

describe('CRUD Agendamentos', () => {
  let clienteId, profissionalId, servicoId, tipoId;

  beforeAll(async () => {
    // Criar dados necessários para os testes com nomes únicos
    const timestamp = Date.now();
    
    // Criar tipo
    const tipoResponse = await request(app)
      .post('/tipos')
      .send({ nome: `Cabelo Teste ${timestamp}` });
    expect(tipoResponse.status).toBe(201);
    tipoId = tipoResponse.body.id;
    expect(tipoId).toBeDefined();

    // Criar serviço
    const servicoResponse = await request(app)
      .post('/servicos')
      .send({
        nome: `Corte Teste ${timestamp}`,
        duracao: 30,
        preco: 50.00,
        tipoId: tipoId,
        ativo: true
      });
    expect(servicoResponse.status).toBe(201);
    servicoId = servicoResponse.body.id;
    expect(servicoId).toBeDefined();

    // Criar profissional
    const profissionalResponse = await request(app)
      .post('/profissionais')
      .send({
        nome: `Ana Profissional ${timestamp}`,
        telefone: '11999888777',
        especialidade: `Cabelo Teste ${timestamp}`, // Debe coincidir con el tipo
        ativo: true
      });
    expect(profissionalResponse.status).toBe(201);
    profissionalId = profissionalResponse.body.id;
    expect(profissionalId).toBeDefined();

    // Criar cliente
    const clienteResponse = await request(app)
      .post('/clientes')
      .send({
        nome: `Cliente Agendamento ${timestamp}`,
        telefone: '11988777666',
        email: `cliente.agendamento.${timestamp}@teste.com`,
        senha: 'senha123'
      });
    expect(clienteResponse.status).toBe(201);
    clienteId = clienteResponse.body.id;
    expect(clienteId).toBeDefined();
  });

  describe('POST /agendamentos', () => {
    test('deve criar agendamento com dados válidos', async () => {
      const agendamentoData = {
        clienteId: clienteId,
        servicoId: servicoId,
        profissionalId: profissionalId,
        data: '2025-09-15',
        hora: '14:00'
      };

      const response = await request(app)
        .post('/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.clienteId).toBe(clienteId);
      expect(response.body.servicoId).toBe(servicoId);
      expect(response.body.profissionalId).toBe(profissionalId);
    });

    test('deve rejeitar agendamento fora do horário de funcionamento', async () => {
      const agendamentoData = {
        clienteId: clienteId,
        servicoId: servicoId,
        profissionalId: profissionalId,
        data: '2025-09-15',
        hora: '08:00' // Antes das 9:00
      };

      const response = await request(app)
        .post('/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
      expect(response.body.erro).toContain('salão atende');
    });

    test('deve rejeitar agendamento duplicado', async () => {
      const agendamentoData = {
        clienteId: clienteId,
        servicoId: servicoId,
        profissionalId: profissionalId,
        data: '2025-09-15',
        hora: '14:00' // Mesmo horário do teste anterior
      };

      const response = await request(app)
        .post('/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
      expect(response.body.erro).toContain('Já existe um agendamento');
    });

    test('deve rejeitar agendamento com cliente inativo', async () => {
      // Primeiro desativar o cliente
      await request(app).put(`/clientes/${clienteId}/ativo`);

      const agendamentoData = {
        clienteId: clienteId,
        servicoId: servicoId,
        profissionalId: profissionalId,
        data: '2025-09-16',
        hora: '15:00'
      };

      const response = await request(app)
        .post('/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
      expect(response.body.erro).toContain('Cliente inativo');

      // Reativar para outros testes
      await request(app).put(`/clientes/${clienteId}/ativo`);
    });

    test('deve validar compatibilidade entre especialidade do profissional e serviço', async () => {
      // Criar profissional com especialidade diferente
      const timestamp2 = Date.now() + 1000; // Timestamp diferente
      const profResponse = await request(app)
        .post('/profissionais')
        .send({
          nome: `Profissional Manicure ${timestamp2}`,
          telefone: '11999888222', // Teléfono diferente
          especialidade: 'Manicure',
          ativo: true
        });

      const agendamentoData = {
        clienteId: clienteId,
        servicoId: servicoId, // Serviço de cabelo
        profissionalId: profResponse.body.id, // Profissional de manicure
        data: '2025-09-17',
        hora: '16:00'
      };

      const response = await request(app)
        .post('/agendamentos')
        .send(agendamentoData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
      expect(response.body.erro).toContain('Profissional não corresponde');
    });
  });

  describe('GET /agendamentos', () => {
    test('deve listar todos os agendamentos', async () => {
      const response = await request(app).get('/agendamentos');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /agendamentos/:id', () => {
    test('deve buscar agendamento por ID', async () => {
      // Primeiro criar um agendamento
      const agendamentoData = {
        clienteId: clienteId,
        servicoId: servicoId,
        profissionalId: profissionalId,
        data: '2025-09-18',
        hora: '10:00'
      };

      const createResponse = await request(app)
        .post('/agendamentos')
        .send(agendamentoData);

      const agendamentoId = createResponse.body.id;

      const response = await request(app).get(`/agendamentos/${agendamentoId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', agendamentoId);
    });

    test('deve retornar 404 para ID inexistente', async () => {
      const response = await request(app).get('/agendamentos/99999');

      expect(response.status).toBe(404);
    });
  });
});
