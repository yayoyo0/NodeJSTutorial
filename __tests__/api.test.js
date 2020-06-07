let request = require('supertest');
const app = require('../api/api');
const nock=require('nock');

const url = "http://localhost:1111";
const mockRequest = nock(url);

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

  it('on /users route without bearer token', async (done) => {
    const res = await request(app)
    .get('/users').set("Authorization","Bearer ");
    expect(res.statusCode).toEqual(403);
    done();
  });

  it('on /users route with bearer token', async (done) => {
    mockRequest.matchHeader('Authorization', 'Bearer test_token').get("/login").reply(200);
    
    const res = await request(app)
    .get('/users').set("Authorization", "Bearer test_token");
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
