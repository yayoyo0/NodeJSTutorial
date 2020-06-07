let request = require('supertest');
const app = require('../app');

describe('Sample Test', () => {
    it('should test that true === true', () => {
        expect(true).toBe(true);
    });
});


describe('Server tests', () => {
  it('on / route', async (done) => {
    const res = await request(app)
    .get('/');
    expect(res.statusCode).toEqual(200);
    done();
  });
});