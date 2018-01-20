const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../server');
process.env.NODE_ENV = 'test';

describe('ALL /', () => {
  it('should respond to POST requests to /unknownroute with a 404 status code', () => {
    return request(app)
    .post('/unknownroute')
    .then( res => {
      expect((res.statusCode)).to.equal(404);
      expect(res.text).to.equal('Resource not found.');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });

  it('should respond to GET requests to /unknownroute with a 404 status code', () => {
    return request(app)
    .get('/unknownroute')
    .then( res => {
      expect((res.statusCode)).to.equal(404);
      expect(res.text).to.equal('Resource not found.');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });

  it('should respond to DELETE requests with a 404 status code', () => {
    return request(app)
    .delete('/vehicles/1234')
    .then( res => {
      expect((res.statusCode)).to.equal(404);
      expect(res.text).to.equal('Resource not found.');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });
});

describe('POST, GET /vehicles', () => {
  it('should respond to POST requests to /vehicles with a 400 status code when vehicle id parameter is missing', () => {
    return request(app)
    .post('/vehicles')
    .then( res => {
      expect((res.statusCode)).to.equal(400);
      expect(res.text).to.equal('A vehicle id parameter is required.');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });

  it('should respond to GET requests to /vehicles with a 400 status code when vehicle id parameter is missing', () => {
    return request(app)
    .get('/vehicles')
    .then( res => {
      expect((res.statusCode)).to.equal(400);
      expect(res.text).to.equal('A vehicle id parameter is required.');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });
});
