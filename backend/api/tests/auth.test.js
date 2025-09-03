// tests/auth.test.js - Testes de autenticação
const request = require('supertest');
const app = require('../app');

describe('Autenticação Admin', () => {
  describe('POST /admin-auth/login', () => {
    test('deve fazer login com credenciais válidas', async () => {
      const response = await request(app)
        .post('/admin-auth/login')
        .send({
          email: 'admin@salao.com',
          senha: 'admin123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('admin');
      expect(response.body.admin).toHaveProperty('id');
      expect(response.body.admin).toHaveProperty('nome');
      expect(response.body.admin).toHaveProperty('email');
    });

    test('deve rejeitar credenciais inválidas', async () => {
      const response = await request(app)
        .post('/admin-auth/login')
        .send({
          email: 'admin@salao.com',
          senha: 'senha_errada'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('deve rejeitar email inexistente', async () => {
      const response = await request(app)
        .post('/admin-auth/login')
        .send({
          email: 'inexistente@email.com',
          senha: 'qualquer_senha'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    test('deve rejeitar dados em branco', async () => {
      const response = await request(app)
        .post('/admin-auth/login')
        .send({});

      expect(response.status).toBe(400);
    });
  });
});

describe('Autenticação Cliente', () => {
  describe('POST /clientes/login', () => {
    beforeEach(async () => {
      // Criar cliente de teste
      await request(app)
        .post('/clientes')
        .send({
          nome: 'Cliente Teste',
          telefone: '11999999999',
          email: 'cliente@teste.com',
          senha: 'senha123'
        });
    });

    test('deve fazer login com credenciais válidas', async () => {
      const response = await request(app)
        .post('/clientes/login')
        .send({
          email: 'cliente@teste.com',
          senha: 'senha123'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('mensagem');
      expect(response.body).toHaveProperty('cliente');
      expect(response.body.cliente).toHaveProperty('id');
      expect(response.body.cliente).toHaveProperty('nome');
      expect(response.body.cliente).toHaveProperty('email');
    });

    test('deve rejeitar credenciais inválidas', async () => {
      const response = await request(app)
        .post('/clientes/login')
        .send({
          email: 'cliente@teste.com',
          senha: 'senha_errada'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('erro');
    });

    test('deve validar campos obrigatórios', async () => {
      const response = await request(app)
        .post('/clientes/login')
        .send({
          email: 'cliente@teste.com'
          // senha ausente
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('erro');
    });
  });
});
