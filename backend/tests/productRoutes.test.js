const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app');
const Product = require('../src/models/Product');
const { MongoMemoryServer } = require('mongodb-memory-server');

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await Product.deleteMany({});
  await mongoose.connection.close();
});

describe('Product Routes', () => {
  let productId;

  describe('POST /api/products', () => {
    it('deve criar um novo produto com sucesso', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({
          name: 'Produto Teste',
          description: 'Descrição do Produto Teste',
          price: 100.00,
          category: 'Categoria Teste',
          state: 'SP',
          sellerPhone: '61999999999',
          image: 'http://exemplo.com/imagem.jpg',
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('_id');
      productId = res.body._id;
    });

    it('deve retornar erro ao criar um produto sem dados obrigatórios', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({});

      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toBe('Erro ao criar o produto');
    });
  });

  describe('GET /api/products', () => {
    it('deve retornar todos os produtos', async () => {
      const res = await request(app).get('/api/products');

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/products/:id', () => {
    it('deve retornar um produto pelo ID', async () => {
      const res = await request(app).get(`/api/products/${productId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('_id', productId);
    });

    it('deve retornar erro se o produto não existir', async () => {
      const res = await request(app).get('/api/products/invalidID');

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Produto não encontrado');
    });
  });

  describe('PUT /api/products/:id', () => {
    it('deve atualizar um produto', async () => {
      const res = await request(app)
        .put(`/api/products/${productId}`)
        .send({ price: 150.00 });

      expect(res.statusCode).toEqual(200);
      expect(res.body.price).toEqual(150.00);
    });

    it('deve retornar erro se o produto não existir', async () => {
      const res = await request(app)
        .put('/api/products/invalidID')
        .send({ price: 150.00 });

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Produto não encontrado');
    });
  });

  describe('DELETE /api/products/:id', () => {
    it('deve deletar um produto', async () => {
      const res = await request(app).delete(`/api/products/${productId}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Produto deletado com sucesso');
    });

    it('deve retornar erro se o produto não existir', async () => {
      const res = await request(app).delete('/api/products/invalidID');

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toBe('Produto não encontrado');
    });
  });
});