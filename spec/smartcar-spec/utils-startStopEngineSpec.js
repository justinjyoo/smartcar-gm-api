const expect = require('chai').expect
const request = require('supertest')
const sinon = require('sinon');
const sandbox = sinon.createSandbox()

const app = require('../../server')
process.env.NODE_ENV = 'test'

const construct = require('../../lib/utility')
const gmAPI = require('../../lib/gmAPIRequests.js')

describe('POST /vehicles/:id/engine', () => {

  beforeEach( () => {
    sandbox.stub(gmAPI, 'post')
  });

  afterEach( () => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should correctly transform GM response to Smartcar response', () => {
    const mockGMRes = {
      "service": "actionEngine",
      "status": "200",
      "data": {
        "actionResult": {
        "status": "EXECUTED"
        }
      }
    };

    const correctSmartcarRes = { "status": "success" };

    gmAPI.post.resolves(mockGMRes);

    return gmAPI.post()
    .then( res => {
      const gmResponseData = res.data
      const smartcarVehiclesInfoResponse = construct.engineActionObject(gmResponseData)
      expect(smartcarVehiclesInfoResponse).to.deep.equal(correctSmartcarRes)
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });

  it('should correctly respond with a 400 error code when engine action parameter is missing', () => {
    return request(app)
    .post('/vehicles/1234/engine')
    .then( res => {
      expect((res.statusCode)).to.equal(400)
      expect(res.text).to.equal('A engine action parameter is required.');
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  });
});