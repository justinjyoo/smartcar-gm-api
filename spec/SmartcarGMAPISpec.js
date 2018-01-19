const request = require('request');
const { stub } = require('sinon')
const expect = require('chai').expect;

describe('/vehicles/:id route', function() {
  it('should respond to GET requests to /vehicles/:id with a 200 status code', function(done) {
    request.get('http://127.0.0.1:3000/vehicles/1234', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  })

  it('should respond to GET requests to /vehicles/:id with an object', function(done) {
    request.get('http://127.0.0.1:3000/vehicles/1234', function(error, response, body) {
      expect(response.statusCode).to
    })
  })
});

