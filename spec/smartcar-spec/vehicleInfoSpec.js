const expect = require('chai').expect
const request = require('supertest')
const sinon = require('sinon');
const sandbox = sinon.createSandbox()

const app = require('../../server')
process.env.NODE_ENV = 'test'

const construct = require('../../lib/utility')
const gmAPI = require('../../lib/gmAPIRequests.js')

describe('GET /vehicles/:id', function() {

  beforeEach( () => {
    sandbox.stub(gmAPI, 'post')

  })

  afterEach( () => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  })

  it('should correctly transform GM response to Smartcar response', () => {
    const mockGMRes = {
      "service": "getVehicleInfo",
      "status": "200",
      "data": {
        "data": {
          "vin": {
            "type": "String",
            "value": "123123412412"
          },
          "color": {
            "type": "String",
            "value": "Metallic Silver"
          },
          "fourDoorSedan": {
            "type": "Boolean",
            "value": "True"
          },
          "twoDoorCoupe": {
            "type": "Boolean",
            "value": "False"
          },
          "driveTrain": {
            "type": "String",
            "value": "v8"
          }
        }
      }
    }

    const correctSmartcarRes = {
      "vin": '123123412412',
      "color": 'Metallic Silver',
      "doorCount": 4,
      "driveTrain": 'v8'
    }

    gmAPI.post.resolves(mockGMRes)

    return gmAPI.post()
    .then( res => {
      const gmResponseData = res.data.data
      const smartcarVehiclesInfoResponse = construct.vehiclesInfoObject(gmResponseData)
      expect(smartcarVehiclesInfoResponse).to.deep.equal(correctSmartcarRes)
    })
    .catch( err => {
      expect.fail(err.actual, err.expected, err.message);
    });
  })
});
