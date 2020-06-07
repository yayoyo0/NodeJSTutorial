let request = require('supertest');
const app = require('../api/api');

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true);
    });
});

describe('API tests', () => {
  it('on /prueba route', async (done) => {
    const res = await request(app)
    .get('/prueba');
    expect(res.statusCode).toEqual(200);
    done();
  });

  it('on /login route without valid credentials', async (done) => {
    const res = await request(app)
    .post('/login');
    expect(res.statusCode).toEqual(403);
    done();
  });

  it('on /login route with valid credentials', async (done) => {
    const res = await request(app).post('/login').send({"email":"prueba@prueba.com","password":"ThisIsNotATest"});
    expect(res.statusCode).toEqual(200);
    done();
  });
});
