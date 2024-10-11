import request from 'supertest';
import server from '../../server';

// No hacer testing a la base de datos de la empresa, tener un base de datos de producción  y otra de pruebas

// POST
describe('POST /api/product', () => {
  // Probar la validaciones
  it('should display validation errors', async () => {
    const response = await request(server).post('/api/products').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('should validate that the price is greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Mouse - Testing',
      price: 0,
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(2);
  });

  it('should validate that the price is a number and greater than 0', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Mouse - Testing',
      price: 'Hola',
    });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(404);
    expect(response.body.errors).not.toHaveLength(3);
  });

  it('should create a new producto', async () => {
    const response = await request(server).post('/api/products').send({
      name: 'Mouse - Testing',
      price: 50,
    });
    expect(response.status).toBe(201);
    // .toBe() o se puede usar .toEqual()
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('error');
  });
});
// GET
describe('GET /api/products', () => {
  // Verificar que la URL exista
  it('should check if api/products exists', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).not.toBe(404);
  });

  it('GET a JSON  response with products', async () => {
    const response = await request(server).get('/api/products');
    expect(response.status).toBe(200);
    expect(response.header['content-type']).toMatch(/json/); // expresión regular para verificar que sea un json el contenido de la respuesta del servidor (header)
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveLength(1);

    expect(response.body).not.toHaveProperty('errors');
  });
});

// GET by ID
describe('GET /api/products/:id', () => {
  it('should return a 404 response for a non-existent product', async () => {
    const productoId = 1000;
    const response = await request(server).get(`/api/products/${productoId}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Producto no encontrado');
  });

  it('should check a valid ID in the URL', async () => {
    const response = await request(server).get('/api/products/not-a-valid-id');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Id no válido');
  });

  it('GET a JSON response for a single product', async () => {
    const response = await request(server).get('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
  });
});

// PUT
describe('PUT /api/products/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server)
      .put('/api/products/not-a-valid-id')
      .send({ name: 'Mouse - Testing', price: 50, available: true });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Id no válido');
  });

  it('should display validation errors', async () => {
    const response = await request(server).put('/api/products/1').send({});
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy(); // Se usa para verificar que la propiedad exista y no sea null, undefined, 0, false o una cadena vacía (falsy values).
    expect(response.body.errors).toHaveLength(4);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should validate that the price greater than 0', async () => {
    const response = await request(server)
      .put('/api/products/1')
      .send({ name: 'Mouse - Testing', price: -50, available: true });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toBeTruthy(); // Se usa para verificar que la propiedad exista y no sea null, undefined, 0, false o una cadena vacía (falsy values).
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe(
      'El precio del producto debe ser mayor a 0'
    );

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should return a 404 response for a non-exist product', async () => {
    const productoId = 1000;
    const response = await request(server)
      .put(`/api/products/${productoId}`)
      .send({ name: 'Mouse - Testing', price: 50, available: true });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should update an existing product with valid data', async () => {
    const response = await request(server)
      .put('/api/products/1')
      .send({ name: 'Mouse - Testing', price: 50, available: true });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.body).not.toHaveProperty('errors');
  });
});

//PATCH
describe('PATCH /api/products/:id', () => {
  it('should return a 404 response for a non-exist product', async () => {
    const productoId = 1000;
    const response = await request(server)
      .patch(`/api/products/${productoId}`)
      .send({ name: 'Mouse - Testing', price: 50, available: true });
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });

  it('should update an existing product with valid data', async () => {
    const response = await request(server)
      .patch('/api/products/1')
      .send({ name: 'Mouse - Testing', price: 50, available: true });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');

    expect(response.status).not.toBe(400);
    expect(response.status).not.toBe(404);
    expect(response.body).not.toHaveProperty('errors');
  });
});

// DELETE
describe('DELETE /api/products/:id', () => {
  it('should check a valid ID in the URL', async () => {
    const response = await request(server).delete(
      '/api/products/not-a-valid-id'
    );
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Id no válido');
  });

  it('should return a 404 response for a non-exist product', async () => {
    const productoId = 1000;
    const response = await request(server).delete(
      `/api/products/${productoId}`
    );
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Producto no encontrado');

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty('data');
  });
  it('should delete an existing product', async () => {
    const response = await request(server).delete('/api/products/1');
    expect(response.status).toBe(200);
    expect(response.body.data).toBe('Producto eliminado');

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(400);
  });
});


