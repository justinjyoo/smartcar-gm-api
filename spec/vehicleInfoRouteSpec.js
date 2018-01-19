const expect = require('chai').expect;
const sinon = require('sinon')
const sandbox = sinon.createSandbox();

const request = require('request');

process.env.NODE_ENV = 'test'



describe('/vehicles/:id route', function() {

  before( () => {

  })

  it('should respond to GET requests to /vehicles/:id with a 400 status code when vehicle id parameter is missing', function(done) {
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

