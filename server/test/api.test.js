const request = require('supertest');

const app = require('../src/app.js').default;

describe('GET /api/v1/search', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/api/v1/search')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'TODO' }, done);
  });
});
