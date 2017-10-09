require('dotenv').config();
describe('API V1', () => {

  const request = require('supertest');  
  let app;

  beforeEach(() => {
    app = require('../../server');
  });

  afterEach(() => {
    app.close();
  });

  it('should respond with 200 for health check', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1');
    expect(response.statusCode).toBe(200);
  });




});