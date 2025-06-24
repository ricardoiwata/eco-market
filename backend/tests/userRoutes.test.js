const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/User');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('deve registrar um novo usuário com sucesso', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        cpf: '12345678909'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuário registrado com sucesso');
  });

  it('deve retornar erro ao tentar registrar um usuário com username existente', async () => {
    await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        cpf: '12345678909'
      });

    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'newuser@example.com',
        cpf: '98765432100'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Usuário já existe');
  });

  it('deve retornar erro ao registrar um usuário sem os campos obrigatórios', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({});

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Todos os campos são obrigatórios');
  });

  it('deve registrar um novo usuário administrador com sucesso', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
        cpf: '12345678909',
        role: 'admin'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuário registrado com sucesso');
  });
});