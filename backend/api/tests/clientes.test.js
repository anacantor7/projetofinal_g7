// tests/clientes.test.js - Testes para CRUD de clientes
const request = require('supertest');
const app = require('../app');

describe('CRUD Clientes', () => {
  let clienteId;

  describe('POST /clientes', () => {
    test('deve criar cliente com dados válidos', async () => {
      const clienteData = {
        nome: 'João Silva',
        telefone: '11987654321',
        email: 'joao@teste.com',
        senha: 'senha123'
      };

      const response = await request(app)
        .post('/clientes')
        .send(clienteData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(clienteData.nome);
      expect(response.body.email).toBe(clienteData.email);
      
      clienteId = response.body.id;
    });

    test('deve rejeitar cliente com email duplicado', async () => {
      const clienteData = {
        nome: 'Maria Silva',
        telefone: '11987654322',
        email: 'joao@teste.com', // email já usado
        senha: 'senha123'
      };

      const response = await request(app)
        .post('/clientes')
        .send(clienteData);

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
    });

    test('deve validar campos obrigatórios', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: 'Nome Sem Email'
          // campos obrigatórios ausentes
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /clientes', () => {
    test('deve listar todos os clientes', async () => {
      const response = await request(app).get('/clientes');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /clientes/:id', () => {
    test('deve buscar cliente por ID válido', async () => {
      const response = await request(app).get(`/clientes/${clienteId}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', clienteId);
      expect(response.body).toHaveProperty('nome');
      expect(response.body).toHaveProperty('email');
    });

    test('deve retornar 404 para ID inexistente', async () => {
      const response = await request(app).get('/clientes/99999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('erro');
    });
  });

  describe('PUT /clientes/:id', () => {
    test('deve atualizar cliente com dados válidos', async () => {
      const updateData = {
        nome: 'João Silva Atualizado',
        telefone: '11987654999'
      };

      const response = await request(app)
        .put(`/clientes/${clienteId}`)
        .send(updateData);

      expect(response.status).toBe(200);
      expect(response.body.nome).toBe(updateData.nome);
      expect(response.body.telefone).toBe(updateData.telefone);
    });

    test('deve retornar 404 para ID inexistente', async () => {
      const response = await request(app)
        .put('/clientes/99999')
        .send({ nome: 'Nome Qualquer' });

      expect(response.status).toBe(404);
    });
  });

  describe('PUT /clientes/:id/ativo', () => {
    test('deve alterar status ativo do cliente', async () => {
      const response = await request(app)
        .put(`/clientes/${clienteId}/ativo`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensagem');
    });
  });

  describe('DELETE /clientes/:id', () => {
    test('deve deletar cliente existente', async () => {
      const response = await request(app)
        .delete(`/clientes/${clienteId}`);

      expect(response.status).toBe(204);
    });

    test('deve retornar 404 ao deletar cliente inexistente', async () => {
      const response = await request(app)
        .delete('/clientes/99999');

      expect(response.status).toBe(404);
    });
  });
});
